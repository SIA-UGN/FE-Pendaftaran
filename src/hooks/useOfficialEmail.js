import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { officialEmailService } from "@/services/officialEmailService";
import toast from "react-hot-toast";

export const useEmailFormatOptions = () => {
  return useQuery({
    queryKey: ["emailFormatOptions"],
    queryFn: officialEmailService.getFormatOptions,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useCreateOfficialEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: officialEmailService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailStatus"] });
      toast.success("Email resmi berhasil dibuat");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal membuat email resmi");
    },
  });
};

export const useEmailStatus = () => {
  return useQuery({
    queryKey: ["emailStatus"],
    queryFn: officialEmailService.getStatus,
  });
};
