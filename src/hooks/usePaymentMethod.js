import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { paymentMethodService } from "@/services/paymentMethodService";

// Ambil semua payment methods
export const usePaymentMethods = (params = {}) => {
  return useQuery(
    ["paymentMethods", params],
    () => paymentMethodService.getAll(params),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      onError: (error) => toast.error("Error fetching payment methods"),
    }
  );
};

// Ambil satu payment method
export const usePaymentMethod = (id) => {
  return useQuery(
    ["paymentMethod", id],
    () => paymentMethodService.getOne(id),
    {
      onError: () => toast.error("Error fetching payment method"),
    }
  );
};

// Create payment method
export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation(paymentMethodService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentMethods"]);
      toast.success("Payment method created successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create payment method"
      );
    },
  });
};

// Update payment method
export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => paymentMethodService.update(id, data), {
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["paymentMethods"]);
      queryClient.invalidateQueries(["paymentMethod", variables.id]);
      toast.success("Payment method updated successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update payment method"
      );
    },
  });
};

// Delete payment method
export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => paymentMethodService.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentMethods"]);
      toast.success("Payment method deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete payment method"
      );
    },
  });
};
