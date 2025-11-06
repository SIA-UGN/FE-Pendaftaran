"use client";

import { useState } from "react";
import AccountInformation from "@/components/AccountInformation";
import ApplicantInformation from "@/components/ApplicantInformation";
import ManajerList from "@/components/ManajerList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [activeTab, setActiveTab] = useState("pendaftar");

  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-md mx-auto mt-12"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-1 rounded-full h-12">
          <TabsTrigger
            value="pendaftar"
            className="rounded-full data-[state=active]:bg-green-800 data-[state=active]:text-white transition-all"
          >
            Pendaftar
          </TabsTrigger>
          <TabsTrigger
            value="manajer"
            className="rounded-full data-[state=active]:bg-green-800 data-[state=active]:text-white transition-all"
          >
            Manajer
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "pendaftar" && (
        <>
          <ApplicantInformation />
        </>
      )}

      {activeTab === "manajer" && (
        <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full">
          <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Data Manajer
          </h2>
          <ManajerList />
        </div>
      )}
    </div>
  );
}
