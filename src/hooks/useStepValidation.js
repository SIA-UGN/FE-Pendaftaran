import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRegistrationProgress } from "./useRegistration";
import toast from "react-hot-toast";

export const useStepValidation = (currentStep) => {
  const router = useRouter();
  const { data: progressData, isPending } = useRegistrationProgress();

  useEffect(() => {
    if (!isPending && progressData) {
      const { completed_steps = [], accessible_steps = [] } =
        progressData.data || {};

      if (!accessible_steps.includes(currentStep)) {
        const nextAccessibleStep = Math.max(...completed_steps, 0) + 1;
        toast.error(
          `Silakan selesaikan Step ${nextAccessibleStep} terlebih dahulu`
        );

        const stepRoutes = {
          1: "/pendaftaran/data-diri",
          2: "/pendaftaran/data-alamat",
          3: "/pendaftaran/data-akademik",
          4: "/pendaftaran/data-orangtua",
          5: "/pendaftaran/data-prestasi",
        };

        router.push(stepRoutes[nextAccessibleStep] || "/pendaftaran/data-diri");
      }
    }
  }, [progressData, isPending, currentStep, router]);

  return {
    isValidating: isPending,
    progressData: progressData?.data,
  };
};
