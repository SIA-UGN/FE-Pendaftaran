import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useStoreAchievements, useMyRegistration } from "./useRegistration";

export const useAchievements = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: registrationData, refetch, isLoading } = useMyRegistration();
  const storeMutation = useStoreAchievements();

  const achievements = registrationData?.data?.registration?.achievements || [];
  const hasAchievements = achievements.length > 0;

  const skipAchievements = async () => {
    const payload = {
      skip_achievements: true,
    };

    return new Promise((resolve, reject) => {
      storeMutation.mutate(payload, {
        onSuccess: async () => {
          toast.success("Berhasil! Melanjutkan ke tahap pembayaran");

          await queryClient.invalidateQueries({ queryKey: ["registration"] });

          setTimeout(() => {
            router.push("/pendaftaran/pembayaran");
            resolve();
          }, 500);
        },
        onError: (error) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Gagal melanjutkan";
          toast.error(`Gagal melanjutkan: ${message}`);
          reject(error);
        },
      });
    });
  };

  const submitAchievements = async () => {
    if (!hasAchievements) {
      toast.error(
        "Silakan tambah prestasi terlebih dahulu atau lewati tahap ini"
      );
      return Promise.reject(new Error("No achievements"));
    }

    const payload = {
      achievements: achievements.map((item) => ({
        achievement_name: item.achievement_name,
        year: item.year,
        type: item.type,
        level: item.level,
        organizer: item.organizer,
        rank: item.rank,
        certificate_file: item.certificate_file || null,
      })),
      skip_achievements: false,
    };

    return new Promise((resolve, reject) => {
      storeMutation.mutate(payload, {
        onSuccess: async () => {
          toast.success("Data prestasi berhasil disimpan!");

          await queryClient.invalidateQueries({ queryKey: ["registration"] });

          setTimeout(() => {
            router.push("/pendaftaran/pembayaran");
            resolve();
          }, 100);
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || error.message || "Gagal menyimpan";
          toast.error(`Gagal menyimpan: ${message}`);
          reject(error);
        },
      });
    });
  };

  const addAchievement = async (newAchievement) => {
    const allAchievements = [
      ...achievements.map((item) => ({
        achievement_name: item.achievement_name,
        year: item.year,
        type: item.type,
        level: item.level,
        organizer: item.organizer,
        rank: item.rank,
        certificate_file: item.certificate_file || null,
      })),
      newAchievement,
    ];

    const payload = {
      achievements: allAchievements,
      skip_achievements: false,
    };

    return new Promise((resolve, reject) => {
      storeMutation.mutate(payload, {
        onSuccess: async () => {
          toast.success("Prestasi berhasil ditambahkan!");

          await queryClient.invalidateQueries({
            queryKey: ["registration"],
            refetchType: "active",
          });

          await new Promise((r) => setTimeout(r, 300));

          resolve();
        },
        onError: (error) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Gagal menyimpan prestasi";
          toast.error(`Gagal menyimpan prestasi: ${message}`);
          reject(error);
        },
      });
    });
  };

  return {
    achievements,
    hasAchievements,
    registrationData,
    isLoading,

    skipAchievements,
    submitAchievements,
    addAchievement,
    refetch,

    isSubmitting: storeMutation.isPending,
  };
};
