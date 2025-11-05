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
      toast.success("Payment created successfully, please proceed to payment.");
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
      toast.success(
        "Payment proof uploaded successfully. Waiting for verification."
      );
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to upload payment proof.";
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
      toast.success("Payment verified successfully.");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to verify payment.";
      toast.error(message);
    },
  });
};
