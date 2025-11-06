"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
