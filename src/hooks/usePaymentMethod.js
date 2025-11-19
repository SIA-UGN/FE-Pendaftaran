import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentMethodService } from "@/services/paymentMethodService";

// Ambil semua payment methods
export const usePaymentMethods = (params = {}) => {
  return useQuery(
    ["paymentMethods", params],
    () => paymentMethodService.getAll(params),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
    }
  );
};

// Ambil satu payment method
export const usePaymentMethod = (id) => {
  return useQuery(["paymentMethod", id], () => paymentMethodService.getOne(id));
};

// Create payment method
export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation(paymentMethodService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentMethods"]);
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
    },
  });
};

// Delete payment method
export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => paymentMethodService.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentMethods"]);
    },
  });
};
