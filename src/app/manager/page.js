"use client";

import AccountInformation from "@/components/dashboard/AccountInformation";
import NotificationManager from "@/components/manager/NotificationManager";
import { useAdminDashboard } from "@/hooks/useAdmin";
import { Heading } from "@/components/Heading";
import { StatCard } from "@/components/StatCard";
import { MajorTable } from "@/components/MajorTable";

export default function Dashboard() {
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

  const revenue = data?.data?.data?.total_revenue;
  const growthPercentage = data?.data?.data?.growth_percentage;
  const top_programs = data?.data?.data?.programs;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto mb-6">
      <AccountInformation />
      {/* <NotificationManager /> */}
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-screen-xl mx-auto w-full gap-3">
        <Heading title={"Quick Status"} variant="first"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12 w-full">
          <StatCard
            value={`Rp ${Number(revenue).toLocaleString("id-ID")}`}
            label={"Total Pendapatan"}
            className="w-full"
          />
          <StatCard value={`${growthPercentage}%`} label={"Kenaikan"} className="w-full"/>
        </div>
        <Heading title={"Prodi Pendaftar"} variant="first"/>
        <div className="w-full overflow-x-auto px-0">
          <div className="sm:min-w-0">
            <MajorTable top_programs={top_programs} />
          </div>
        </div>
      </div>
    </div>
  );
}
