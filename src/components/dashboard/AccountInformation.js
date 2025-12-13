"use client";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";
import { useManagerDashboard } from "@/hooks/useManager";

export default function AccountInformation() {
  const { data, isLoading, isError, error } = useManagerDashboard();

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Error fetching applicant statistics:{" "}
        {error.response?.data?.message || error.message}
      </div>
    );

  console.log(data.data.data);

  const total_applicants = data.data.data.total_applicants;
  const approved = data.data.data.approved_applicants;
  const rejected = data.data.data.rejected_applicants;
  const pending = data.data.data.pending_applicants;

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-screen-xl mx-auto my-12 w-full gap-12">
      <Heading title={"Pendaftar"} variant="first"/>

      <div className="grid grid-cols-1 sm:w-6/12 md:w-4/12 gap-12">
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
          <span className="font-bold text-4xl text-[var(--green)]">{total_applicants}</span>
          <span className="text-lg text-gray-500">Total Pendaftar</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-6">
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
          <span className="font-bold text-4xl text-green-700">{approved}</span>
          <span className="text-lg text-gray-500">Approved</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
          <span className="font-bold text-4xl text-red-700">{rejected}</span>
          <span className="text-lg text-gray-500">Rejected</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
          <span className="font-bold text-4xl text-yellow-500">{pending}</span>
          <span className="text-lg text-gray-500">Pending</span>
        </Card>
      </div>
    </div>
  );
}
