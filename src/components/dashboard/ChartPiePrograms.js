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
        className="text-xl sm:text-2xl font-bold"
        fill={fill}
      >
        {value}
      </text>
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        className="text-xs sm:text-sm font-medium"
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

// Generate color palette dynamically
const generateColors = (count) => {
  const baseColors = [
    "#015023", // Green
    "#666666", // Gray
    "#f59e0b", // Amber
    "#3b82f6", // Blue
    "#ef4444", // Red
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#14b8a6", // Teal
    "#f97316", // Orange
    "#06b6d4", // Cyan
  ];

  // If we have more items than base colors, generate additional colors
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }

  // Generate additional colors using HSL
  const colors = [...baseColors];
  for (let i = baseColors.length; i < count; i++) {
    const hue = (i * 137.508) % 360; // Golden angle approximation
    colors.push(`hsl(${hue}, 65%, 45%)`);
  }

  return colors;
};

export function ChartPiePrograms({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  console.log("ChartPiePrograms data:", data);

  const colors = generateColors(data.length);
  const total = data.reduce((sum, item) => sum + (Number(item.value) || Number(item.count) || 0), 0);

  return (
    <Card className="flex flex-col w-full shadow-md gap-0">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600 px-4">
          <p className="text-base sm:text-lg font-medium">
            Belum ada data pendaftar terdata.
          </p>
        </div>
      ) : (
        <>
          <CardHeader className="items-center pb-0 px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center">
              Statistik Penerimaan Mahasiswa
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Januari – Juni 2024
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center pt-4 sm:pt-6 px-4 sm:px-6">
            {/* Chart */}
            <div className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[600px] aspect-square">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    dataKey={(entry) => entry.value || entry.count || 0}
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="45%"
                    outerRadius="70%"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(count, program) => [`${count} orang`, program]}
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
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6 max-w-full">
              {data.map((item, index) => (
                <div key={item.program} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[120px] sm:max-w-none">
                    {item.program}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 sm:px-6 py-2 border border-gray-200">
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                Total
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-800">
                {total}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">orang</span>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
