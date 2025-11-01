import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profileService";
import toast from "react-hot-toast";

export const userProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => profileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to update profile";
      toast.error(message);
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => profileService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      toast.success("Avatar uploaded successfully");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to upload avatar";
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
      toast.success("Avatar deleted successfully");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to delete avatar";
      toast.error(message);
    },
  });
};
