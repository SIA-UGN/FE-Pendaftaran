"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";

import {
  useManagerApplicantDetail,
  useManagerSetGraduationStatus,
  useVerifyApplicant,
} from "@/hooks/useManager";

const statusColors = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-gray-200 text-gray-700",
  submitted: "bg-blue-100 text-blue-700",
  under_review: "bg-blue-200 text-blue-700",
  revision_needed: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",

  graduated: "bg-green-100 text-green-700",
  not_graduated: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  const cls = statusColors[status] || "bg-gray-300 text-gray-700";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${cls}`}
    >
      {status?.replace("_", " ")}
    </span>
  );
};

export default function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [statusVerification, setStatusVerification] = useState("Pending");

  const { mutate: setRegistrationStatus } = useVerifyApplicant();
  const { mutate: setGraduationStatus, isLoading: isGraduationLoading } =
    useManagerSetGraduationStatus();

  const {
    data: applicantData,
    isLoading: isApplicantLoading,
    isError: isApplicantError,
    error: applicantError,
  } = useManagerApplicantDetail(id);

  if (isApplicantLoading) return <div>Loading applicant...</div>;
  if (isApplicantError)
    return <div>Error loading applicant: {applicantError.message}</div>;

  const applicant = applicantData?.data?.data;

  if (!applicant) return <div>Applicant not found</div>;

  const handleGraduation = (statusType) => {
    setGraduationStatus({
      id: Number(id),
      data: { graduation_status: statusType },
    });
  };

  const user = applicant.user || {};

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3 mx-auto">
      <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
        Akun Pendaftar
      </h2>

      <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-white">
        <img
          alt="Profile banner"
          src={
            applicant.user.avatar_url ? applicant.user.avatar_url : "/logo.jpg"
          }
          className="w-full sm:w-1/4 h-[300px] rounded-xl object-cover"
        />

        <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-2 items-start">
          <h2 className="font-bold text-xl">{applicant.user.name}</h2>
          <h3 className="text-gray-500">
            {user.username || "Username tidak tersedia"}
          </h3>
          <p className="text-gray-500">{applicant.user.email}</p>
          <p className="text-gray-500">{applicant.program.name_program}</p>
        </div>
      </Card>

      {(applicant.profile.registration_status === "pending" ||
        applicant.profile.registration_status === "revision_needed" ||
        applicant.profile.registration_status === "under_review" ||
        applicant.profile.registration_status === "submitted") && (
        <>
          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Status Verifikasi Pendaftar
          </h2>

          <div className="w-full">
            <Button variant="green" className="w-full" disabled>
              Pending
            </Button>
          </div>

          <div className="w-full flex justify-end">
            <Link href={`/manager/verification/data-diri?id=${id}`}>
              <Button variant="green">Verifikasi Data</Button>
            </Link>
          </div>

          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Status Kelulusan Pendaftar
          </h2>

          <p>
            Akun pendaftar wajib berada dalam status accepted untuk menentukan
            kelulusan.
          </p>
        </>
      )}

      {applicant.profile.registration_status === "rejected" && (
        <>
          <h2 className="text-xl font-semibold mt-6">Status Verifikasi</h2>
          <Button
            className="w-full bg-red-500 hover:bg-red-500 rounded-4xl"
            disabled
          >
            Rejected
          </Button>

          <h2 className="text-xl font-semibold mt-6">Status Kelulusan</h2>
          <p className="text-center">
            Akun harus accepted untuk menentukan kelulusan.
          </p>
        </>
      )}

      {applicant.profile.registration_status === "approved" && (
        <>
          <h2 className="text-xl font-semibold mt-6">Status Verifikasi</h2>
          <Button variant="green" className="w-full" disabled>
            Accepted
          </Button>
          {(() => {
            if (applicant.graduation_status === "Sudah Lulus") {
              return <div>Pendaftar dinyatakan Lulus</div>;
            }

            if (applicant.graduation_status === "Belum Lulus") {
              return <div>Pendaftar dinyatakan Tidak Lulus</div>;
            }

            return (
              <>
                <p>Silahkan tentukan apakah pendaftar lulus atau tidak</p>

                <div className="w-lg flex flex-col gap-2">
                  <Link href={`/manager/verification/data-diri?id=${id}`}>
                    <Button variant="green" className="w-full">
                      Lihat Data
                    </Button>
                  </Link>

                  <Button
                    className="w-full bg-green-500 hover:bg-green-500 rounded-4xl"
                    onClick={() => handleGraduation("Sudah Lulus")}
                    disabled={isGraduationLoading}
                  >
                    Lulus
                  </Button>

                  <Button
                    className="w-full bg-red-500 hover:bg-red-500 rounded-4xl"
                    onClick={() => handleGraduation("Belum Lulus")}
                    disabled={isGraduationLoading}
                  >
                    Tidak Lulus
                  </Button>
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}
