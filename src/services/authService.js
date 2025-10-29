import apiClient from "@/lib/api";

export const authService = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  logout: () => apiClient.post("/auth/logout"),
  getUser: () => apiClient.get("/auth/user"),
  refreshToken: () => apiClient.post("/auth/refresh-token"),
};
