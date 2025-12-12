import apiClient from "@/lib/api";

export const profileService = {
  getProfile: () => {
    const token = localStorage.getItem("access_token");
    return apiClient.get("/profile");
  },
  updateProfile: (data) => apiClient.put("/profile", data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient.post("/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 30000,
    });
  },
  deleteAvatar: () => apiClient.delete("/profile/avatar"),
};
