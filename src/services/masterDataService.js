import apiClient from "@/lib/api";

export const masterDataService = {
  /**
   * Get active programs
   * GET /api/programs
   */
  getPrograms: () => apiClient.get("/programs"),

  /**
   * Get provinces
   * GET /api/public/provinces
   */
  getProvinces: () => apiClient.get("/public/provinces"),

  /**
   * Get cities by province
   * GET /api/public/cities/{id_province}
   */
  getCitiesByProvince: (provinceId) =>
    apiClient.get(`/public/cities/${provinceId}`),
};
