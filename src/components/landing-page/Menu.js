import { Card } from "@/components/ui/card";

import { GraduationCap, School, NotepadText } from "lucide-react";

export default function Menu() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto my-3 py-8 sm:py-10 lg:py-12">
      <Card className="flex items-center justify-center p-6 sm:p-8 flex-col w-full mx-auto cursor-pointer gap-2 hover:shadow-lg transition-shadow">
        <GraduationCap
          size={60}
          className="sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] stroke-1 text-[var(--green)]"
        />
        <span className="text-xl sm:text-2xl font-medium text-[var(--green)] text-center">
          Profil
        </span>
        <p className="text-gray-500 text-center text-xs sm:text-sm leading-relaxed">
          Temukan informasi lengkap mengenai sejarah, visi dan misi, serta
          nilai-nilai yang menjadi dasar kampus kami.
        </p>
      </Card>
      <Card className="flex items-center justify-center p-6 sm:p-8 flex-col w-full mx-auto cursor-pointer gap-2 hover:shadow-lg transition-shadow">
        <School
          size={60}
          className="sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] stroke-1 text-[var(--green)]"
        />
        <span className="text-xl sm:text-2xl font-medium text-[var(--green)] text-center">
          Fakultas
        </span>
        <p className="text-gray-500 text-center text-xs sm:text-sm leading-relaxed">
          Jelajahi berbagai fakultas dan program studi yang tersedia.
        </p>
      </Card>
      <Card className="flex items-center justify-center p-6 sm:p-8 flex-col mx-auto w-full stroke-black cursor-pointer gap-2 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
        <NotepadText
          size={60}
          className="sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] stroke-1 text-[var(--green)]"
        />
        <span className="text-xl sm:text-2xl font-medium text-[var(--green)] text-center">
          Pendaftaran
        </span>
        <p className="text-gray-500 text-center text-xs sm:text-sm leading-relaxed">
          Dapatkan informasi seputar persyaratan, alur pendaftaran, serta jadwal
          penting penerimaan mahasiswa baru.
        </p>
      </Card>
    </div>
  );
}
