import apiClient from "@/lib/api";

export const authService = {
  // Authentication
  register: (data) => apiClient.post("/register", data),
  login: (data) => apiClient.post("/login", data),
  logout: () => apiClient.post("/logout"),
  getUser: () => apiClient.get("/user"),

  // Password Management
  changePassword: (data) => apiClient.post("/change-password", data),
  forgotPassword: (data) => apiClient.post("/forgot-password", data),
  resetPassword: (data) => apiClient.post("/reset-password", data),

  // Email Management
  changeEmail: (data) => apiClient.post("/change-email", data),

  // Token Management
  refreshToken: () => apiClient.post("/auth/refresh-token"),
};
