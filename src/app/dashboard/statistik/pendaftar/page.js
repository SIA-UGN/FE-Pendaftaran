import { Card } from "@/components/ui/card";
import { ChartPieLegend } from "@/components/dashboard/ChartPieLegend";
import { Heading } from "@/components/Heading";
import { StatCard } from "@/components/StatCard";

export default function Page() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full gap-3 mx-auto">
      <Heading title={"Profil Pendaftar"} />
      <ChartPieLegend />

      <Heading title={"Rincian Data Terverifikasi"} />
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
        <StatCard value={80} label={"Approved"} />
        <StatCard value={30} label={"Rejected"} />
        <StatCard value={37} label={"Pending"} />
      </div>

      <Heading title={"Rincian Kelulusan Pendaftaran"} />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl gap-12">
        <StatCard value={80} label={"Lulus"} />
        <StatCard value={37} label={"Tidak Lulus"} />
      </div>
    </div>
  );
}
