// 🚫 Tidak pakai "use client" — ini Server Component
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Prestasi from "@/components/prestasi/Prestasi";
import RegistrationProgress from "@/components/RegistrationProgress";
import ConfirmDialogClient from "../data-prestasi/ConfirmDialogClient";

export default async function DataPrestasi() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
      <RegistrationProgress />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-4 sm:mt-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-semibold">Data Prestasi</h2>
        </div>
        <Link href="/pendaftaran/data-prestasi/input-data" className="w-full sm:w-auto">
          <Button type="button" variant="yellow" className="w-full sm:w-auto">
            Tambah
          </Button>
        </Link>
      </div>

      {/* ✅ Boleh render async component */}
      <Prestasi />

      {/* ✅ Dialog konfirmasi dari Client Component */}
      <div className="flex flex-col mx-4 sm:mx-6 md:mx-8 lg:mx-12 my-6 gap-5 items-center">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-end ms-auto">
          <Link href="/pendaftaran/data-akademik">
            <Button variant="matcha" className="w-sm">
              Kembali
            </Button>
          </Link>

          <ConfirmDialogClient />
        </div>
        </div>
        </div>
    </>
  );
}
