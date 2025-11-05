import apiClient from "@/lib/api";

export const authService = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  logout: () => apiClient.post("/auth/logout"),
  getUser: () => apiClient.get("/auth/user"),
  refreshToken: () => apiClient.post("/auth/refresh-token"),
  forgotPassword: (data) => apiClient.post("/auth/forgot-password", data),
  resetPassword: (data) => apiClient.post("/auth/reset-password", data),
  changePassword: (data) => apiClient.post("/auth/change-password", data),
};
