"use client";

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

  const total_applicants = data.data.data.total_applicants;
  const approved = data.data.data.approved_applicants;
  const rejected = data.data.data.rejected_applicants;
  const pending = data.data.data.pending_applicants;

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-screen-xl mx-auto my-12 w-full gap-8">
      <Heading title={"Pendaftar"} variant="first" />

      <div className="grid w-full md:w-md lg:w-lg grid-cols-1 gap-12">
        <div
          className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #015023',
            borderRadius: '16px',
          }}
        >
          <span className="font-bold text-4xl" style={{ color: '#015023' }}>
            {total_applicants}
          </span>
          <span className="text-lg text-gray-500">Total Pendaftar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-6">
        <div
          className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40"
          style={{ backgroundColor: '#ffffff', border: '1px solid #E6EEE9', borderRadius: '16px' }}
        >
          <span className="font-bold text-4xl" style={{ color: '#016B30' }}>{approved}</span>
          <span className="text-lg text-gray-500">Approved</span>
        </div>
        <div
          className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40"
          style={{ backgroundColor: '#ffffff', border: '1px solid #E6EEE9', borderRadius: '16px' }}
        >
          <span className="font-bold text-4xl text-red-600">{rejected}</span>
          <span className="text-lg text-gray-500">Rejected</span>
        </div>
        <div
          className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40"
          style={{ backgroundColor: '#ffffff', border: '1px solid #E6EEE9', borderRadius: '16px' }}
        >
          <span className="font-bold text-4xl" style={{ color: '#8a7a30' }}>{pending}</span>
          <span className="text-lg text-gray-500">Pending</span>
        </div>
      </div>
    </div>
  );
}
