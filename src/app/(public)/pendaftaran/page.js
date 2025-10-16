import ProtectedRoute from "@/components/ProtectedRoute";

export default function PendaftaranPage() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col">
                Ini Halaman Pendaftaran
            </div>
        </ProtectedRoute>
    )
}