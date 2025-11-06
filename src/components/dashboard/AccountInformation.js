"use client";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";

export default function AccountInformation() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-screen-xl mx-auto my-12 w-full gap-12">
      <Heading title={"Pendaftar"} />

      <div className="grid grid-cols-1 sm:w-6/12 md:w-4/12 gap-12">
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
          <span className="font-bold text-4xl text-[var(--green)]">123</span>
          <span className="text-lg text-gray-500">Total Pendaftar</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-6">
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
          <span className="font-bold text-4xl text-green-700">80</span>
          <span className="text-lg text-gray-500">Approved</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
          <span className="font-bold text-4xl text-red-700">30</span>
          <span className="text-lg text-gray-500">Rejected</span>
        </Card>
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
          <span className="font-bold text-4xl text-yellow-500">23</span>
          <span className="text-lg text-gray-500">Pending</span>
        </Card>
      </div>
    </div>
  );
}
