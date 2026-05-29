"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/Heading";
import Link from "next/link";
import {
  useManagerApplicantDetail,
  useManagerSetGraduationStatus,
} from "@/hooks/useManager";
import {
  ArrowLeft,
  Mail,
  GraduationCap,
  User,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  FileText,
  AlertCircle,
} from "lucide-react";

const BRAND = "#015023";
const BRAND_LIGHT = "#E6EEE9";
const BRAND_BORDER = "#D9E5DE";

function getRegistrationBadge(status) {
  switch (status) {
    case "approved":
      return <Badge variant="success"><CheckCircle />Accepted</Badge>;
    case "rejected":
      return <Badge variant="destructive"><XCircle />Rejected</Badge>;
    case "submitted":
      return <Badge variant="warning"><Clock />Submitted</Badge>;
    case "under_review":
      return <Badge variant="warning"><Clock />Under Review</Badge>;
    case "revision_needed":
      return <Badge variant="warning"><AlertCircle />Revision Needed</Badge>;
    default:
      return <Badge variant="secondary"><Clock />Pending</Badge>;
  }
}

function getGraduationBadge(status) {
  if (status === "Sudah Lulus")
    return <Badge variant="success"><CheckCircle />Sudah Lulus</Badge>;
  if (status === "Belum Lulus")
    return <Badge variant="destructive"><XCircle />Belum Lulus</Badge>;
  return null;
}

export default function VerificationPage() {
  return (
    <Suspense fallback={null}>
      <VerificationInner />
    </Suspense>
  );
}

function VerificationInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const { mutate: setGraduationStatus, isLoading: isGraduationLoading } =
    useManagerSetGraduationStatus();

  const {
    data: applicantData,
    isLoading,
    isError,
    error,
  } = useManagerApplicantDetail(id);

  if (isLoading) {
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
        <Card className="py-0 gap-0">
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-24" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="py-0 gap-0">
        <CardContent className="p-5">
          <p className="text-sm text-red-500">Error: {error?.message}</p>
        </CardContent>
      </Card>
    );
  }

  const applicant = applicantData?.data?.data;
  if (!applicant) {
    return (
      <Card className="py-0 gap-0">
        <CardContent className="p-5">
          <p className="text-sm text-gray-400">Data pendaftar tidak ditemukan.</p>
        </CardContent>
      </Card>
    );
  }

  const user = applicant.user || {};
  const profile = applicant.profile || {};
  const program = applicant.program || {};

  const displayName = user.name || "";
  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  const avatarSrc = user.avatar_url || null;
  const regStatus = profile.registration_status;
  const gradStatus = applicant.graduation_status;

  const isPending =
    regStatus === "pending" ||
    regStatus === "submitted" ||
    regStatus === "under_review" ||
    regStatus === "revision_needed";

  const handleGraduation = (statusType) => {
    setGraduationStatus({
      id: Number(id),
      data: { graduation_status: statusType },
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="outline" className="rounded-xl" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      {/* Profile Card */}
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
            <div className="h-10 w-px flex-shrink-0" style={{ backgroundColor: BRAND_BORDER }} />

            {/* Info */}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base sm:text-lg truncate" style={{ color: "#111827" }}>
                {displayName || "—"}
              </h3>
              <div className="mt-1 flex flex-col sm:flex-row sm:gap-4 gap-0.5">
                {user.username && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 truncate">
                    <User className="w-3.5 h-3.5 flex-shrink-0" />
                    {user.username}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-xs text-gray-400 truncate">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  {user.email || "—"}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400 truncate">
                  <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                  {program.name_program || "Program tidak tersedia"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Section */}
      <div>
        <Heading title="Status Pendaftaran" variant="first" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Verification Status Card */}
          <Card className="py-0 gap-0">
            <CardContent className="p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: BRAND_LIGHT }}
                >
                  <ShieldCheck className="w-4 h-4" style={{ color: BRAND }} />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Status Verifikasi
                </span>
              </div>
              <div className="pl-[42px]">
                {getRegistrationBadge(regStatus)}
              </div>
            </CardContent>
          </Card>

          {/* Graduation Status Card */}
          <Card className="py-0 gap-0">
            <CardContent className="p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: BRAND_LIGHT }}
                >
                  <GraduationCap className="w-4 h-4" style={{ color: BRAND }} />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Status Kelulusan
                </span>
              </div>
              <div className="pl-[42px]">
                {getGraduationBadge(gradStatus) ?? (
                  <span className="text-sm text-gray-400">Belum ditentukan</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Section */}
      {isPending && (
        <Card className="py-0 gap-0">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: BRAND }}>
                  Verifikasi Dokumen
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Periksa dan verifikasi dokumen yang diunggah pendaftar.
                </p>
              </div>
              <Link href={`/manager/verification/data-diri?id=${id}`} className="flex-shrink-0">
                <Button className="rounded-xl text-white text-sm" style={{ backgroundColor: BRAND }}>
                  <FileText className="w-4 h-4 mr-2" />
                  Verifikasi Data
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {regStatus === "rejected" && (
        <Card className="py-0 gap-0">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "#fef2f2" }}
              >
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600">Pendaftaran Ditolak</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Akun pendaftar telah ditolak. Kelulusan tidak dapat ditentukan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {regStatus === "approved" && !gradStatus && (
        <Card className="py-0 gap-0">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: BRAND }}>
                Tentukan Kelulusan
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Pendaftar telah diterima. Silahkan tentukan status kelulusan.
              </p>
            </div>
            <Separator />
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/manager/verification/data-diri?id=${id}`} className="flex-1">
                <Button variant="outline" className="w-full rounded-xl">
                  <FileText className="w-4 h-4 mr-2" />
                  Lihat Data
                </Button>
              </Link>
              <Button
                className="flex-1 rounded-xl text-white"
                style={{ backgroundColor: BRAND }}
                onClick={() => handleGraduation("Sudah Lulus")}
                disabled={isGraduationLoading}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Lulus
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-xl"
                onClick={() => handleGraduation("Belum Lulus")}
                disabled={isGraduationLoading}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Tidak Lulus
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {regStatus === "approved" && gradStatus && (
        <Card className="py-0 gap-0">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: BRAND }}>
                  Keputusan Kelulusan
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Status kelulusan telah ditetapkan.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {getGraduationBadge(gradStatus)}
                <Link href={`/manager/verification/data-diri?id=${id}`}>
                  <Button variant="outline" className="rounded-xl text-sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Data
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
