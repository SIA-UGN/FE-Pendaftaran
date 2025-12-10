import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profileService";
import toast from "react-hot-toast";
import { useState } from "react";

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
      toast.success("Profil berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui profil");
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  return useMutation({
    mutationFn: async (file) => {
      const response = await profileService.uploadAvatar(file);
      return response;
    },
    onMutate: () => {
      setUploadProgress(0);
    },
    onSuccess: () => {
      toast.success("Avatar berhasil diupload");
      setUploadProgress(100);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal upload avatar");
      setUploadProgress(0);
    },
    meta: {
      getProgress: () => uploadProgress,
    },
  });
};

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.deleteAvatar,
    onSuccess: () => {
      toast.success("Avatar berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus avatar");
    },
  });
};
