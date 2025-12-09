import apiClient from "@/lib/api";

export const registrationService = {
  // ==========================================
  // STUDENT/APPLICANT ENDPOINTS
  // ==========================================

  /**
   * Get registration progress
   * GET /api/registration/progress
   */
  getProgress: () => apiClient.get("/registration/progress"),

  /**
   * Get my registration data
   * GET /api/registration/my
   */
  getMyRegistration: () => apiClient.get("/registration/my"),

  /**
   * Get registration status
   * GET /api/registration/status
   */
  getStatus: () => apiClient.get("/registration/status"),

  // Step-by-step registration
  /**
   * Store profile data
   * POST /api/registration/profile
   */
  storeProfile: (data) => apiClient.post("/registration/profile", data),

  /**
   * Get profile data
   * GET /api/registration/profile
   */
  getProfile: () => apiClient.get("/registration/profile"),

  // Documents
  /**
   * Upload document
   * POST /api/registration/documents
   */
  uploadDocument: (formData) =>
    apiClient.post("/registration/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000, // 60 seconds for document upload
    }),

  /**
   * Get documents
   * GET /api/registration/documents
   */
  getDocuments: () => apiClient.get("/registration/documents"),

  /**
   * Delete document
   * DELETE /api/registration/documents/{id}
   */
  deleteDocument: (id) => apiClient.delete(`/registration/documents/${id}`),

  // Document Types
  /**
   * Get document types
   * GET /api/registration/document-types
   */
  getDocumentTypes: () => apiClient.get("/registration/document-types"),

  // Achievements
  /**
   * Get achievements
   * GET /api/registration/achievements
   */
  getAchievements: () => apiClient.get("/registration/achievements"),

  /**
   * Add achievement
   * POST /api/registration/achievements
   */
  addAchievement: (data) => apiClient.post("/registration/achievements", data),

  /**
   * Delete achievement
   * DELETE /api/registration/achievements/{id}
   */
  deleteAchievement: (id) =>
    apiClient.delete(`/registration/achievements/${id}`),

  // Guardians
  /**
   * Get guardians
   * GET /api/registration/guardians
   */
  getGuardians: () => apiClient.get("/registration/guardians"),

  /**
   * Add guardian
   * POST /api/registration/guardians
   */
  addGuardian: (data) => apiClient.post("/registration/guardians", data),

  /**
   * Update guardian
   * PUT /api/registration/guardians/{id}
   */
  updateGuardian: (id, data) =>
    apiClient.put(`/registration/guardians/${id}`, data),

  /**
   * Delete guardian
   * DELETE /api/registration/guardians/{id}
   */
  deleteGuardian: (id) => apiClient.delete(`/registration/guardians/${id}`),

  // Submit Registration
  /**
   * Submit registration
   * POST /api/registration/submit
   */
  submitRegistration: () => apiClient.post("/registration/submit"),

  // ==========================================
  // LEGACY/ALTERNATIVE ENDPOINTS
  // (Kept for backward compatibility)
  // ==========================================

  /**
   * Store personal identity (alternative)
   * POST /api/registration/personal-identity
   */
  storePersonalIdentity: (data) =>
    apiClient.post("/registration/personal-identity", data),

  /**
   * Store address information (alternative)
   * POST /api/registration/address-information
   */
  storeAddressInformation: (data) =>
    apiClient.post("/registration/address-information", data),

  /**
   * Store academic background (alternative)
   * POST /api/registration/academic-background
   */
  storeAcademicBackground: (data) =>
    apiClient.post("/registration/academic-background", data),

  /**
   * Store family data (alternative)
   * POST /api/registration/family-data
   */
  storeFamilyData: (data) => apiClient.post("/registration/family-data", data),

  /**
   * Store achievements (alternative)
   * POST /api/registration/achievements
   */
  storeAchievements: (data) =>
    apiClient.post("/registration/achievements", data),

  /**
   * Store registration (generic)
   * POST /api/registration
   */
  store: (data) => apiClient.post("/registration", data),
};
