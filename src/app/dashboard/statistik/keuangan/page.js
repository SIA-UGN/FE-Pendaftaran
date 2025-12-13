"use client";

import { Card } from "@/components/ui/card";
import { ChartPiePayment } from "@/components/dashboard/ChartPiePayment";
import { ChartBarLabel } from "@/components/admin/BarChart";
import { Heading } from "@/components/Heading";
import { StatCard } from "@/components/StatCard";
import { useFinancialStatistics, useYearlyRevenue } from "@/hooks/useAdmin";

export default function Page() {
  const { data, isLoading, isError, error } = useFinancialStatistics();
  const { data: yearlyData } = useYearlyRevenue(5);

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

  console.log("Financial Statistics Backend Data:", responseData);

  // Backend returns: { total_revenue, verified_revenue, pending_revenue, total_payments, verified_payments, pending_payments }
  // ChartPiePayment expects object: { verified, rejected, pending }
  const chartData = {
    verified: responseData?.verified_payments || 0,
    rejected: 0, // Backend doesn't track rejected payments
    pending: responseData?.pending_payments || 0,
  };

  const summary = {
    total_income: responseData?.total_revenue || 0,
    approved: responseData?.verified_payments || 0,
    rejected: 0,
    pending: responseData?.pending_payments || 0,
  };

  // Calculate comparison from yearly revenue data
  const yearlyRevenue = yearlyData?.data?.data?.monthly_revenue || {};
  const currentYearTotal = Object.values(yearlyRevenue).reduce(
    (sum, val) => sum + Number(val || 0),
    0
  );

  // For last year comparison, we would need last year's data
  // Since backend doesn't provide it, we'll show current year data
  const comparison = {
    last_year_income: 0, // Backend doesn't provide last year data
    growth_percentage: 0, // Can't calculate without last year data
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full gap-8 mx-auto">
      {/* Heading Keuangan */}
      <Heading title={"Keuangan"} variant="first" />

      {/* Pie Chart */}
      <div className="w-full flex justify-center">
        <ChartPiePayment data={chartData} />
      </div>

      {/* Rincian */}
      <Heading title={"Rincian"} />

      {/* Total Income */}
      <div className="grid w-full max-w-3xl gap-6 justify-items-center">
        <StatCard
          value={`Rp${Number(summary?.total_income || 0).toLocaleString(
            "id-ID"
          )}`}
          label={"Total Income"}
        />
      </div>

      {/* Approved, Rejected, Pending */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 sm:gap-8 mt-6">
        <StatCard value={summary?.approved || 0} label={"Approved"} />
        <StatCard value={summary?.rejected || 0} label={"Rejected"} />
        <StatCard value={summary?.pending || 0} label={"Pending"} />
      </div>

      {/* Yearly Income */}
      <Heading title={"Yearly Income"} />

      <ChartBarLabel />

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-8">
        <StatCard
          value={`Rp${Number(comparison?.last_year_income || 0).toLocaleString(
            "id-ID"
          )}`}
          label={"Pemasukan Tahun Lalu"}
        />
        <StatCard
          value={`${comparison?.growth_percentage || 0}%`}
          label={"Growth"}
        />
      </div>
    </div>
  );
}
