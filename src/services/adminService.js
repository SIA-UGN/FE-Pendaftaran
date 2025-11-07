import apiClient from "@/lib/api";

export const adminService = {
  getDashboard: () => apiClient.get("/admin/dashboard"),
  getApplicantStatistics: (params) =>
    apiClient.get("/admin/statistics/applicants", { params }),
  getProgramStatistics: () => apiClient.get("/admin/statistics/programs"),
  getFinancialStatistics: () => apiClient.get("/admin/statistics/financial"),
  getManagers: (params) => apiClient.get("/admin/managers", { params }),
  createManager: (data) => apiClient.post("/admin/managers", data),
  deleteManager: (id) => apiClient.delete(`/admin/managers/${id}`),
  getUserProfile: (id) => apiClient.get(`/admin/users/${id}`),
  getPaymentVerification: (id) =>
    apiClient.get(`/admin/payments/${id}/verification`),
};
