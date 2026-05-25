"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Prestasi from "@/components/prestasi/Prestasi";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import {
  useRegistrationProgress,
  useSubmitRegistration,
} from "@/hooks/useRegistration";
import { useVisibleSections } from "@/hooks/useFormVisibility";
import { useAchievements } from "@/hooks/useAchievements";
import { useRegistrationFlow } from "@/hooks/useRegistrationFlow";

export default function DataPrestasi() {
  const router = useRouter();
  const { prevRoute } = useRegistrationFlow();
  const { data: progressData, isLoading: progressLoading } =
    useRegistrationProgress();
  const {
    achievements,
    hasAchievements,
    skipAchievements,
    submitAchievements,
    refetch,
    isLoading: registrationLoading,
    isSubmitting,
  } = useAchievements();
  const submitRegistration = useSubmitRegistration();
  const progress = progressData?.data;
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Form Visibility — Route Guard
  const { data: activeSections = [], isLoading: sectionsLoading } =
    useVisibleSections();

  useEffect(() => {
    if (!sectionsLoading && activeSections.length > 0) {
      const isAchievementsActive = activeSections.some(
        (s) => s.code === "achievements"
      );
      if (!isAchievementsActive) {
        toast.error(
          "Form data prestasi sedang dinonaktifkan oleh administrator."
        );
        router.push("/pendaftaran");
      }
    }
  }, [activeSections, sectionsLoading, router]);
  useEffect(() => {
    if (!progressLoading && progress) {
      const accessibleSteps = progress.accessible_steps || [];
      if (!accessibleSteps.includes(5)) {
        toast.error("Silakan selesaikan tahapan sebelumnya terlebih dahulu");
        router.push("/pendaftaran");
      }
    }
  }, [progress, progressLoading, router]);
  if (progressLoading || registrationLoading) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto p-12">
          <div className="animate-pulse">Memuat data...</div>
        </div>
      </ProtectedRoute>
    );
  }
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto">
        <RegistrationProgress />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-4 sm:mt-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-semibold">Data Prestasi</h2>
          </div>
          <Link
            href="/pendaftaran/data-prestasi/input-data"
            className="w-full sm:w-auto"
          >
            <Button type="button" variant="yellow" className="w-full sm:w-auto">
              Tambah
            </Button>
          </Link>
        </div>
        <Prestasi Data={achievements?.data?.data} />
        <div className="flex flex-col mx-4 sm:mx-6 md:mx-8 lg:mx-12 my-6 gap-5 items-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-end ms-auto">
            <Link href={prevRoute}>
              <Button variant="matcha" className="w-full sm:w-auto">
                Kembali
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  Lewati
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Lewati Data Prestasi?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Anda akan melewati pengisian data prestasi. Data prestasi
                    dapat membantu meningkatkan peluang penerimaan Anda. Apakah
                    Anda yakin?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await skipAchievements();
                      await submitRegistration.mutateAsync();
                      router.push("/pendaftaran/status");
                    }}
                  >
                    Ya, Lewati
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="matcha"
              className="w-full sm:w-auto"
              onClick={async () => {
                await submitAchievements();
                await submitRegistration.mutateAsync();
                router.push("/pendaftaran/status");
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Selesai"}
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
