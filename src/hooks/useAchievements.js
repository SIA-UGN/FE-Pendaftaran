import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { registrationService } from "@/services/registrationService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useAchievements = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Get achievements
  const {
    data: achievements,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["achievements"],
    queryFn: registrationService.getAchievements,
  });

  // Add achievement
  const addAchievement = useMutation({
    mutationFn: registrationService.addAchievement,
    onSuccess: () => {
      toast.success("Prestasi berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      queryClient.invalidateQueries({ queryKey: ["registrationProgress"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal menambahkan prestasi"
      );
    },
  });

  // Delete achievement
  const deleteAchievement = useMutation({
    mutationFn: registrationService.deleteAchievement,
    onSuccess: () => {
      toast.success("Prestasi berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus prestasi");
    },
  });

  // Helper: Check if has achievements
  const achievementsList = achievements?.data?.data || [];
  const hasAchievements = achievementsList.length > 0;

  // Helper: Skip achievements and go to payment
  const skipAchievements = () => {
    router.push("/pendaftaran/pembayaran");
  };

  // Helper: Submit achievements (just navigate, no API call needed)
  const submitAchievements = () => {
    router.push("/pendaftaran/pembayaran");
  };

  return {
    achievements,
    hasAchievements,
    isLoading,
    isSubmitting: false,
    error,
    refetch,
    addAchievement: addAchievement.mutateAsync,
    deleteAchievement: deleteAchievement.mutateAsync,
    skipAchievements,
    submitAchievements,
  };
};
