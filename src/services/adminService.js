import apiClient from "@/lib/api";

export const adminService = {
  // Dashboard
  getDashboard: () => apiClient.get("/admin/dashboard"),

  // Statistics
  getApplicantStatistics: (params) =>
    apiClient.get("/admin/statistics/applicants", { params }),
  getProgramStatistics: () => apiClient.get("/admin/statistics/programs"),
  getFinancialStatistics: () => apiClient.get("/admin/statistics/financial"),
  getYearlyRevenue: (years) =>
    apiClient.get("/admin/statistics/yearly-revenue", {
      params: { years },
    }),

  // Manager Management
  getManagers: (params) => apiClient.get("/admin/managers", { params }),
  createManager: (data) => apiClient.post("/admin/managers", data),
  deleteManager: (id) => apiClient.delete(`/admin/managers/${id}`),

  // User Management
  getUserProfile: (id) => apiClient.get(`/admin/users/${id}`),
  updateUser: (id, data) => apiClient.put(`/admin/users/${id}`, data),

  // Applicants Management
  getApplicants: (params) => apiClient.get("/admin/applicants", { params }),
  getApplicantDetail: (id) => apiClient.get(`/admin/applicants/${id}`),
  getApplicantPayment: (id) => apiClient.get(`/admin/applicants/${id}/payment`),
  updateApplicantStatus: (id, data) =>
    apiClient.put(`/admin/applicants/${id}/status`, data),
  setGraduationStatus: (id, data) =>
    apiClient.put(`/admin/applicants/${id}/graduation`, data),

  // Documents
  getApplicantDocuments: (id) =>
    apiClient.get(`/admin/applicants/${id}/documents`),
  updateDocumentStatus: (id, data) =>
    apiClient.put(`/admin/documents/${id}/verify`, data),
  serveDocument: (id) => apiClient.get(`/admin/document-file/${id}`),

  // Payment Verification
  getPaymentVerification: (id) => apiClient.get(`/payments/${id}`),
  verifyPayment: (id, data) => apiClient.put(`/payments/${id}/verify`, data),
};
