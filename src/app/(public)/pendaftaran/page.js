import ProtectedRoute from "@/components/ProtectedRoute";

import InformasiPendaftaran from "@/components/InformasiPendaftaran";
import InformasiProfil from "@/components/InformasiProfil";
import RegistrationProgress from "@/components/RegistrationProgress";
import UrutanTahapan from "@/components/UrutanTahapan";
import Ketentuan from "@/components/Ketentuan";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PendaftaranPage() {
  return (
    <ProtectedRoute>
      <div className="py-12 flex items-center w-screen justify-center flex-col gap-5 max-w-10/12 mx-auto">
        <InformasiPendaftaran />
        {/* <InformasiProfil /> */}
        <RegistrationProgress />
        <UrutanTahapan />
        <Ketentuan />
        <div className="w-10/12">
          <Link href="/pendaftaran/data-diri" className={"w-lg ms-auto mb-12"}>
            <Button type="button" variant="green" className={"w-full"}>
              {" "}
              Lanjut
            </Button>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
