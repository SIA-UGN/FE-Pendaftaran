import apiClient from "@/lib/api";

export const notificationService = {
  getAll: (params) => apiClient.get("/notifications", params),
  getUnreadCount: () => apiClient.get("/notifications/unread-count"),
  getRecent: () => apiClient.get("/notifications/recent"),
  markAsRead: (id) => apiClient.patch(`/notifications/${id}/read`),
  markAllAsRead: () => apiClient.post("/notifications/mark-all-read"),
  delete: (id) => apiClient.delete(`/notifications/${id}`),
  clearRead: () => apiClient.delete("/notifications/read-clear"),
};
