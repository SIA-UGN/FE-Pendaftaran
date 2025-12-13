"use client";

import { Card } from "@/components/ui/card";
import { ChartPieApplicant } from "@/components/dashboard/ChartPieApplicant";
import { Heading } from "@/components/Heading";
import { StatCard } from "@/components/StatCard";
import { useApplicantStatistics } from "@/hooks/useAdmin";

export default function Page() {
  const { data, isLoading, isError, error } = useApplicantStatistics();

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
          Error: {error?.response?.data?.message || error?.message}
        </div>
      </div>
    );

  const responseData = data?.data?.data || {};

  console.log("Raw Backend Data:", responseData);

  // Backend returns: by_status, by_program, by_gender, by_graduation_status
  const byStatus = responseData?.by_status || {};
  const byGraduation = responseData?.by_graduation_status || {};
  
  // Transform for ChartPieApplicant - expects { approved, rejected, pending }
  const chartData = {
    approved: byStatus?.approved || 0,
    rejected: byStatus?.rejected || 0,
    pending: (byStatus?.submitted || 0) + (byStatus?.reviewed || 0) + (byStatus?.draft || 0)
  };

  // Verification summary from by_status
  const verificationData = {
    approved: byStatus?.approved || 0,
    rejected: byStatus?.rejected || 0,
    pending: (byStatus?.submitted || 0) + (byStatus?.reviewed || 0)
  };

  // Graduation summary from by_graduation_status
  const graduationData = {
    lulus: byGraduation?.["Sudah Lulus"] || 0,
    tidak_lulus: byGraduation?.["Belum Lulus"] || 0
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full gap-3 mx-auto">
      <Heading title={"Profil Pendaftar"} variant={"first"} />
      <ChartPieApplicant data={chartData} />

      <Heading title={"Rincian Data Terverifikasi"} />
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
        <StatCard value={verificationData?.approved || 0} label={"Approved"} />
        <StatCard value={verificationData?.rejected || 0} label={"Rejected"} />
        <StatCard value={verificationData?.pending || 0} label={"Pending"} />
      </div>

      <Heading title={"Rincian Kelulusan Pendaftaran"} />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl gap-12">
        <StatCard value={graduationData?.lulus || 0} label={"Lulus"} />
        <StatCard
          value={graduationData?.tidak_lulus || 0}
          label={"Tidak Lulus"}
        />
      </div>
    </div>
  );
}
