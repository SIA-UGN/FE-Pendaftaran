import { Card } from "@/components/ui/card";
import { ChartPieLegend } from "@/components/dashboard/ChartPieLegend";
import { ChartBarLabel } from "@/components/admin/BarChart";
import { Heading } from "@/components/Heading";
import { StatCard } from "@/components/StatCard";

export default function Page() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full gap-8 mx-auto">
      {/* Heading Keuangan */}
      <Heading title={"Keuangan"} />

      {/* Pie Chart */}
      <div className="w-full flex justify-center">
        <ChartPieLegend />
      </div>

      {/* Rincian */}
      <Heading title={"Rincian"} />

      {/* Total Income */}
      <div className="grid w-full max-w-3xl gap-6 justify-items-center">
        <StatCard value={"Rp412.000.000"} label={"Total Income"} />
      </div>

      {/* Approved, Rejected, Pending */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 sm:gap-8 mt-6">
        <StatCard value={80} label={"Approved"} />
        <StatCard value={80} label={"Rejected"} />
        <StatCard value={30} label={"Pending"} />
      </div>

      {/* Yearly Income */}
      <Heading title={"Yearly Income"} />

      <ChartBarLabel />

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-8">
        <StatCard value={"Rp70.000.000"} label={"Pemasukan Tahun Lalu"} />
        <StatCard value={"10%"} label={"Growth"} />
      </div>
    </div>
  );
}
