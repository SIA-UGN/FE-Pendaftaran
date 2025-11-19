import apiClient from "@/lib/api";

export const paymentMethodService = {
  getAll: (params = {}) => apiClient.get("/payment-methods", { params }),
  getOne: (id) => apiClient.get(`/payment-methods/${id}`),
  create: (data) => apiClient.post("/payment-methods", data),
  update: (id, data) => apiClient.put(`/payment-methods/${id}`, data),
  delete: (id) => apiClient.delete(`/payment-methods/${id}`),
};
