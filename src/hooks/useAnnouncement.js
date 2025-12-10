import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementService } from "@/services/announcementService";
import toast from "react-hot-toast";

export const useAnnouncements = (params = {}) => {
  return useQuery({
    queryKey: ["announcements", params],
    queryFn: () => announcementService.getAll(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: announcementService.create,
    onSuccess: () => {
      toast.success("Pengumuman berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal membuat pengumuman");
    },
  });
};
