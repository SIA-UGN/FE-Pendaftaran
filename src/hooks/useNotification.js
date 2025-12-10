import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notificationService";
import toast from "react-hot-toast";

export const useNotifications = (params = {}) => {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => notificationService.getAll(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useUnreadCount = (enabled = true) => {
  return useQuery({
    queryKey: ["unreadCount"],
    queryFn: notificationService.getUnreadCount,
    refetchInterval: 30000,
    enabled: enabled,
    retry: 2,
    retryDelay: 1000,
    staleTime: 25000,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menandai notifikasi");
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      toast.success("Semua notifikasi ditandai sudah dibaca");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal menandai semua notifikasi"
      );
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.delete,
    onSuccess: () => {
      toast.success("Notifikasi berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal menghapus notifikasi"
      );
    },
  });
};
