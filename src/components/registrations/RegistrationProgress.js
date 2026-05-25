"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Lock } from "lucide-react";
import { useRegistrationProgress } from "@/hooks/useRegistration";
import { useMyPayment } from "@/hooks/usePayment";
import { useVisibleSections } from "@/hooks/useFormVisibility";

// Master definition semua langkah di FE, dengan mapping ke API code
// Didefinisikan di luar komponen karena bersifat statis (tidak bergantung pada state/props)
const ALL_STEPS = [
  {
    href: "/pendaftaran/data-diri",
    label: "Data Diri",
    key: "data-diri",
    code: "profile", // memetakan ke database code
    step_number: 1,
  },
  {
    href: "/pendaftaran/data-alamat",
    label: "Data Alamat",
    key: "data-alamat",
    code: "profile",
    step_number: 2,
  },
  {
    href: "/pendaftaran/data-orangtua",
    label: "Data Orang Tua",
    key: "data-orangtua",
    code: "guardians",
    step_number: 3,
  },
  {
    href: "/pendaftaran/data-akademik",
    label: "Dokumen",
    key: "data-akademik",
    code: "documents",
    step_number: 4,
  },
  {
    href: "/pendaftaran/data-prestasi",
    label: "Data Prestasi",
    key: "data-prestasi",
    code: "achievements",
    step_number: 5,
  },
  {
    href: "/pendaftaran/pembayaran",
    label: "Pembayaran",
    key: "pembayaran",
    code: null, // selalu aktif — pembayaran global
    step_number: 6,
  },
];

