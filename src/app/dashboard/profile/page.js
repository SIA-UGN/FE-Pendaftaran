"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useApplicantProfile, useApplicantPayment } from "@/hooks/useAdmin";
import { WalletMinimal, User, Mail, GraduationCap, CheckCircle, XCircle, Clock } from "lucide-react";

export default function Profile() {
  return (
    <Suspense fallback={null}>
      <ProfileInner />
    </Suspense>
  );
}

function ProfileInner() {
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

  if (profileLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border p-6 animate-pulse" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-44 h-52 bg-gray-200 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/5" />
            </div>
          </div>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl border p-6 animate-pulse" style={{ borderColor: '#E6EEE9' }}>
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-3" />
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (profileError) return (
    <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E6EEE9' }}>
      <p className="text-red-600">Error: {profileErrorMsg?.message}</p>
    </div>
  );

  const data = userData?.data?.data;
  const payment = paymentData?.data?.data;

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E6EEE9' }}>
        <p className="text-gray-500">Tidak ada data tersedia</p>
      </div>
    );
  }

  const profile = data?.profile || {};
  const user = data?.user || {};
  const program = data?.program || {};

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved": return { label: "Disetujui", bg: "#dcfce7", color: "#166534", icon: CheckCircle };
      case "rejected": return { label: "Ditolak", bg: "#fef2f2", color: "#991b1b", icon: XCircle };
      case "submitted": return { label: "Menunggu Review", bg: "#fef9c3", color: "#854d0e", icon: Clock };
      default: return { label: "Draft", bg: "#f3f4f6", color: "#374151", icon: Clock };
    }
  };

  const regStatus = getStatusConfig(profile.registration_status);
  const RegIcon = regStatus.icon;

  const getPaymentStatusLabel = (status) => {
    switch (status) {
      case "verified": return "Terverifikasi";
      case "waiting_verification": return "Menunggu Verifikasi";
      case "rejected": return "Ditolak";
      case "pending": return "Pending";
      default: return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <h2 className="text-lg font-semibold mb-6" style={{ color: '#015023' }}>Akun Pendaftar</h2>

        <div className="flex flex-col sm:flex-row gap-6">
          <Image
            alt="profile"
            src={
              user.avatar
                ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user.avatar}`
                : "/default-avatar.png"
            }
            width={180}
            height={220}
            className="w-full sm:w-44 h-52 rounded-xl object-cover mx-auto sm:mx-0"
          />
          <div className="flex flex-col justify-center space-y-3">
            <h3 className="text-xl font-bold text-gray-900">
              {profile.full_name || user.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>{program.name_program || "Program tidak tersedia"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Registration Status */}
        <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E6EEE9' }}>
          <p className="text-xs text-gray-400 mb-2">Status Verifikasi</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: regStatus.bg, color: regStatus.color }}>
            <RegIcon className="w-4 h-4" />
            {regStatus.label}
          </div>
        </div>

        {/* Graduation Status */}
        <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E6EEE9' }}>
          <p className="text-xs text-gray-400 mb-2">Status Kelulusan</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: profile.graduation_status === "Sudah Lulus" ? '#dcfce7' : '#f3f4f6',
              color: profile.graduation_status === "Sudah Lulus" ? '#166534' : '#374151'
            }}>
            {profile.graduation_status || "Belum Ada Status"}
          </div>
        </div>

        {/* Payment Amount */}
        <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E6EEE9' }}>
          <p className="text-xs text-gray-400 mb-2">Nominal Masuk</p>
          <p className="text-lg font-semibold text-gray-900">
            {paymentLoading ? "Loading..." : paymentError || !payment
              ? "Belum ada pembayaran"
              : `Rp ${Number(payment.amount).toLocaleString("id-ID")}`}
          </p>
        </div>

        {/* Payment Verification Status */}
        <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E6EEE9' }}>
          <p className="text-xs text-gray-400 mb-2">Status Keuangan</p>
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: payment?.status === "verified" ? '#dcfce7' : '#fef9c3',
              color: payment?.status === "verified" ? '#166534' : '#854d0e'
            }}>
            {payment ? getPaymentStatusLabel(payment.status) : "Belum ada pembayaran"}
          </div>
        </div>
      </div>

      {/* Verification Action */}
      {payment && (
        <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#E6EEE9' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#015023' }}>Verifikasi</h3>
          <Link href={`/dashboard/verifikasi?id=${payment.id}`}>
            <Button className="rounded-xl text-white" style={{ backgroundColor: '#015023' }}>
              <WalletMinimal className="w-4 h-4 mr-2" />
              {payment.status === "verified" ? "Lihat Pembayaran" : "Verifikasi Pembayaran"}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
