"use client";

import AccountInformation from "@/components/AccountInformation";
import RegistrantInformation from "@/components/RegistrantInformation";
import ApplicantInformation from "@/components/ApplicantInformation";
import Statistics from "@/components/Statistics";
import Keuangan from "@/components/Keuangan";
import { MajorTable } from "@/components/MajorTable";

import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full">
        <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
          Pendaftar & Manager
        </h2>
        <div className="grid grid-cols-2 w-full gap-12">
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2  h-[160px]">
            <span className="font-bold text-4xl text-green-700">80</span>
            <span className="text-lg text-gray-500">Approved</span>
          </Card>
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2  h-[160px]">
            <span className="font-bold text-4xl text-red-700">30</span>
            <span className="text-lg text-gray-500">Rejected</span>
          </Card>
        </div>
        <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-12">
          Quick Status
        </h2>
        <div className="grid grid-cols-2 w-full gap-12">
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-5  h-[160px]">
            <span className="font-bold text-4xl ">Rp430jt</span>
            <span className="text-lg text-gray-500">Total Pendapatan</span>
          </Card>
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-5  h-[160px]">
            <span className="font-bold text-4xl">1%</span>
            <span className="text-lg text-gray-500">Kenaikan</span>
          </Card>
        </div>

        <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-12">
          Profil Pendaftar
        </h2>

        <MajorTable />
      </div>
    </div>
  );
}
