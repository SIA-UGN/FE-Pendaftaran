"use client";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";
import { useProgramStatistics } from "@/hooks/useAdmin";
import { ChartPiePrograms } from "@/components/dashboard/ChartPiePrograms";

export default function Page() {
  const { data, isLoading, isError, error } = useProgramStatistics();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data.data.data.donut_chart);

  const chartData = data.data.data.donut_chart;
  const topPrograms = data.data.data.top_programs;
  const allPrograms = data.data.data.all_programs;

  console.log(chartData)

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full gap-3 mx-auto">
      <Heading title={"Program Studi"} />
      <ChartPiePrograms data={chartData} />

      <Heading title={"Rincian"} />

      <div className="grid grid-cols-1 w-full gap-12">
        {topPrograms.map((program, index) => (
          <>
            <Card className="flex items-start justify-center p-6 flex-col w-full stroke-black gap-2" key={index}>
              <span className="font-bold text-xl text-[var(--green)]">
                {program.program}
              </span>
              <span className="text-md text-gray-500">{program.registrants} Pendaftar</span>
              <span className="text-md text-gray-500">
                {program.description}
              </span>
            </Card>
          </>
        ))}
      </div>
    </div>
  );
}
