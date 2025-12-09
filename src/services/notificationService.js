import apiClient from "@/lib/api";

export const notificationService = {
  // Get all notifications with pagination
  getAll: (params) => apiClient.get("/notifications", { params }),

  // Get unread count
  getUnreadCount: () => apiClient.get("/notifications/unread-count"),

  // Mark as read
  markAsRead: (id) => apiClient.post(`/notifications/${id}/read`),
  markAllAsRead: () => apiClient.post("/notifications/mark-all-read"),

  // Delete notifications
  delete: (id) => apiClient.delete(`/notifications/${id}`),

  // Send notification (Admin/Manager only)
  sendNotification: (data) => apiClient.post("/notifications/send", data),
};
