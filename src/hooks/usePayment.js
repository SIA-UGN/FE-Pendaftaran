import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services/paymentService";
import toast from "react-hot-toast";

export const useMyPayment = () => {
  return useQuery({
    queryKey: ["payment", "my"],
    queryFn: paymentService.getMyPayment,
    refetchInterval: (data) => {
      if (
        data?.data?.payment?.status === "pending" ||
        data?.data?.payment?.status === "waiting_verification"
      ) {
        return 30000; // 30 seconds
      }
      return false;
    },
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentService.createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries(["payment", "my"]);
      toast.success("Pembayaran berhasil dibuat, silakan lanjutkan pembayaran");
    },
  });
};

export const useUploadPaymentProof = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paymentId, formData }) =>
      paymentService.uploadProof(paymentId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment", "my"] });
      toast.success("Bukti pembayaran berhasil diupload. Menunggu verifikasi");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal mengupload bukti pembayaran";
      toast.error(message);
    },
  });
};

// admin
export const usePayments = (params) => {
  return useQuery({
    queryKey: ["payments", "all", params],
    queryFn: () => paymentService.getAllPayments(params),
    keepPreviousData: true,
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => paymentService.verifyPayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Pembayaran berhasil diverifikasi");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal memverifikasi pembayaran";
      toast.error(message);
    },
  });
};
