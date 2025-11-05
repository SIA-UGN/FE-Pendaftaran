import apiClient from "@/lib/api";

export const profileService = {
  getProfile: () => apiClient.get("/profile"),
  updateProfile: (data) => apiClient.put("/profile", data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient.post("/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteAvatar: () => apiClient.delete("/profile/avatar"),
};
