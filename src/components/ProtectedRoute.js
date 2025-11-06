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
      toast.error("Please login to access this page");
      router.push("/login");
      return;
    }

    if (allowedRoles.length > 0 && userStr) {
      try {
        const user = JSON.parse(userStr);
        const userRoles = user.roles || [];

        const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

        if (!hasAccess) {
          toast.error("You don't have permission to access this page");

          if (userRoles.includes("admin")) {
            router.push("/dashboard");
          } else if (userRoles.includes("manager")) {
            router.push("/manager");
          } else if (
            userRoles.includes("applicant") ||
            userRoles.includes("student")
          ) {
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
