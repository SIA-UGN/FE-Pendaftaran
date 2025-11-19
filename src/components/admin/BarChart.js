"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Cell, YAxis, ResponsiveContainer } from "recharts";

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

const colors = ["var(--green)", "var(--yellow)"];

export const description = "A bar chart with a label";

const chartData = [
  { year: "2020", desktop: 186 },
  { year: "2021", desktop: 305 },
  { year: "2022", desktop: 237 },
  { year: "2023", desktop: 73 },
  { year: "2024", desktop: 209 },
  { year: "2025", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
};

export function ChartBarLabel() {
  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">
          Bar Chart - Label
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          2020 - 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 lg:px-6 pb-4 sm:pb-6">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] lg:h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
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
                width={40}
                label={{
                  value: "Jumlah",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { fontSize: 14, textAnchor: "middle" },
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" radius={8} maxBarSize={60}>
                {chartData.map((entry, index) => (
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