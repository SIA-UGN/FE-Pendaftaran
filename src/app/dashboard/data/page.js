"use client";

import { useState } from "react";
import AccountInformation from "@/components/dashboard/AccountInformation";
import ApplicantInformation from "@/components/dashboard/ApplicantInformation";
import ManajerList from "@/components/ManajerList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useApplicantStatistics } from "@/hooks/useAdmin";

export default function Page() {
  const [activeTab, setActiveTab] = useState("pendaftar");

  const { data, isLoading, isError, error } = useApplicantStatistics();

  
  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Error fetching applicant statistics: {error.response?.data?.message || error.message}
      </div>
    );
  
  const Approved = data.data.data.verification_summary.approved;
  const Pending = data.data.data.verification_summary.pending;
  const Rejected = data.data.data.verification_summary.rejected;

  const Lulus = data.data.data.graduation_summary.lulus;
  const TidakLulus = data.data.data.graduation_summary.tidak_lulus;

  console.log(data.data.data);

  const VerificationTable = data.data.data.verification_table;
  const GraduationTable = data.data.data.graduation_table;
  
  return (
    <div className="flex flex-col items-center justify-center w-full px-3 sm:px-6">
      {/* Tabs Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-md mx-auto mt-8 sm:mt-12"
      >
        <TabsList
          className="
            grid w-full grid-cols-2 
            bg-gray-200 p-1 rounded-full h-10 sm:h-12 
            text-sm sm:text-base
            shadow-lg
          "
        >
          <TabsTrigger
            value="pendaftar"
            className="
              rounded-full 
              data-[state=active]:bg-green-800 
              data-[state=active]:text-[var(--yellow)] 
              transition-all cursor-pointer 
              py-2 sm:py-3
            "
          >
            Pendaftar
          </TabsTrigger>

          <TabsTrigger
            value="manajer"
            className="
              rounded-full 
              data-[state=active]:bg-green-800 
              data-[state=active]:text-[var(--yellow)] 
              transition-all cursor-pointer 
              py-2 sm:py-3
            "
          >
            Manajer
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      <div className="w-full max-w-6xl">
        {activeTab === "pendaftar" && (
          <div className="mt-6 sm:mt-8 w-full">
            <ApplicantInformation Approved={Approved} Rejected={Rejected} Pending={Pending} Lulus={Lulus} TidakLulus={TidakLulus} VerificationTable={VerificationTable} GraduationTable={GraduationTable}/>
          </div>
        )}

        {activeTab === "manajer" && (
          <div className="flex flex-col items-center px-3 sm:px-8 max-w-[90rem] my-8 sm:my-12 w-full">
            <Heading title={"Data Manajer"} />
            <ManajerList/>
            <div className="w-full py-4 justify-end flex mt-12">
              <Link href="/dashboard/manajer/tambah">
                <Button variant={"green"} className={"rounded-lg"}>
                  Tambahkan Manajer
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
