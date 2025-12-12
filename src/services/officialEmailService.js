import apiClient from "@/lib/api";

export const officialEmailService = {
  getFormatOptions: () => apiClient.get("/official-email/format-options"),
  create: (data) => apiClient.post("/official-email/create", data),
  getStatus: () => apiClient.get("/official-email/status"),
};
