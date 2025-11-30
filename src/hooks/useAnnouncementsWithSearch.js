import { useQuery } from "@tanstack/react-query";
import { announcementService } from "@/services/announcementService";

export const useAnnouncementsWithSearch = (search) => {
  return useQuery({
    queryKey: ["announcements", "all", { search }],
    queryFn: () => announcementService.getAll({ search }),
    keepPreviousData: true,
  });
};