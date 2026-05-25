"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import InformasiPendaftaran from "@/components/registrations/InformasiPendaftaran";
import InformasiProfil from "@/components/InformasiProfil";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import UrutanTahapan from "@/components/registrations/UrutanTahapan";
import Ketentuan from "@/components/registrations/Ketentuan";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRegistrationProgress } from "@/hooks/useRegistration";
import { useMyPayment } from "@/hooks/usePayment";
import { useVisibleSections } from "@/hooks/useFormVisibility";
import toast from "react-hot-toast";

export default function PendaftaranPage() {
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const {
    data: progressData,
    isLoading,
    isError,
  } = useRegistrationProgress(isReady);

  const {
    data: paymentData,
    isLoading: paymentLoading,
    isError: paymentError,
  } = useMyPayment(isReady);

  // Fetch section aktif dari backend (Form Visibility API)
  const { data: activeSections = [], isLoading: sectionsLoading } =
    useVisibleSections();

  /**
   * Mapping section code (API) → step number & route.
   * Profile mencakup step 1 (data-diri) & step 2 (data-alamat).
   */
  const sectionSteps = [
    { code: "profile", step: 1, route: "/pendaftaran/data-diri" },
    { code: "profile", step: 2, route: "/pendaftaran/data-alamat" },
    { code: "guardians", step: 3, route: "/pendaftaran/data-orangtua" },
    { code: "documents", step: 4, route: "/pendaftaran/data-akademik" },
    { code: "achievements", step: 5, route: "/pendaftaran/data-prestasi" },
  ];

  /**
   * Cek apakah suatu section code aktif di backend.
   * Jika API belum dimuat / kosong → anggap aktif (graceful degradation).
   */
  const isSectionActive = (code) => {
    if (sectionsLoading || activeSections.length === 0) return true;
    return activeSections.some((s) => s.code === code);
  };

  const getNextIncompleteStep = () => {
    if (isError || !progressData?.data) {
      return "/pendaftaran/data-diri";
    }

    const { completed_steps = [], accessible_steps = [] } = progressData.data;

    // Cek pembayaran terlebih dahulu
    if (paymentData?.data?.data?.payment) {
      const paymentStatus = paymentData.data.data.payment.status;

      if (paymentStatus !== "pending") {
        return "/pendaftaran/status";
      }

      // Hitung jumlah step yang harus diselesaikan (hanya section aktif)
      const activeStepCount = sectionSteps.filter((s) =>
        isSectionActive(s.code)
      ).length;

      if (completed_steps.length >= activeStepCount) {
        return "/pendaftaran/pembayaran";
      }
    }

    // Iterasi hanya section yang aktif, cari step belum selesai
    for (const { code, step, route } of sectionSteps) {
      if (!isSectionActive(code)) continue; // Skip section non-aktif
      if (!completed_steps.includes(step) && accessible_steps.includes(step)) {
        return route;
      }
    }

    // Semua step aktif sudah selesai → ke pembayaran
    const activeStepCount = sectionSteps.filter((s) =>
      isSectionActive(s.code)
    ).length;
    if (completed_steps.length >= activeStepCount) {
      return "/pendaftaran/pembayaran";
    }

    return "/pendaftaran/data-diri";
  };

  const handleContinue = () => {
    if (sectionsLoading) return; // Tunggu data visibility dimuat
    const nextRoute = getNextIncompleteStep();
    router.push(nextRoute);
  };

  return (
    <ProtectedRoute>
      <div className="py-12 flex items-center w-screen justify-center flex-col gap-5 max-w-10/12 mx-auto">
        <InformasiPendaftaran />
        <RegistrationProgress />
        <UrutanTahapan />
        <Ketentuan />
        <div className="w-full max-w-4xl px-6">
          <Button
            type="button"
            variant="primary"
            className="w-full"
            onClick={handleContinue}
          >
            Lanjut
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
