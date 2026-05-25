"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { REGISTRATION_STEPS } from "@/config/registrationSteps";
import { useVisibleSections } from "@/hooks/useFormVisibility";

/**
 * useRegistrationFlow
 *
 * Hook yang menghitung prevRoute dan nextRoute secara dinamis,
 * berdasarkan section visibility dari backend.
 *
 * Ketika sebuah section dinonaktifkan, navigasi akan otomatis skip
 * ke step aktif berikutnya/sebelumnya.
 *
 * @returns {{
 *   prevRoute: string,
 *   nextRoute: string,
 *   activeSteps: Array,
 *   currentIndex: number,
 *   isFirst: boolean,
 *   isLast: boolean,
 *   isLoading: boolean,
 * }}
 */
export function useRegistrationFlow() {
  const pathname = usePathname();
  const { data: activeSections = [], isLoading: sectionsLoading } =
    useVisibleSections();

  // Filter step berdasarkan section visibility
  const activeSteps = useMemo(() => {
    return REGISTRATION_STEPS.filter((step) => {
      // Step tanpa code (pembayaran, status) selalu aktif
      if (step.code === null) return true;

      // Graceful fallback: kalau API belum loaded atau kosong,
      // tampilkan semua step (aman, user tidak kehilangan akses)
      if (sectionsLoading || activeSections.length === 0) return true;

      // Hanya include step yang section-nya aktif di backend
      return activeSections.some((s) => s.code === step.code);
    });
  }, [activeSections, sectionsLoading]);

  // Tentukan index current step dari pathname
  const currentKey = pathname.split("/").pop();
  const currentIndex = activeSteps.findIndex((s) => s.key === currentKey);

  // Hitung prevRoute — fallback ke /pendaftaran kalau sudah step pertama
  const prevRoute =
    currentIndex > 0
      ? activeSteps[currentIndex - 1].href
      : "/pendaftaran";

  // Hitung nextRoute — fallback ke pembayaran atau status
  const nextRoute =
    currentIndex >= 0 && currentIndex < activeSteps.length - 1
      ? activeSteps[currentIndex + 1].href
      : "/pendaftaran/pembayaran";

  return {
    prevRoute,
    nextRoute,
    activeSteps,
    currentIndex,
    isFirst: currentIndex <= 0,
    isLast: currentIndex >= activeSteps.length - 1,
    isLoading: sectionsLoading,
  };
}
