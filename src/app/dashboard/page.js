"use client";

import { MajorTable } from "@/components/MajorTable";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";
import { useAdminDashboard, useApplicantStatistics } from "@/hooks/useAdmin";

export default function Page() {
  const { data, isLoading, isError, error } = useAdminDashboard();

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Error fetching dashboard: {error.response?.data?.message || error.message}
      </div>
    );

  console.log(data);

  const totalApplicants = data?.data?.data?.overview?.total_applicants;
  const totalManagers   = data?.data?.data?.overview?.total_managers;

  const revenue   = data?.data?.data?.quick_status?.total_revenue;
  const growthPercentage = data?.data?.data?.quick_status?.growth_percentage;

  const top_programs = data?.data?.data?.top_programs;
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-[90rem] my-12 w-full">
        <Heading title={"Pendaftar & Manajer"} variant="first"/>

        {/* Grid pertama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-12 max-w-4xl">
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2 h-[160px] border-1 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="font-bold text-4xl">{totalApplicants}</span>
            <span className="text-lg text-gray-500">Pendaftar</span>
          </Card>
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2 h-[160px] border-1 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="font-bold text-4xl">{totalManagers}</span>
            <span className="text-lg text-gray-500">Manager</span>
          </Card>
        </div>

        <Heading title={"Quick Status"} />

        {/* Grid kedua */}
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-12 max-w-4xl">
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-5 h-[160px] border-1 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="font-bold text-4xl">Rp {revenue}</span>
            <span className="text-lg text-gray-500">Total Pendapatan</span>
          </Card>
          <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-5 h-[160px] border-1 border-black shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="font-bold text-4xl">{growthPercentage}%</span>
            <span className="text-lg text-gray-500">Kenaikan</span>
          </Card>
        </div>

        <Heading title={"Prodi Pendaftar"} />

        {/* Tabel jurusan */}
        <div className="w-full overflow-x-auto">
          <MajorTable top_programs={top_programs}/>
        </div>
      </div>
    </div>
  );
}
