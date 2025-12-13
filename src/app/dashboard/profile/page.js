"use client";

import { useSearchParams } from "next/navigation";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { useApplicantProfile, useApplicantPayment } from "@/hooks/useAdmin";
import { FileCheck, WalletMinimal } from "lucide-react";

export default function Profile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: userData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileErrorMsg,
  } = useApplicantProfile(id);
  const {
    data: paymentData,
    isLoading: paymentLoading,
    isError: paymentError,
  } = useApplicantPayment(id);

  if (profileLoading) return <div>Loading...</div>;
  if (profileError) return <div>Error: {profileErrorMsg?.message}</div>;

  const data = userData?.data?.data;
  const payment = paymentData?.data?.data;

  console.log("Applicant Detail:", data);
  console.log("Payment Data:", payment);

  // Early return if no data
  if (!data) {
    return <div>No data available</div>;
  }

  // Extract data from response structure
  const profile = data?.profile || {};
  const user = data?.user || {};
  const program = data?.program || {};

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl my-6 sm:my-8 lg:my-12 w-full gap-3 mx-auto">
      <Heading title={"Akun Pendaftar"} variant="first" />

      <Card className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md bg-white">
        <Image
          alt="profile"
          src={
            user.avatar
              ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user.avatar}`
              : "/default-avatar.png"
          }
          width={180}
          height={300}
          className="w-full sm:w-1/3 lg:w-1/4 h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg sm:rounded-xl object-cover mx-auto sm:mx-0"
        />
        <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 sm:space-y-2 items-start">
          <h2 className="font-bold text-lg sm:text-xl lg:text-2xl">
            {profile.full_name || user.name}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {program.name_program || "Program tidak tersedia"}
          </p>
        </div>
      </Card>

      <Heading title={"Status Verifikasi Pendaftar"} />
      <div className="w-full">
        <Button
          variant={
            profile.registration_status === "approved"
              ? `succed`
              : `destructive`
          }
          className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
        >
          {profile.registration_status === "approved"
            ? "Disetujui"
            : profile.registration_status === "rejected"
            ? "Ditolak"
            : profile.registration_status === "submitted"
            ? "Menunggu Review"
            : "Draft"}
        </Button>
      </div>

      <Heading title={"Status Kelulusan Pendaftar"} />
      <div className="w-full">
        <Button
          variant={
            profile.graduation_status === "Sudah Lulus"
              ? `succed`
              : `destructive`
          }
          className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
        >
          {profile.graduation_status || "Belum Ada Status"}
        </Button>
      </div>

      <Heading title={"Nominal Masuk"} />
      <div className="w-full">
        {paymentLoading ? (
          <Button
            variant="outline"
            className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
            disabled
          >
            Loading payment...
          </Button>
        ) : paymentError || !payment ? (
          <Button
            variant="outline"
            className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
            disabled
          >
            Belum ada pembayaran
          </Button>
        ) : (
          <Button
            variant={payment.status === "verified" ? `succed` : `yellow`}
            className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
          >
            Rp {Number(payment.amount).toLocaleString("id-ID")}
          </Button>
        )}
      </div>

      <Heading title={"Verifikasi"} />
      <div className="w-full grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6">

        {/* Verifikasi Pembayaran */}
        {payment ? (
          <Link
            href={`/dashboard/verifikasi?id=${payment.id}`}
            className="w-full"
          >
            <Button
              variant={payment.status === "verified" ? "yellow" : "green"}
              className="rounded-lg w-full text-sm sm:text-base py-2 sm:py-3 flex items-center justify-center gap-2"
            >
              <WalletMinimal className="w-4 h-4" />
              {payment.status === "verified"
                ? "Lihat Pembayaran"
                : "Verifikasi Pembayaran"}
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            className="rounded-lg w-full text-sm sm:text-base py-2 sm:py-3 flex items-center justify-center gap-2"
            disabled
          >
            <WalletMinimal className="w-4 h-4" />
            Belum Ada Pembayaran
          </Button>
        )}
      </div>

      <Heading title={"Status Verifikasi Keuangan"} />
      <div className="w-full">
        <Button
          variant={payment?.status === "verified" ? "succed" : "yellow"}
          className="rounded-lg w-full text-sm sm:text-base py-2 sm:py-3"
          disabled={!payment}
        >
          {payment
            ? payment.status === "verified"
              ? "Terverifikasi"
              : payment.status === "waiting_verification"
              ? "Menunggu Verifikasi"
              : payment.status === "rejected"
              ? "Ditolak"
              : payment.status === "pending"
              ? "Pending"
              : "Unknown"
            : "Belum ada pembayaran"}
        </Button>
      </div>
    </div>
  );
}
