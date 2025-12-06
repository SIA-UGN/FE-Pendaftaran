"use client";

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
import toast from "react-hot-toast";

export default function PendaftaranPage() {
  const router = useRouter();
  const { data: progressData, isLoading, isError } = useRegistrationProgress();
  const { data: paymentData, isLoading: paymentLoading } = useMyPayment();

  const stepRoutes = {
    1: "/pendaftaran/data-diri",
    2: "/pendaftaran/data-alamat",
    3: "/pendaftaran/data-orangtua",
    4: "/pendaftaran/data-akademik",
    5: "/pendaftaran/data-prestasi",
  };

  const getNextIncompleteStep = () => {
    if (isError || !progressData?.data) {
      return "/pendaftaran/data-diri";
    }

    const { completed_steps = [], accessible_steps = [] } = progressData.data;

    if (paymentData?.data?.data?.payment) {
      const paymentStatus = paymentData.data.data.payment.status;

      if (paymentStatus !== "pending") {
        return "/pendaftaran/status";
      }

      if (completed_steps.length === 5) {
        return "/pendaftaran/pembayaran";
      }
    }

    for (let step = 1; step <= 5; step++) {
      if (!completed_steps.includes(step) && accessible_steps.includes(step)) {
        return stepRoutes[step];
      }
    }

    if (completed_steps.length === 5) {
      return "/pendaftaran/pembayaran";
    }

    return "/pendaftaran/data-diri";
  };

  const handleContinue = () => {
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
        <div className="ms-auto me-6 w-1/2 md:w-2/12">
          <Button
            type="button"
            variant="green"
            className={"w-full"}
            onClick={handleContinue}
          >
            Lanjut
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
