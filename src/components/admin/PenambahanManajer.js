import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Heading } from "@/components/Heading";

export default function InformasiPendaftaran() {
  return (
    <div className="flex flex-col items-center w-full px-3 sm:px-6 lg:px-8 mt-8 sm:mt-12 max-w-6xl">
      {/* Judul Halaman */}
      <Heading title={"Pendaftaran Manajer Baru"} variant="first"/>

      {/* Kartu Informasi */}
      <Card
        className="
          rounded-lg shadow-md 
          flex flex-col sm:flex-row gap-4 
          p-4 sm:p-6 lg:p-8 
          w-full 
          bg-[var(--light-cream)] 
          border border-gray-300
        "
      >
        <CardContent className="flex flex-col gap-4 sm:gap-5 w-full p-0">
          {/* Subjudul */}
          <h2
            className="
              scroll-m-20 pb-2 border-b border-gray-500 
              text-2xl sm:text-3xl font-semibold tracking-tight 
              first:mt-0 flex items-center gap-2 text-gray-800
            "
          >
            <Info className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
            Informasi Tahapan
          </h2>

          {/* Isi Konten */}
          <div className="pl-3 sm:pl-6 flex flex-col gap-2 sm:gap-3 text-gray-700">
            <p className="leading-7 flex items-start sm:items-center gap-2 text-sm sm:text-base">
              Masukkan data manajer baru pada form
            </p>
            <p className="leading-7 flex items-start sm:items-center gap-2 text-sm sm:text-base">
              Periksa kembali data manajer sebelum disimpan dan mengirimkan
              email aktivasi
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
