import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services/paymentService";
import toast from "react-hot-toast";
import { useState } from "react";

// Student hooks
export const useMyPayment = () => {
  return useQuery({
    queryKey: ["myPayment"],
    queryFn: paymentService.getMyPayment,
  });
};

export const useUploadPaymentProof = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  return useMutation({
    mutationFn: ({ paymentId, formData }) =>
      paymentService.uploadProof(paymentId, formData),
    onMutate: () => {
      setUploadProgress(0);
    },
    onSuccess: () => {
      toast.success("Bukti pembayaran berhasil diupload");
      setUploadProgress(100);
      queryClient.invalidateQueries({ queryKey: ["myPayment"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal upload bukti pembayaran"
      );
      setUploadProgress(0);
    },
    meta: {
      getProgress: () => uploadProgress,
    },
  });
};

export const useReUploadPaymentProof = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  return useMutation({
    mutationFn: ({ paymentId, formData }) =>
      paymentService.reUploadProof(paymentId, formData),
    onMutate: () => {
      setUploadProgress(0);
    },
    onSuccess: () => {
      toast.success("Bukti pembayaran berhasil diupload ulang");
      setUploadProgress(100);
      queryClient.invalidateQueries({ queryKey: ["myPayment"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal upload ulang bukti pembayaran"
      );
      setUploadProgress(0);
    },
    meta: {
      getProgress: () => uploadProgress,
    },
  });
};

// Admin/Manager hooks
export const usePayments = (params = {}) => {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => paymentService.getAllPayments(params),
    placeholderData: (previousData) => previousData,
  });
};

export const usePayment = (id) => {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: () => paymentService.getPayment(id),
    enabled: !!id,
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => paymentService.verifyPayment(id, data),
    onSuccess: () => {
      toast.success("Pembayaran berhasil diverifikasi");
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal verifikasi pembayaran"
      );
    },
  });
};

export const usePaymentStatistics = () => {
  return useQuery({
    queryKey: ["paymentStatistics"],
    queryFn: paymentService.getStatistics,
  });
};
