"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { columns } from "../Column";
import { DataTable } from "../DataTable";
import { useEffect, useState } from "react";
import { useAnnouncements } from "@/hooks/useAnnouncement";

export default function Announcement() {
  const [data, setData] = useState([]);
  const [isOn, setIsOn] = useState(false);

  const { data: announcementData, isLoading, isError, error } = useAnnouncements()
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error : {error.message}</div>

  console.log(announcementData);

  return (
    <div className="flex flex-col items-center pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 w-full border-b border-gray-300 pb-3 sm:pb-4 text-[var(--green)]">
        Pengumuman
      </h2>
      {isOn ? (
        <div className="w-full overflow-x-auto">
          <ScrollArea className="max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] rounded-md border border-gray-200 w-full">
            <DataTable columns={columns} data={data} />
          </ScrollArea>
        </div>
      ) : (
        <div className="w-full p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center gap-4 sm:gap-6">
          <p className="text-center text-gray-500 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            Dokumen masih berada dalam proses verifikasi. Silakan cek kembali
            nanti.
          </p>
          <Button
            variant="yellow"
            className="rounded-lg px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          >
            17 November 2025
          </Button>
        </div>
      )}
    </div>
  );
}
