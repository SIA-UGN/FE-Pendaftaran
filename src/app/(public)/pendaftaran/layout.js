"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function PendaftaranLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["pendaftar", "mahasiswa"]}>
      {children}
    </ProtectedRoute>
  );
}
