import apiClient from "@/lib/api";

export const managerService = {
  getDashboard: () => apiClient.get("/manager/dashboard"),
  getApplicants: (params) => apiClient.get("/manager/applicants", { params }),
  getApplicantDetail: (id) => apiClient.get(`/manager/applicants/${id}`),
  verifyApplicant: (id, data) =>
    apiClient.put(`/manager/applicants/${id}/verify`, data),
  setGraduationStatus: (id, data) =>
    apiClient.put(`/manager/applicants/${id}/graduation`, data),
  getPaymentVerification: (id) =>
    apiClient.get(`/manager/payments/${id}/verification`),
  verifyPayment: (id, data) =>
    apiClient.put(`/manager/payments/${id}/verify`, data),
  getNotifications: (params) =>
    apiClient.get("/manager/notifications", { params }),
  createBroadcastNotification: (data) =>
    apiClient.post("/manager/notifications/broadcast", data),
};
