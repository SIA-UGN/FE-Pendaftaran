import apiClient from "@/lib/api";

export const paymentService = {
  // student
  getMyPayment: () => apiClient.get("/payment/my"),
  createPayment: () => apiClient.post("/payment"),
  uploadProof: (paymentId, formData) => {
    return apiClient.post(`/payments/${paymentId}/upload-proof`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getPaymentInfo: () => apiClient.get("/payment/info"),
  uploadPaymentProof: (data) => apiClient.post("/payment/upload-proof", data),
  getPaymentStatus: () => apiClient.get("/payment/status"),
  getPaymentHistory: () => apiClient.get("/payment/history"),

  // admin
  getAllPayments: (params) => apiClient.get("/payments", { params }),
  getPayment: (id) => apiClient.get(`/payments/${id}`),
  verifyPayment: (id, data) => apiClient.put(`/payments/${id}/verify`, data),
  getStatistics: () => apiClient.get("/payments/statistics"),
};
