"use client";

import { useEffect } from "react";
import { columns } from "./Column";
import { DataTable } from "./Data-Table";
import { useMyRegistration } from "@/hooks/useRegistration";

export default function Prestasi({ Data }) {
  const { data: registrationData, isLoading, refetch } = useMyRegistration();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 border rounded-xl m-12 bg-[var(--light-cream)] p-8">
        <div className="animate-pulse">Memuat data prestasi...</div>
      </div>
    );
  }

  let finalData = [];

  const achievements = registrationData?.data?.registration?.achievements || [];

  if (!Data || Data.length === 0) {
    finalData = achievements.map((item) => ({
      id: item.id_achievement?.toString() || "",
      achievement_name: item.achievement_name,
      year: item.year,
      type: item.achievement_type,
      level: item.achievement_level,
      organizer: item.organizer,
      rank: item.ranking,
      certificate_file: item.certificate_url,
    }));
  } else {
    finalData = Data.map((item) => ({
      id: item.id_achievement?.toString() || "",
      achievement_name: item.achievement_name,
      year: item.year,
      type: item.achievement_type,
      level: item.achievement_level,
      organizer: item.organizer,
      rank: item.ranking,
      certificate_file: item.certificate_url,
    }));
  }

  return (
    <div className="flex flex-col gap-5 border rounded-xl m-12 bg-[var(--light-cream)]">
      {finalData.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          Belum ada data prestasi
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={finalData}
          className={"w-full p-4 bg-white"}
        />
      )}
    </div>
  );
}
