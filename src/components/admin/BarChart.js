"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Cell, YAxis } from "recharts";

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
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>2020 - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              label={{ value: "Tahun", position: "insideBottom" }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              label={{
                value: "Jumlah",
                angle: -90,
                position: "insideLeft",
                offset: -5,
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" radius={8}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  className="rounded-none"
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
