import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { registrationService } from "@/services/registrationService";
import toast from "react-hot-toast";

export const useAchievements = () => {
  const queryClient = useQueryClient();

  // Get achievements
  const {
    data: achievements,
    isLoading,
    error,
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

  return {
    achievements,
    isLoading,
    error,
    addAchievement,
    deleteAchievement,
  };
};
