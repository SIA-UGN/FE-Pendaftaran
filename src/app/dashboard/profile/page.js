"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import { useApplicantProfile, useApplicantPayment } from "@/hooks/useAdmin";
import {
  WalletMinimal,
  Mail,
  GraduationCap,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const BRAND = "#015023";
const BRAND_LIGHT = "#E6EEE9";
const BRAND_BORDER = "#D9E5DE";

function StatusCard({ icon: Icon, label, children }) {
  return (
    <Card className="py-0 gap-0">
      <CardContent className="p-5">
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: BRAND_LIGHT }}
          >
            <Icon className="w-4 h-4" style={{ color: BRAND }} />
          </div>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {label}
          </span>
        </div>
        <div className="pl-[42px]">{children}</div>
      </CardContent>
    </Card>
  );
}

function formatAmount(amount) {
  const num = parseFloat(amount);
  if (!amount || isNaN(num)) return null;
  return `Rp ${num.toLocaleString("id-ID")}`;
}

function getVerificationBadge(status) {
  switch (status) {
    case "approved": return <Badge variant="success"><CheckCircle />Disetujui</Badge>;
    case "rejected": return <Badge variant="destructive"><XCircle />Ditolak</Badge>;
    case "submitted": return <Badge variant="warning"><Clock />Menunggu Review</Badge>;
    default: return <Badge variant="secondary"><Clock />Draft</Badge>;
  }
}

function getGraduationBadge(status) {
  if (status === "Sudah Lulus") return <Badge variant="success"><CheckCircle />Sudah Lulus</Badge>;
  if (status === "Belum Lulus") return <Badge variant="destructive"><XCircle />Belum Lulus</Badge>;
  return <Badge variant="secondary">{status || "Belum Ada Status"}</Badge>;
}

function getPaymentBadge(status) {
  switch (status) {
    case "verified": return <Badge variant="success"><CheckCircle />Terverifikasi</Badge>;
    case "waiting_verification": return <Badge variant="warning"><Clock />Menunggu Verifikasi</Badge>;
    case "rejected": return <Badge variant="destructive"><XCircle />Ditolak</Badge>;
    case "pending": return <Badge variant="warning"><Clock />Pending</Badge>;
    default: return <Badge variant="secondary">Unknown</Badge>;
  }
}

export default function Profile() {
  return (
    <Suspense fallback={null}>
      <ProfileInner />
    </Suspense>
  );
}

function ProfileInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
  } = useApplicantPayment(id);

  if (profileLoading) {
    return (
      <div className="space-y-6">
        <Card className="py-0 gap-0">
          <CardContent className="p-5 sm:p-6">
            <div className="flex gap-4 items-center">
              <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
              <div className="w-px h-10 flex-shrink-0" style={{ backgroundColor: BRAND_LIGHT }} />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3.5 w-56" />
                <Skeleton className="h-3.5 w-36" />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="py-0 gap-0">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                  <Skeleton className="h-3.5 w-28" />
                </div>
                <Skeleton className="h-6 w-20 ml-[42px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <Card className="py-0 gap-0">
        <CardContent className="p-5">
          <p className="text-sm text-red-500">Error: {profileErrorMsg?.message}</p>
        </CardContent>
      </Card>
    );
  }

  const data = userData?.data?.data;
  const payment = paymentData?.data?.data;

  if (!data) {
    return (
      <Card className="py-0 gap-0">
        <CardContent className="p-5">
          <p className="text-sm text-gray-400">Tidak ada data tersedia.</p>
        </CardContent>
      </Card>
    );
  }

  const profile = data?.profile || {};
  const user = data?.user || {};
  const program = data?.program || {};

  const displayName = profile.full_name || user.name || "";
  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  const avatarSrc = user.avatar
    ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user.avatar}`
    : null;

  const formattedAmount = formatAmount(payment?.amount);

  return (
    <div className="space-y-6">
      {/* ── Back Button ──────────────────────────────────────── */}
      <Button
        variant="outline"
        className="rounded-xl"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      {/* ── Profile Card ─────────────────────────────────────── */}
      <Card className="py-0 gap-0">
        <CardContent className="p-5 sm:p-6">
          <div className="flex gap-4 items-center">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-bold text-lg select-none"
              style={{ backgroundColor: BRAND }}
            >
              {avatarSrc ? (
                <Image
                  alt="Foto Profil"
                  src={avatarSrc}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Divider */}
            <div
              className="h-10 w-px flex-shrink-0"
              style={{ backgroundColor: BRAND_BORDER }}
            />

            {/* Info */}
            <div className="min-w-0 flex-1">
              <h3
                className="font-semibold text-base sm:text-lg truncate"
                style={{ color: "#111827" }}
              >
                {displayName || "—"}
              </h3>
              <div className="mt-1 flex flex-col sm:flex-row sm:gap-4 gap-0.5">
                <span className="flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{user.email || "—"}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
                  <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">
                    {program.name_program || "Program tidak tersedia"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Status Section ───────────────────────────────────── */}
      <div>
        <Heading title="Status Pendaftaran" variant="first" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatusCard icon={ShieldCheck} label="Status Verifikasi">
            {getVerificationBadge(profile.registration_status)}
          </StatusCard>

          <StatusCard icon={GraduationCap} label="Status Kelulusan">
            {getGraduationBadge(profile.graduation_status)}
          </StatusCard>

          <StatusCard icon={WalletMinimal} label="Nominal Masuk">
            {paymentLoading ? (
              <Skeleton className="h-6 w-28" />
            ) : formattedAmount ? (
              <p className="text-base font-bold" style={{ color: BRAND }}>
                {formattedAmount}
              </p>
            ) : (
              <span className="text-sm text-gray-400">Belum ada pembayaran</span>
            )}
          </StatusCard>

          <StatusCard icon={CreditCard} label="Status Keuangan">
            {paymentLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : payment ? (
              getPaymentBadge(payment.status)
            ) : (
              <span className="text-sm text-gray-400">Belum ada pembayaran</span>
            )}
          </StatusCard>
        </div>
      </div>

      {/* ── Verifikasi Card ──────────────────────────────────── */}
      {payment && (
        <Card className="py-0 gap-0">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: BRAND }}>
                  Verifikasi Pembayaran
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {payment.status === "verified"
                    ? "Pembayaran sudah berhasil diverifikasi."
                    : "Tindak lanjuti verifikasi pembayaran pendaftar ini."}
                </p>
              </div>
              <Link href={`/dashboard/verifikasi?id=${payment.id}`} className="flex-shrink-0">
                <Button
                  className="rounded-xl text-white text-sm"
                  style={{ backgroundColor: BRAND }}
                >
                  <WalletMinimal className="w-4 h-4 mr-2" />
                  {payment.status === "verified" ? "Lihat Pembayaran" : "Verifikasi Pembayaran"}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
