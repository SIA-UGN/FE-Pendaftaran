"use client";

import { Card } from "@/components/ui/card";
import { ChartPieApplicant } from "@/components/dashboard/ChartPieApplicant";
import { Heading } from "@/components/Heading";
import { StatCard } from "@/components/StatCard";
import { useApplicantStatistics } from "@/hooks/useAdmin";

export default function Page() {
  const { data, isLoading, isError, error } = useApplicantStatistics();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data.data.data.donut_chart);

  const chartData = data.data.data.donut_chart;
  const verificationData = data.data.data.verification_summary;
  const graduationData = data.data.data.graduation_summary;

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full gap-3 mx-auto">
      <Heading title={"Profil Pendaftar"} />
      <ChartPieApplicant data={chartData} />

      <Heading title={"Rincian Data Terverifikasi"} />
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
        <StatCard value={verificationData.approved} label={"Approved"} />
        <StatCard value={verificationData.rejected} label={"Rejected"} />
        <StatCard value={verificationData.pending} label={"Pending"} />
      </div>

      <Heading title={"Rincian Kelulusan Pendaftaran"} />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl gap-12">
        <StatCard value={graduationData.lulus} label={"Lulus"} />
        <StatCard value={graduationData.tidak_lulus} label={"Tidak Lulus"} />
      </div>
    </div>
  );
}
