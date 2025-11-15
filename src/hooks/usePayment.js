import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services/paymentService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

// Hook untuk halaman pembayaran dengan fitur lengkap
export const usePayment = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: rawPaymentData, isLoading } = useQuery({
    queryKey: ["payment", "info"],
    queryFn: async () => {
      const response = await paymentService.getMyPayment();
      return {
        ...response.data,
        ...(response.data.payment || {}),
        payment: response.data.payment,
        paymentStatus: response.data.payment?.status || "pending",
      };
    },
    staleTime: 30 * 1000, // 30 detik
    retry: 1,
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ file, paymentId }) => {
      const formData = new FormData();
      formData.append("payment_proof", file);
      return paymentService.uploadProof(paymentId, formData);
    },
    onSuccess: () => {
      toast.success(
        "Bukti pembayaran berhasil di-upload! Menunggu verifikasi admin."
      );
      queryClient.invalidateQueries({ queryKey: ["payment"] });
      queryClient.invalidateQueries({ queryKey: ["registration"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal mengupload bukti pembayaran"
      );
    },
  });

  const paymentStatus =
    rawPaymentData?.paymentStatus ||
    rawPaymentData?.payment?.status ||
    "pending";
  const paymentData = rawPaymentData;

  const uploadProof = async (file, paymentId) => {
    const actualPaymentId = paymentId || paymentData?.id;
    return uploadMutation.mutateAsync({
      file,
      paymentId: actualPaymentId,
    });
  };

  return {
    paymentData,
    paymentStatus,
    uploadProof,
    isLoading,
    isUploading: uploadMutation.isPending,
  };
};
