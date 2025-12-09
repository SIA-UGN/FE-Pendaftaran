import apiClient from "@/lib/api";

export const officialEmailService = {
  /**
   * Get email format options
   * GET /api/official-email/format-options
   */
  getFormatOptions: () => apiClient.get("/official-email/format-options"),

  /**
   * Create official email
   * POST /api/official-email/create
   */
  create: (data) => apiClient.post("/official-email/create", data),

  /**
   * Get email status
   * GET /api/official-email/status
   */
  getStatus: () => apiClient.get("/official-email/status"),
};
