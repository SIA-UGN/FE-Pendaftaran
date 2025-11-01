import apiClient from "@/lib/api";

export const announcementService = {
  getAll: (params) => apiClient.get("/announcements", { params }),
  create: (data) => apiClient.post("/announcements", data),
};
