import apiClient from "@/lib/api";

export const profileService = {
  /**
   * Get current user profile
   * GET /api/profile
   */
  getProfile: () => apiClient.get("/profile"),

  /**
   * Update profile
   * PUT /api/profile
   */
  updateProfile: (data) => apiClient.put("/profile", data),

  /**
   * Upload avatar
   * POST /api/profile/avatar
   */
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient.post("/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30000, // 30 seconds for avatar upload
    });
  },

  /**
   * Delete avatar
   * DELETE /api/profile/avatar
   */
  deleteAvatar: () => apiClient.delete("/profile/avatar"),
};
