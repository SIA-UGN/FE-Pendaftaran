import apiClient from "@/lib/api";

export const paymentMethodService = {
  /**
   * Get all payment methods (Admin only)
   * GET /api/admin/payment-methods
   */
  getAll: (params = {}) => apiClient.get("/admin/payment-methods", { params }),

  /**
   * Get single payment method (Admin only)
   * GET /api/admin/payment-methods/{id}
   */
  getOne: (id) => apiClient.get(`/admin/payment-methods/${id}`),

  /**
   * Create payment method (Admin only)
   * POST /api/admin/payment-methods
   */
  create: (data) => apiClient.post("/admin/payment-methods", data),

  /**
   * Update payment method (Admin only)
   * PUT /api/admin/payment-methods/{id}
   */
  update: (id, data) => apiClient.put(`/admin/payment-methods/${id}`, data),

  /**
   * Delete payment method (Admin only)
   * DELETE /api/admin/payment-methods/{id}
   */
  delete: (id) => apiClient.delete(`/admin/payment-methods/${id}`),
};
