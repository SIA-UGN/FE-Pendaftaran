"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 15}
        textAnchor="middle"
        className="text-2xl font-bold"
        fill={fill}
      >
        {value}
      </text>
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        className="text-sm font-medium"
        fill="#6b7280"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 25}
        textAnchor="middle"
        className="text-xs"
        fill="#9ca3af"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 14}
        fill={fill}
        opacity={0.3}
      />
    </g>
  );
};

export function ChartPieApplicant({ data }) {
  const [activeIndex, setActiveIndex] = useState(1);

  
  const chartData = [
    { name: "Lulus", value: data.approved, color: "#22c55e" },
    { name: "Tidak Lulus", value: data.rejected, color: "#ef4444" },
    { name: "Pending", value: data.pending, color: "#facc15" },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="flex flex-col w-full shadow-md gap-0">
      {data.approved === 0 && data.rejected === 0 && data.pending === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
          <p className="text-lg font-medium">
            Belum ada data pendaftar terdata.
          </p>
        </div>
      ) : (
        <>
          <CardHeader className="items-center pb-0">
            <CardTitle>Statistik Penerimaan Mahasiswa</CardTitle>
            <CardDescription>Januari – Juni 2024</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center pt-6">
            {/* Chart */}
            <div className="w-full max-w-[600px] aspect-square">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="45%"
                    outerRadius="70%"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    animationBegin={0}
                    animationDuration={800}
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

            {/* Legend */}
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

            {/* Total */}
            <div className="mt-6 inline-flex items-center gap-2 bg-gray-50 rounded-full px-6 py-2 border border-gray-200">
              <span className="text-sm text-gray-600 font-medium">Total</span>
              <span className="text-xl font-bold text-gray-800">{total}</span>
              <span className="text-sm text-gray-500">orang</span>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
