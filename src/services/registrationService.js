import apiClient from "@/lib/api";

export const registrationService = {
  getProgress: () => apiClient.get("/registration/status"),
  getStatus: () => apiClient.get("/registration/status"),
  storeProfile: (data) => apiClient.post("/registration/profile", data),
  getProfile: () => apiClient.get("/registration/profile"),
  uploadDocument: (formData) =>
    apiClient.post("/registration/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
    }),
  getDocuments: () => apiClient.get("/registration/documents"),
  deleteDocument: (id) => apiClient.delete(`/registration/documents/${id}`),
  getDocumentTypes: () => apiClient.get("/registration/document-types"),
  getAchievements: () => apiClient.get("/registration/achievements"),
  addAchievement: (data) => apiClient.post("/registration/achievements", data),
  deleteAchievement: (id) =>
    apiClient.delete(`/registration/achievements/${id}`),
  getGuardians: () => apiClient.get("/registration/guardians"),
  addGuardian: (data) => apiClient.post("/registration/guardians", data),
  updateGuardian: (id, data) =>
    apiClient.put(`/registration/guardians/${id}`, data),
  deleteGuardian: (id) => apiClient.delete(`/registration/guardians/${id}`),
  submitRegistration: () => apiClient.post("/registration/submit"),
  storePersonalIdentity: (data) =>
    apiClient.post("/registration/personal-identity", data),
  storeAddressInformation: (data) =>
    apiClient.post("/registration/address-information", data),
  storeAcademicBackground: (data) =>
    apiClient.post("/registration/academic-background", data),
  storeFamilyData: (data) => apiClient.post("/registration/family-data", data),
  storeAchievements: (data) =>
    apiClient.post("/registration/achievements", data),
  store: (data) => apiClient.post("/registration", data),
};
