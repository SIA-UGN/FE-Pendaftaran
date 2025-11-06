import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profileService";
import toast from "react-hot-toast";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      toast.success("Profil berhasil diperbarui");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal memperbarui profil";
      toast.error(message);
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      toast.success("Avatar berhasil diupload");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal mengupload avatar";
      toast.error(message);
    },
  });
};

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.deleteAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      toast.success("Avatar berhasil dihapus");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal menghapus avatar";
      toast.error(message);
    },
  });
};
