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
    mutationFn: (data) => announcementService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement created successfully");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to create announcement";
      toast.error(message);
    },
  });
};
