import apiClient from "@/lib/api";

export const masterDataService = {
  getPrograms: () => apiClient.get("/programs"),
  getProvinces: () => apiClient.get("/public/provinces"),
  getCitiesByProvince: (provinceId) =>
    apiClient.get(`/public/cities/${provinceId}`),
};
