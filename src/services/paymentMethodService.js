import apiClient from "@/lib/api";

export const paymentMethodService = {
  getAll: (params = {}) => apiClient.get("/admin/payment-methods", { params }),
  getOne: (id) => apiClient.get(`/admin/payment-methods/${id}`),
  create: (data) => apiClient.post("/admin/payment-methods", data),
  update: (id, data) => apiClient.put(`/admin/payment-methods/${id}`, data),
  delete: (id) => apiClient.delete(`/admin/payment-methods/${id}`),
};