export default function RegistrationProgress() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState("");

  const { data: progressData, isLoading, isError } = useRegistrationProgress();
  const { data: paymentData, isLoading: paymentLoading } = useMyPayment();

  // Fetch section aktif dari backend (Form Visibility API)
  const { data: activeSections = [], isLoading: sectionsLoading } =
    useVisibleSections();

  useEffect(() => {
    const path = pathname.split("/").pop() || "";
    setActiveStep(path);
  }, [pathname]);

  // Filter langkah secara dinamis berdasarkan Form Visibility API
  // Jika API belum dimuat atau error, fallback tampilkan semua step (graceful degradation)
  const steps = useMemo(() => {
    if (sectionsLoading || activeSections.length === 0) {
      return ALL_STEPS;
    }

    return ALL_STEPS.filter((step) => {
      if (step.code === null) return true; // selalu tampilkan (e.g. pembayaran)
      return activeSections.some((sec) => sec.code === step.code);
    });
  }, [activeSections, sectionsLoading]);

  const activeIndex = steps.findIndex((s) => s.key === activeStep);

  const getStepStatus = (stepNumber) => {
    if (!progressData?.data) return "locked";

    const { completed_steps = [], accessible_steps = [] } = progressData.data;

    if (stepNumber === 6) {
      if (paymentLoading) return "locked";

      if (
        paymentData?.data?.data?.payment?.status === "verified" ||
        paymentData?.data?.data?.payment?.status === "waiting_verification"
      ) {
        return "completed";
      }

      if (
        paymentData?.data?.data?.payment?.status === "pending" &&
        completed_steps.length === 5
      ) {
        return "accessible";
      }

      if (completed_steps.length === 5 && !paymentData?.data?.data?.payment)
        return "accessible";

      return "locked";
    }

    const numberOfCompletedSteps = completed_steps.length;

    if (numberOfCompletedSteps === 5 && stepNumber < 6) {
      if (completed_steps.includes(stepNumber)) {
        let allExpectedStepsCompleted = true;
        for (let i = 1; i <= stepNumber; i++) {
          if (!completed_steps.includes(i)) {
            allExpectedStepsCompleted = false;
            break;
          }
        }

        if (allExpectedStepsCompleted) {
          return "completed";
        } else {
          return "locked";
        }
      }
    }

    const isStepCompleted = completed_steps.includes(stepNumber);

    if (isStepCompleted) {
      let allPriorStepsCompleted = true;
      for (let i = 1; i < stepNumber; i++) {
        if (!completed_steps.includes(i)) {
          allPriorStepsCompleted = false;
          break;
        }
      }

      if (allPriorStepsCompleted) {
        return "completed";
      } else {
        return "locked";
      }
    }

    if (stepNumber === 1) {
      return accessible_steps.includes(1) ? "accessible" : "locked";
    } else {
      const previousStep = stepNumber - 1;

      if (
        completed_steps.includes(previousStep) &&
        accessible_steps.includes(stepNumber)
      ) {
        return "accessible";
      }
      return "locked";
    }
  };

  const getStepStyles = (stepNumber) => {
    const status = getStepStatus(stepNumber);

    switch (status) {
      case "completed":
        return {
          border: "border-[#015023] bg-[#E6EEE9]",
          text: "text-[#015023]",
          icon: <CheckCircle className="bg-white" style={{ color: '#015023' }} />,
          clickable: true,
        };
      case "accessible":
        return {
          border: "border-red-400 bg-red-50",
          text: "text-red-500",
          icon: <CheckCircle className="text-red-500 bg-white" />,
          clickable: true,
        };
      case "locked":
        return {
          border: "border-[#DABC4E] bg-yellow-50",
          text: "text-[#8a7a30]",
          icon: <Lock className="bg-white" style={{ color: '#DABC4E' }} />,
          clickable: false,
        };
      default:
        return {
          border: "border-gray-300 bg-gray-50",
          text: "text-gray-500",
          icon: <CheckCircle className="text-gray-500 bg-white" />,
          clickable: false,
        };
    }
  };

  const handleStepClick = (e, step) => {
    const styles = getStepStyles(step.step_number);
    if (!styles.clickable) {
      e.preventDefault();
      return;
    }
  };

  const progressPercent = progressData?.data?.completed_steps
    ? (() => {
        let completedCount = progressData.data.completed_steps.length;

        if (
          paymentData?.data?.data?.payment?.status === "verified" ||
          paymentData?.data?.data?.payment?.status === "waiting_verification"
        ) {
          completedCount += 1;
        }

        const totalSteps = steps.length + 1;
        return Math.min((completedCount / totalSteps) * 120, 87);
      })()
    : 0;

  if (isLoading || paymentLoading || sectionsLoading) {
    return (
      <div className="sm:w-full w-0 h-0 sm:h-full max-w-11/12 p-0 sm:p-4 flex flex-col items-center gap-12 m-0 sm:mx-auto sm:my-12 sm:mb-6">
        <div className="flex items-center justify-center">
          <span className="text-gray-500">Memuat progress...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:w-full w-0 h-0 sm:h-full max-w-11/12 p-0 sm:p-4 flex flex-col items-center gap-12 m-0 sm:mx-auto sm:my-12 sm:mb-6">
      <div className="flex flex-col gap-5 w-full items-center justify-center">
        <div className="flex gap-5 w-full flex-col-reverse">
          <div
            className="w-full relative hidden sm:grid gap-12 rounded-full"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            <div className="absolute top-1/2 left-[7%] right-[7%] transform -translate-y-1/2 h-[4px] bg-gray-200 rounded-full z-0"></div>

            <div
              className="absolute top-1/2 left-[7%] transform -translate-y-1/2 h-[4px] rounded-full z-0 transition-all duration-500"
              style={{ width: `${progressPercent}%`, backgroundColor: '#015023' }}
            ></div>

            {steps.map((step) => {
              const styles = getStepStyles(step.step_number);
              return (
                <div
                  key={step.key}
                  className="h-8 flex justify-center items-center w-full z-10"
                >
                  {styles.icon}
                </div>
              );
            })}
          </div>

          <div
            className="w-full none hidden md:grid gap-6 items-center"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            {steps.map((step) => {
              const styles = getStepStyles(step.step_number);

              const content = (
                <div
                  className={`h-12 min-h-fit border rounded-lg p-4 flex items-center justify-center transition-all duration-300 ${
                    styles.border
                  } ${
                    !styles.clickable
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer hover:shadow-md"
                  }`}
                >
                  <span className={styles.text}>{step.label}</span>
                </div>
              );

              return styles.clickable ? (
                <Link
                  key={step.key}
                  href={step.href}
                  onClick={(e) => handleStepClick(e, step)}
                >
                  {content}
                </Link>
              ) : (
                <div key={step.key} onClick={(e) => handleStepClick(e, step)}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
