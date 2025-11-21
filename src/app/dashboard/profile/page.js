"use client";

import { useSearchParams } from "next/navigation";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { useUserProfile } from "@/hooks/useAdmin";

export default function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: userData, isLoading, isError, error } = useUserProfile(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const data = userData?.data?.data;

  console.log(data)

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl my-6 sm:my-8 lg:my-12 w-full gap-3 mx-auto">
      {/* Akun Pendaftar */}
      <Heading title={"Akun Pendaftar"} variant="first" />

      <Card className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md bg-white">
        <Image
          alt="profile"
          src={data.user.avatar_url}
          width={180}
          height={300}
          className="w-full sm:w-1/3 lg:w-1/4 h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg sm:rounded-xl object-cover mx-auto sm:mx-0"
        />
        <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 sm:space-y-2 items-start">
          <h2 className="font-bold text-lg sm:text-xl lg:text-2xl">{data.user.name}</h2>
          <p className="text-gray-500 text-sm sm:text-base">{data.user.email}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{data.applicant.study_program}</p>
        </div>
      </Card>

      {/* Status Verifikasi Pendaftar */}
      <Heading title={"Status Verifikasi Pendaftar"} />
      <div className="w-full">
        <Button
          variant={data.applicant.verification_status === "Approved" ? `green` : `destructive`}
          className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
        >
          {data.applicant.verification_status}
        </Button>
      </div>

      {/* Status Kelulusan Pendaftar */}
      <Heading title={"Status Kelulusan Pendaftar"} />
      <div className="w-full">
        <Button
          variant={data.applicant.graduation_status === "Lulus" ? `green` : `destructive`}
          className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
        >
          {data.applicant.graduation_status}
        </Button>
      </div>

      {/* Nominal Masuk */}
      {/* <Heading title={"Nominal Masuk"} />
      <div className="w-full">
        <Button
          variant={
            data.applicant.payment.nominal === "Rp500.000,-" ? `green` : `destructive`
          }
          className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
        >
          {data.applicant.payment.nominal}
        </Button>
      </div> */}

      {/* Status Verifikasi Keuangan */}
      {/* <Heading title={"Status Verifikasi Keuangan"} />
      <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 justify-center">
        <Button variant="yellow" className="rounded-lg text-sm sm:text-base py-2 sm:py-3">
          {data.applicant.payment.status}
        </Button>
        <Link href={`/dashboard/verifikasi?id=${data.user.id}`} className="w-full">
          <Button variant="green" className="rounded-lg w-full text-sm sm:text-base py-2 sm:py-3">
            Verifikasi
          </Button>
        </Link>
      </div> */}
    </div>
  );
}