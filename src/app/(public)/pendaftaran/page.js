import ProtectedRoute from "@/components/ProtectedRoute";

import InformasiPendaftaran from "@/components/InformasiPendaftaran";
import InformasiProfil from "@/components/InformasiProfil";
import RegistrationProgress from "@/components/RegistrationProgress"

export default function PendaftaranPage() {
    return (
        <ProtectedRoute>
            <div className="py-5 flex items-center w-screen justify-center flex-col gap-5 max-w-11/12 mx-auto">
                <InformasiPendaftaran />
                <InformasiProfil />
                <RegistrationProgress />
            </div>
        </ProtectedRoute>
    )
}