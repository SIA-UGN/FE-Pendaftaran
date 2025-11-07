import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementService } from "@/services/announcementService";
import toast from "react-hot-toast";

export const useAnnouncements = (params) => {
  return useQuery({
    queryKey: ["announcements", "all", params],
    queryFn: () => announcementService.getAll(params),
    keepPreviousData: true,
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: announcementService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Pengumuman berhasil dibuat");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal membuat pengumuman";
      toast.error(message);
    },
  });
};
