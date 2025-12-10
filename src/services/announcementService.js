import apiClient from "@/lib/api";

export const announcementService = {
  // Get all announcements with optional filters
  getAll: (params) => apiClient.get("/announcements", { params }),

  // Create new announcement (Admin/Manager only)
  create: (data) => apiClient.post("/announcements", data),
};
