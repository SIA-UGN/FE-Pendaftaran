import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profileService";
import toast from "react-hot-toast";
import { useState } from "react";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    staleTime: 5 * 60 * 1000,
    enabled:
      typeof window !== "undefined" && !!localStorage.getItem("access_token"),
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: 1000,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: (response) => {
      const updatedUser = response.data.data?.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      window.dispatchEvent(
        new CustomEvent("userUpdated", { detail: updatedUser })
      );

      toast.success("Profil berhasil diperbarui");
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
    onSuccess: (response) => {
      const avatarUrl =
        response.data.avatar_url || response.data.data?.avatar_url;

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

      storedUser.avatar_url = avatarUrl;
      localStorage.setItem("user", JSON.stringify(storedUser));

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      window.dispatchEvent(
        new CustomEvent("userUpdated", { detail: storedUser })
      );

      setUploadProgress(100);
      toast.success("Avatar berhasil diupload");
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
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      storedUser.avatar_url = null;
      localStorage.setItem("user", JSON.stringify(storedUser));

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      window.dispatchEvent(
        new CustomEvent("userUpdated", { detail: storedUser })
      );

      toast.success("Avatar berhasil dihapus");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus avatar");
    },
  });
};
