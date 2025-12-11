"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userStr = localStorage.getItem("user");

    if (!token) {
      toast.error("Silakan login untuk mengakses halaman ini");
      router.push("/login");
      return;
    }

    if (allowedRoles.length > 0 && userStr) {
      try {
        const user = JSON.parse(userStr);
        const userRole = user.role;

        const hasAccess = allowedRoles.includes(userRole);

        if (!hasAccess) {
          toast.error("Anda tidak memiliki izin untuk mengakses halaman ini");

          if (userRole === "admin") {
            router.push("/dashboard");
          } else if (userRole === "manager") {
            router.push("/manager");
          } else if (userRole === "pendaftar" || userRole === "mahasiswa") {
            router.push("/pendaftaran");
          } else {
            router.push("/");
          }
          return;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login");
        return;
      }
    }

    setIsAuthorized(true);
  }, [router, pathname, allowedRoles]);

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--green)]"></div>
      </div>
    );
  }

  return <>{children}</>;
}
