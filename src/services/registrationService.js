import apiClient from "@/lib/api";

export const registrationService = {
  getProgress: () => apiClient.get("/registration/progress"),
  getMyRegistration: () => apiClient.get("/registration/my"),

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
  submitRegistration: () => apiClient.post("/registration/submit"),

  getAllRegistrations: (params) => apiClient.get("/registrations", { params }),
  getRegistration: (id) => apiClient.get(`/registrations/${id}`),
  updateStatus: (id, data) =>
    apiClient.put(`/registrations/${id}/status`, data),
  getStatistics: () => apiClient.get("/registrations/statistics"),
};
