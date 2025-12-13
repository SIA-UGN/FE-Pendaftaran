import apiClient from "@/lib/api";

export const authService = {
  // Authentication
  register: (data) => apiClient.post("/register", data),
  login: (data) => apiClient.post("/login", data),
  logout: () => apiClient.post("/logout"),
  getUser: () => apiClient.get("/user"),

  // Password Management
  changePassword: (data) => apiClient.post("/change-password", data),
  forgotPassword: (data) =>
    apiClient.post("/forgot-password", data, {
      timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
    }),
  resetPassword: (data) =>
    apiClient.post("/reset-password", data, {
      timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
    }),

  // Email Management
  changeEmail: (data) => apiClient.post("/change-email", data),

  // Token Management
  refreshToken: () => apiClient.post("/auth/refresh-token"),
};
