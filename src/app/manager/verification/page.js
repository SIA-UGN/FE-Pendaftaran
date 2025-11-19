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
import { useApplicantDetail, useSetGraduationStatus } from "@/hooks/useManager";

import { useVerifyApplicant } from "@/hooks/useManager";

export default function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const user_id = searchParams.get("user_id");

  console.log(id);

  const [statusVerification, setStatusVerification] = useState("Pending");

  const { mutate: setRegistrationStatus, isLoading: isRegistrationLoading } =
    useVerifyApplicant();

  const handleRegistration = async (statusType, note) => {
    const payload = {
      id: Number(id),
      data: {
        status: statusType,
        ...(statusType === "rejected" && { notes: note }),
      },
    };

    console.log("Sending:", payload);

    await setRegistrationStatus(payload);
  };

  const {
    data: applicantData,
    isLoading: isApplicantLoading,
    isError: isApplicantError,
    error: applicantError,
  } = useApplicantDetail(id);

  const { mutate: setGraduationStatus, isLoading: isGraduationLoading } =
    useSetGraduationStatus();

  if (isApplicantLoading) return <div>Loading applicant...</div>;
  if (isApplicantError)
    return <div>Error loading applicant: {applicantError.message}</div>;

  console.log(applicantData);

  const applicant = applicantData?.data?.data;

  if (!applicant) {
    return <div>Applicant not found</div>;
  }

  const handleGraduation = (statusType) => {
    console.log(statusType);
    console.log(applicant.user.status);
    setGraduationStatus({
      id: Number(id),
      data: {
        graduation_status: statusType,
      },
    });
    console.log("Sending:", {
      id: Number(id),
      data: { graduation_status: statusType },
    });
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3 mx-auto">
      {/* Akun Pendaftar */}
      <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
        Akun Pendaftar
      </h2>

      <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-white">
        <Image
          alt="Profile banner Faradis Yulianto"
          src="/logo.jpg"
          width={180}
          height={300}
          className="w-full sm:w-1/4 h-[300px] rounded-xl object-cover"
        />
        <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
          <h2 className="font-bold text-xl">{applicant.user.name}</h2>
          <h3 className="text-gray-500">
            {applicant.user.registration_number}
          </h3>
          <p className="text-gray-500">{applicant.user.email}</p>
          <p className="text-gray-500 text-sm">
            {applicant.verification_status} | {applicant.graduation_status}
          </p>
        </div>
      </Card>

      {/* Status Verifikasi Pendaftar */}
      {(applicant.verification_status === "pending" ||
        applicant.verification_status === "revision_needed" ||
        applicant.verification_status === "under_review" ||
        applicant.verification_status === "submitted") && (
        <>
          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Status Verifikasi Pendaftar
          </h2>
          <div className="w-full">
            <Button variant={"green"} className={"w-full "} disabled>
              Pending
            </Button>
          </div>
          <div className="w-full flex justify-end">
            <Link href={`/manager/verification/data-diri?id=${id}`}>
              <Button variant={"green"} className={"w-sm"}>
                Verifikasi Data
              </Button>
            </Link>
          </div>
          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Status Kelulusan Pendaftar
          </h2>
          <p>
            Akun pendaftar wajib berada dalam status accepted untuk menentukan
            kelulusan. Silahkan verifikasi data pendaftar terlebih dahulu.
          </p>
        </>
      )}

      {applicant.verification_status === "rejected" && (
        <>
          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Status Verifikasi Pendaftar
          </h2>
          <div className="w-full">
            <Button variant={"green"} className={"w-full "} disabled>
              Rejected
            </Button>
          </div>
          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Status Kelulusan Pendaftar
          </h2>
          <p className="text-center">
            Akun pendaftar wajib berada dalam status accepted untuk menentukan
            kelulusan. Silahkan verifikasi ulang data pendaftar yang sudah
            diperbaiki.
          </p>
        </>
      )}

      {applicant.verification_status === "approved" && (
        <>
          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Status Verifikasi Pendaftar
          </h2>
          <div className="w-full">
            <Button variant={"green"} className={"w-full "} disabled>
              Accepted
            </Button>
          </div>
          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Status Kelulusan Pendaftar
          </h2>
          <p>Silahkan tentukan apakah pendaftar lulus atau tidak</p>
          <div className="w-lg flex flex-col gap-2">
            <Link href={`/manager/verification/data-diri?id=${id}`}>
              <Button variant={"green"} className={"w-full "}>
                Lihat Data
              </Button>
            </Link>
            <Button
              variant={"green"}
              className={"w-full "}
              onClick={() => handleGraduation("graduated")}
              disabled={isGraduationLoading}
            >
              Lulus
            </Button>
            <Button
              variant={"green"}
              className={"w-full "}
              onClick={() => handleGraduation("not_graduated")}
              disabled={isGraduationLoading}
            >
              Tidak Lulus
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
