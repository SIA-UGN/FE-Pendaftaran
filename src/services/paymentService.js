import apiClient from "@/lib/api";

export const paymentService = {
  getMyPayment: () => apiClient.get("/payments/my"),
  uploadProof: (paymentId, formData) => {
    return apiClient.post(`/payments/${paymentId}/upload-proof`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
    });
  },
  reUploadProof: (paymentId, formData) => {
    return apiClient.post(`/payments/${paymentId}/re-upload-proof`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
    });
  },
  getAllPayments: (params) => apiClient.get("/payments", { params }),
  getPayment: (id) => apiClient.get(`/payments/${id}`),
  verifyPayment: (id, data) => apiClient.put(`/payments/${id}/verify`, data),
  getStatistics: () => apiClient.get("/payments/statistics"),
};
