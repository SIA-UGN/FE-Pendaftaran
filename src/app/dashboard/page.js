"use client";

import { MajorTable } from "@/components/MajorTable";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";
import { useAdminDashboard, useApplicantStatistics } from "@/hooks/useAdmin";

export default function Page() {
  const { data, isLoading, isError, error } = useAdminDashboard();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-red-500 text-center">
          Error fetching dashboard:{" "}
          {error.response?.data?.message || error.message}
        </div>
      </div>
    );

  console.log(data);

  const totalApplicants = data?.data?.data?.overview?.total_applicants;
  const totalManagers = data?.data?.data?.overview?.total_managers;

  const revenue = data?.data?.data?.quick_status?.total_revenue;
  const growthPercentage = data?.data?.data?.quick_status?.growth_percentage;

  const top_programs = data?.data?.data?.top_programs;

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Section: Pendaftar & Manajer */}
        <Heading title={"Pendaftar & Manajer"} variant="first" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          <Card className="flex items-center justify-center p-4 sm:p-6 lg:p-8 flex-col stroke-black gap-2 min-h-[140px] sm:min-h-[160px] border border-black shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <span className="font-bold text-3xl sm:text-4xl lg:text-4xl">
              {totalApplicants}
            </span>
            <span className="text-sm sm:text-base lg:text-lg text-gray-500">
              Pendaftar
            </span>
          </Card>
          <Card className="flex items-center justify-center p-4 sm:p-6 lg:p-8 flex-col stroke-black gap-2 min-h-[140px] sm:min-h-[160px] border border-black shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <span className="font-bold text-3xl sm:text-4xl lg:text-4xl">
              {totalManagers}
            </span>
            <span className="text-sm sm:text-base lg:text-lg text-gray-500">
              Manager
            </span>
          </Card>
        </div>

        <Heading title={"Quick Status"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          <Card className="flex items-center justify-center p-4 sm:p-6 lg:p-8 flex-col stroke-black gap-3 sm:gap-5 min-h-[140px] sm:min-h-[160px] border border-black shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <span className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center break-all">
              Rp {Number(revenue).toLocaleString("id-ID")}
            </span>
            <span className="text-sm sm:text-base lg:text-lg text-gray-500 text-center">
              Total Pendapatan
            </span>
          </Card>
          <Card className="flex items-center justify-center p-4 sm:p-6 lg:p-8 flex-col stroke-black gap-3 sm:gap-5 min-h-[140px] sm:min-h-[160px] border border-black shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <span className="font-bold text-3xl sm:text-4xl lg:text-4xl">
              {growthPercentage}%
            </span>
            <span className="text-sm sm:text-base lg:text-lg text-gray-500">
              Kenaikan
            </span>
          </Card>
        </div>

        <Heading title={"Prodi Pendaftar"} />
        <div className="w-full overflow-x-auto px-0">
          <div className="sm:min-w-0">
            <MajorTable top_programs={top_programs} />
          </div>
        </div>
      </div>
    </div>
  );
}
