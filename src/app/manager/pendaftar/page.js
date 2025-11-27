"use client";

import ApplicantInformation from "@/components/dashboard/ApplicantInformation";
import { useManagerApplicants } from "@/hooks/useManager";

export default function Pendaftar() {
  const { data, isLoading, isError, error } = useManagerApplicants();

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Error fetching applicant statistics:{" "}
        {error.response?.data?.message || error.message}
      </div>
    );

  console.log(data);

  const Approved = data.data.data.verification_summary.approved;
  const Pending = data.data.data.verification_summary.pending;
  const Rejected = data.data.data.verification_summary.rejected;

  const Lulus = data.data.data.graduation_summary.lulus;
  const TidakLulus = data.data.data.graduation_summary.tidak_lulus;

  const VerificationTable = data.data.data.verification_table;
  const GraduationTable = data.data.data.graduation_table;
  console.log(data.data.data.verification_summary);
  console.log(data.data.data.verification_table);

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
