import apiClient from "@/lib/api";

export const registrationService = {
  getProgress: () => apiClient.get("/registration/progress"),
  getMyRegistration: () => apiClient.get("/registration/my"),

  savePersonalIdentity: (data) =>
    apiClient.post("registration/personal-identity", { profile: data }),
  saveAddressInformation: (data) =>
    apiClient.post("/registration/address-information", { address: data }),
  saveAcademicBackground: (data) =>
    apiClient.post("/registration/academic-background", { academic: data }),
  saveFamilyData: (data) => apiClient.post("/registration/family-data", data),
  saveAchievements: (data) =>
    apiClient.post("/registration/achievements", { achievements: data }),

  store: (data) => apiClient.post("/registration", data),
  submitRegistration: () => apiClient.post("/registration/submit"),

  getAllRegistrations: (params) => apiClient.get("/registrations", { params }),
  getRegistration: (id) => apiClient.get(`/registrations/${id}`),
  updateStatus: (id, data) =>
    apiClient.put(`/registrations/${id}/status`, data),
  getStatistics: () => apiClient.get("/registrations/statistics"),
};
