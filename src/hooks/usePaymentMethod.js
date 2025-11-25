import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { paymentMethodService } from "@/services/paymentMethodService";

/* ---------------------------
   GET ALL PAYMENT METHODS
---------------------------- */
export const usePaymentMethods = (params = {}) => {
  return useQuery({
    queryKey: ["paymentMethods", params],
    queryFn: () => paymentMethodService.getAll(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev, // sama seperti keepPreviousData
    onError: () => toast.error("Error fetching payment methods"),
  });
};

/* ---------------------------
   GET SINGLE PAYMENT METHOD
---------------------------- */
export const usePaymentMethod = (id) => {
  return useQuery({
    queryKey: ["paymentMethod", id],
    queryFn: () => paymentMethodService.getOne(id),
    enabled: !!id, // biar gak nge-fetch kalau id kosong
    onError: () => toast.error("Error fetching payment method"),
  });
};

/* ---------------------------
   CREATE PAYMENT METHOD
---------------------------- */
export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentMethodService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      toast.success("Payment method created successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create payment method"
      );
    },
  });
};

/* ---------------------------
   UPDATE PAYMENT METHOD
---------------------------- */
export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => paymentMethodService.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethod", variables.id] });
      toast.success("Payment method updated successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update payment method"
      );
    },
  });
};

/* ---------------------------
   DELETE PAYMENT METHOD
---------------------------- */
export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => paymentMethodService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      toast.success("Payment method deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete payment method"
      );
    },
  });
};
