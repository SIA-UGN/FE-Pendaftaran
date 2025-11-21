import apiClient from "@/lib/api";

export const announcementService = {
  getAll: (params) => apiClient.get("/announcements/general", { params }),
  create: (data) => apiClient.post("/announcements", data),
};