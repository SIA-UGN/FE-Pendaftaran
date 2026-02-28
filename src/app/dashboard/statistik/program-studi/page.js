"use client";

import { Heading } from "@/components/Heading";
import { useProgramStatistics } from "@/hooks/useAdmin";
import { ChartPiePrograms } from "@/components/dashboard/ChartPiePrograms";

export default function Page() {
  const { data, isLoading, isError, error } = useProgramStatistics();

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

  const responseData = data?.data?.data || [];

  const chartData = Array.isArray(responseData)
    ? responseData.map((program) => ({
        name: program.program_name,
        value: program.total_applicants,
        fill: `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`,
      }))
    : [];

  const topPrograms = Array.isArray(responseData)
    ? responseData.map((program) => ({
        program: program.program_name,
        registrants: program.total_applicants,
        description: `Approved: ${program.approved}, Pending: ${program.pending}, Rejected: ${program.rejected}`,
      }))
    : [];

  const allPrograms = responseData;

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl my-6 sm:my-8 lg:my-12 w-full gap-3 mx-auto">
      <Heading title="Program Studi" variant="first" />
      <ChartPiePrograms data={chartData} />

      <Heading title="Rincian" />

      <div className="grid grid-cols-1 w-full gap-3 sm:gap-4 lg:gap-6">
        {topPrograms.map((program, index) => (
          <div
            className="flex items-start justify-center p-4 sm:p-5 lg:p-6 flex-col w-full gap-2"
            style={{ backgroundColor: '#ffffff', border: '1px solid #E6EEE9', borderRadius: '16px' }}
            key={index}
          >
            <span className="font-bold text-base sm:text-lg lg:text-xl" style={{ color: '#015023' }}>
              {program.program}
            </span>
            <span className="text-sm sm:text-base text-gray-500">
              {program.registrants} Pendaftar
            </span>
            <span className="text-xs sm:text-sm lg:text-base text-gray-500">
              {program.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
