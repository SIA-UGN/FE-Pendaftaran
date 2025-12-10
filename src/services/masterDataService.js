import apiClient from "@/lib/api";

export const masterDataService = {
  /**
   * Get all programs
   * GET /api/programs
   */
  getPrograms: () => apiClient.get("/programs"),

  /**
   * Get all provinces
   * GET /api/public/provinces
   */
  getProvinces: () => apiClient.get("/public/provinces"),

  /**
   * Get cities by province
   * GET /api/public/cities/{provinceId}
   */
  getCitiesByProvince: (provinceId) =>
    apiClient.get(`/public/cities/${provinceId}`),
};
