"use client";

import { useState } from "react";
import ApplicantInformation from "@/components/dashboard/ApplicantInformation";
import ManajerList from "@/components/ManajerList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useApplicantStatistics, useApplicants } from "@/hooks/useAdmin";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("pendaftar");

  // Get statistics summary
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrorMsg,
  } = useApplicantStatistics({
    per_page: 100,
  });

  // Get applicants list for table display
  const {
    data: applicantsData,
    isLoading: applicantsLoading,
    isError: applicantsError,
  } = useApplicants({
    per_page: 100,
  });

  const isLoading = statsLoading || applicantsLoading;
  const isError = statsError || applicantsError;
  const error = statsErrorMsg;

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

  const responseData = statsData?.data?.data || {};
  const applicantsResponse = applicantsData?.data?.data || {};

  const Approved = responseData?.by_status?.approved || 0;
  const Pending = responseData?.by_status?.submitted || 0;
  const Rejected = responseData?.by_status?.rejected || 0;

  // FIX: Mapping graduation status - "Sudah Lulus" = Lulus, "Belum Lulus" = Tidak Lulus
  const Lulus = responseData?.by_graduation_status?.["Sudah Lulus"] || 0;
  const TidakLulus = responseData?.by_graduation_status?.["Belum Lulus"] || 0;

  // Get applicants list from /admin/applicants endpoint
  // Backend returns: { success: true, data: [...] } - array langsung, bukan nested
  const applicantsList = applicantsResponse || [];

  // Backend structure: { id_profile, id_user, full_name, email, program_name, registration_number, registration_status, created_at, phone_number }
  // Map to frontend expected structure
  const mappedApplicants = applicantsList.map((app) => ({
    id_profile: app.id_profile,
    user_id: app.id_user,
    registration_number: app.registration_number,
    user: {
      id: app.id_user,
      name: app.full_name, // Backend uses full_name directly
      email: app.email, // Backend uses email directly
    },
    status: app.registration_status,
    registration_status: app.registration_status,
    graduation_status: app.graduation_status,
    program: app.program_name,
    created_at: app.created_at,
    phone_number: app.phone_number,
  }));

  // Filter by registration_status for verification table
  const verificationApplicants = mappedApplicants.filter((app) =>
    ["submitted", "reviewed", "approved", "rejected"].includes(
      app.registration_status
    )
  );

  // Filter by graduation_status for graduation table
  const graduationApplicants = mappedApplicants.filter(
    (app) =>
      app.graduation_status &&
      ["Sudah Lulus", "Belum Lulus"].includes(app.graduation_status)
  );

  const VerificationTable = {
    data: verificationApplicants,
    current_page: 1,
    total: verificationApplicants.length,
  };

  const GraduationTable = {
    data: graduationApplicants,
    current_page: 1,
    total: graduationApplicants.length,
  };

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
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
                data-[state=active]:bg-[#015023]
                data-[state=active]:text-[#DABC4E]
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
                data-[state=active]:bg-[#015023]
                data-[state=active]:text-[#DABC4E]
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
              <div className="flex flex-col items-center container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
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
                      variant="primary"
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

