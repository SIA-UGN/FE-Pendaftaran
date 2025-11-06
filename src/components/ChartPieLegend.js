"use client";

import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { name: "Lulus", value: 12, color: "#22c55e" }, // green-800
  { name: "Tidak Lulus", value: 23, color: "#ef4444" }, // red-800
  { name: "Pending", value: 4, color: "#facc15" }, // yellow-400
];

export function ChartPieLegend() {
  return (
    <Card className="flex flex-col w-full shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Statistik Penerimaan Mahasiswa</CardTitle>
        <CardDescription>Januari – Juni 2024</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        <div className="w-full max-w-[400px] aspect-square">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius="80%"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} orang`, name]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
