"use client";

import { Card } from "@/components/ui/card";
import { ChartPiePayment } from "@/components/dashboard/ChartPiePayment";
import { ChartBarLabel } from "@/components/admin/BarChart";
import { Heading } from "@/components/Heading";
import { StatCard } from "@/components/StatCard";
import { useFinancialStatistics } from "@/hooks/useAdmin";

export default function Page() {
  const { data, isLoading, isError, error } = useFinancialStatistics();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data.data.data);
  const chartData = data.data.data.donut_chart;
  const summary = data.data.data.summary;
  const yearly_income = data.data.data.yearly_income;
  const comparison = data.data.data.comparison;

  console.log(comparison);

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full gap-8 mx-auto">
      {/* Heading Keuangan */}
      <Heading title={"Keuangan"} />

      {/* Pie Chart */}
      <div className="w-full flex justify-center">
        <ChartPiePayment data={chartData} />
      </div>

      {/* Rincian */}
      <Heading title={"Rincian"} />

      {/* Total Income */}
      <div className="grid w-full max-w-3xl gap-6 justify-items-center">
        <StatCard
          value={`Rp${summary.total_income.toLocaleString("id-ID")}`}
          label={"Total Income"}
        />
      </div>

      {/* Approved, Rejected, Pending */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 sm:gap-8 mt-6">
        <StatCard value={summary.approved} label={"Approved"} />
        <StatCard value={summary.rejected} label={"Rejected"} />
        <StatCard value={summary.pending} label={"Pending"} />
      </div>

      {/* Yearly Income */}
      <Heading title={"Yearly Income"} />

      <ChartBarLabel />

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-8">
        <StatCard value={`Rp${comparison.last_year_income.toLocaleString("id-ID")}`} label={"Pemasukan Tahun Lalu"} />
        <StatCard value={`${comparison.growth_percentage}%`} label={"Growth"} />
      </div>
    </div>
  );
}
