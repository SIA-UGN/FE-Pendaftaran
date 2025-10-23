"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie("access_token");

    if (!token) {
      // Kalau ga ada cookie → redirect ke login
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    // Bisa ganti jadi spinner/loading state
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Checking authentication...
      </div>
    );
  }

  // Kalau sudah dicek dan user punya cookie → render halaman
  return isAuthenticated ? children : null;
}
