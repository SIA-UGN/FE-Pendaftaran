"use client";

import { MajorTable } from "@/components/MajorTable";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-[90rem] my-12 w-full">
        <Heading title={"Pendaftar & Manajer"} />

        {/* Grid pertama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-12 max-w-4xl">
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2 h-[160px] border-2 border-black">
            <span className="font-bold text-4xl">80</span>
            <span className="text-lg text-gray-500">Pendaftar</span>
          </Card>
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2 h-[160px] border-2 border-black">
            <span className="font-bold text-4xl">30</span>
            <span className="text-lg text-gray-500">Manager</span>
          </Card>
        </div>

        <Heading title={"Quick Status"} />

        {/* Grid kedua */}
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-12 max-w-4xl">
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-5 h-[160px] border-2 border-black">
            <span className="font-bold text-4xl">Rp430jt</span>
            <span className="text-lg text-gray-500">Total Pendapatan</span>
          </Card>
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-5 h-[160px] border-2 border-black">
            <span className="font-bold text-4xl">1%</span>
            <span className="text-lg text-gray-500">Kenaikan</span>
          </Card>
        </div>

        <Heading title={"Profil Pendaftar"} />

        {/* Tabel jurusan */}
        <div className="w-full overflow-x-auto">
          <MajorTable />
        </div>
      </div>
    </div>
  );
}
