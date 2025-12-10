import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentMethodService } from "@/services/paymentMethodService";
import toast from "react-hot-toast";

export const usePaymentMethods = (params = {}) => {
  return useQuery({
    queryKey: ["paymentMethods", params],
    queryFn: () => paymentMethodService.getAll(params),
    placeholderData: (previousData) => previousData,
  });
};

export const usePaymentMethod = (id) => {
  return useQuery({
    queryKey: ["paymentMethod", id],
    queryFn: () => paymentMethodService.getOne(id),
    enabled: !!id,
  });
};

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentMethodService.create,
    onSuccess: () => {
      toast.success("Metode pembayaran berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal menambahkan metode pembayaran"
      );
    },
  });
};

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => paymentMethodService.update(id, data),
    onSuccess: () => {
      toast.success("Metode pembayaran berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui metode pembayaran"
      );
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentMethodService.delete,
    onSuccess: () => {
      toast.success("Metode pembayaran berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal menghapus metode pembayaran"
      );
    },
  });
};
