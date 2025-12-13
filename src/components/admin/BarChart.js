"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Cell,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useYearlyRevenue } from "@/hooks/useAdmin";

const colors = ["var(--green)", "var(--yellow)"];

export const description = "A bar chart with a label";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
};

export function ChartBarLabel() {
  const {
    data: yearlyRevenueData,
    isLoading,
    isError,
    error,
  } = useYearlyRevenue(5);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const responseData = yearlyRevenueData?.data?.data || {};
  console.log("Yearly Revenue Data:", responseData);
  
  // Backend returns: { year: 2025, monthly_revenue: { 1: 0, 2: 0, ..., 11: "9500000.00", 12: "11500000.00" } }
  const monthlyRevenue = responseData?.monthly_revenue || {};
  
  // Transform to array format for BarChart
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yearly_revenue = monthNames.map((month, index) => ({
    month: month,
    revenue: Number(monthlyRevenue[index + 1] || 0)
  }));
  
  const year = responseData?.year || new Date().getFullYear();
  const range = { start: `January ${year}`, end: `December ${year}` };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">
          Bar Chart - Label
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {range.start} - {range.end}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 lg:px-6 pb-4 sm:pb-6">
        <ChartContainer
          config={chartConfig}
          className="h-[250px] sm:h-[300px] lg:h-[350px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={yearly_revenue}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 12 }}
                label={{
                  value: "Tahun",
                  position: "insideBottom",
                  offset: -10,
                  style: { fontSize: 14 },
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={60}
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="revenue" radius={8} maxBarSize={60}>
                {yearly_revenue.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
