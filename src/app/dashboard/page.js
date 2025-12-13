"use client";

import { MajorTable } from "@/components/MajorTable";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";
import { useAdminDashboard, useApplicantStatistics } from "@/hooks/useAdmin";
import { StatCard } from "@/components/StatCard";

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

  const totalApplicants = data?.data?.data?.total_applicants;
  const totalManagers = data?.data?.data?.total_managers;

  const revenue = data?.data?.data?.total_revenue;
  const growthPercentage = data?.data?.data?.growth_percentage;

  const top_programs = data?.data?.data?.programs;

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        <Heading title={"Pendaftar & Manajer"} variant="first" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          <StatCard value={totalApplicants} label={"Pendaftar"} />
          <StatCard value={totalManagers} label={"Manager"} />
        </div>

        <Heading title={"Quick Status"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          <StatCard
            value={`Rp ${Number(revenue).toLocaleString("id-ID")}`}
            label={"Total Pendapatan"}
          />
          <StatCard value={`${growthPercentage}%`} label={"Kenaikan"} />
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
