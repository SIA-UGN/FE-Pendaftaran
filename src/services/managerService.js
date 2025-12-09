import apiClient from "@/lib/api";

export const managerService = {
  // Dashboard
  getDashboard: () => apiClient.get("/admin/dashboard"),

  // Applicants Management
  getApplicants: (params) => apiClient.get("/admin/applicants", { params }),
  getApplicantDetail: (id) => apiClient.get(`/admin/applicants/${id}`),
  verifyApplicant: (id, data) =>
    apiClient.put(`/admin/applicants/${id}/status`, data),
  setGraduationStatus: (id, data) =>
    apiClient.put(`/admin/applicants/${id}/graduation`, data),

  // Documents
  getApplicantDocuments: (id) =>
    apiClient.get(`/admin/applicants/${id}/documents`),
  updateDocumentStatus: (id, data) =>
    apiClient.put(`/admin/documents/${id}/verify`, data),

  // Payment Verification
  getPaymentVerification: (id) =>
    apiClient.get(`/admin/payments/${id}/verification`),
  verifyPayment: (id, data) => apiClient.put(`/payments/${id}/verify`, data),

  // Notifications
  getNotifications: (params) => apiClient.get("/notifications", { params }),
  createBroadcastNotification: (data) =>
    apiClient.post("/notifications/send", data),
};
