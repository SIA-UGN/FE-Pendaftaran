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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-red-500 text-center max-w-md">
          <p className="font-semibold mb-2">
            Error fetching applicant statistics:
          </p>
          <p className="text-sm">
            {error.response?.data?.message || error.message}
          </p>
        </div>
      </div>
    );
  }

  const Approved = data.data.data.verification_summary.approved;
  const Pending = data.data.data.verification_summary.pending;
  const Rejected = data.data.data.verification_summary.rejected;

  const Lulus = data.data.data.graduation_summary.lulus;
  const TidakLulus = data.data.data.graduation_summary.tidak_lulus;

  console.log(data.data.data);

  const VerificationTable = data.data.data.verification_table;
  const GraduationTable = data.data.data.graduation_table;

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Tabs Navigation */}
        <div className="w-full max-w-md mx-auto mb-6 sm:mb-8 lg:mb-10">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList
              className="grid w-full grid-cols-2 bg-gray-200 p-1 rounded-full 
              h-10 sm:h-12 lg:h-14 
              text-xs sm:text-sm lg:text-base
              shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <TabsTrigger
                value="pendaftar"
                className="rounded-full 
                data-[state=active]:bg-green-800 
                data-[state=active]:text-[var(--yellow)] 
                data-[state=inactive]:text-gray-600
                data-[state=inactive]:hover:text-gray-900
                transition-all duration-200 cursor-pointer 
                py-2 sm:py-2.5 lg:py-3
                font-medium"
              >
                Pendaftar
              </TabsTrigger>

              <TabsTrigger
                value="manajer"
                className="rounded-full 
                data-[state=active]:bg-green-800 
                data-[state=active]:text-[var(--yellow)] 
                data-[state=inactive]:text-gray-600
                data-[state=inactive]:hover:text-gray-900
                transition-all duration-200 cursor-pointer 
                py-2 sm:py-2.5 lg:py-3
                font-medium"
              >
                Manajer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="w-full max-w-7xl mx-auto">
          {activeTab === "pendaftar" && (
            <div className="w-full animate-in fade-in duration-300">
              <ApplicantInformation
                Approved={Approved}
                Rejected={Rejected}
                Pending={Pending}
                Lulus={Lulus}
                TidakLulus={TidakLulus}
                VerificationTable={VerificationTable}
                GraduationTable={GraduationTable}
              />
            </div>
          )}

          {activeTab === "manajer" && (
            <div className="w-full animate-in fade-in duration-300">
              <div className="flex flex-col items-center w-full">
                <Heading title={"Data Manajer"} variant={"first"} />

                <div className="w-full">
                  <ManajerList />
                </div>

                <div className="w-full flex justify-center sm:justify-end mt-6 sm:mt-8 lg:mt-12 px-4 sm:px-0">
                  <Link
                    href="/dashboard/manajer/tambah"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="green"
                      className="w-full sm:w-auto rounded-lg px-6 py-2.5 sm:py-3 
                      text-sm sm:text-base font-medium
                      shadow-md hover:shadow-lg 
                      transition-all duration-300
                      hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="hidden sm:inline">
                        Tambahkan Manajer
                      </span>
                      <span className="inline sm:hidden">+ Tambah Manajer</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
