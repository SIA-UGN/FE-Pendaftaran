"use client";

import ApplicantInformation from "@/components/dashboard/ApplicantInformation";
import { useManagerApplicants } from "@/hooks/useManager";
import { useApplicantStatistics } from "@/hooks/useAdmin";

export default function Pendaftar() {
  // Get statistics (summary counts)
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useApplicantStatistics({ per_page: 100 });

  // Get full applicants list
  const {
    data: applicantsData,
    isLoading: applicantsLoading,
    isError: applicantsError,
    error,
  } = useManagerApplicants({ per_page: 100 });

  if (statsLoading || applicantsLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  if (statsError || applicantsError)
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-red-500 text-center">
          Error: {error?.response?.data?.message || error?.message}
        </div>
      </div>
    );

  const responseData = statsData?.data?.data || {};
  const applicantsResponse = applicantsData?.data?.data || {};

  const Approved = responseData?.by_status?.approved || 0;
  const Pending = responseData?.by_status?.pending || 0;
  const Rejected = responseData?.by_status?.rejected || 0;

  // FIX: Mapping graduation status - "Sudah Lulus" = Lulus, "Belum Lulus" = Tidak Lulus
  const Lulus = responseData?.by_graduation_status?.["Sudah Lulus"] || 0;
  const TidakLulus = responseData?.by_graduation_status?.["Belum Lulus"] || 0;

  // Get applicants list - backend returns array directly in data
  const applicantsList = applicantsResponse || [];

  // Map backend structure to expected frontend structure
  const mappedApplicants = applicantsList.map((app) => ({
    id_profile: app.id_profile,
    user_id: app.id_user,
    registration_number: app.registration_number,
    user: {
      id: app.id_user,
      name: app.full_name,
      email: app.email,
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

  console.log("Verification Summary:", responseData?.verification_summary);
  console.log("Verification Table:", VerificationTable);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
      <ApplicantInformation
        Approved={Approved}
        Rejected={Rejected}
        Pending={Pending}
        Lulus={Lulus}
        TidakLulus={TidakLulus}
        VerificationTable={VerificationTable}
        GraduationTable={GraduationTable}
        type={"manager"}
      />
    </div>
  );
}
