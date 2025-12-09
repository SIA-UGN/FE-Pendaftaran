import apiClient from "@/lib/api";

export const paymentService = {
  // ==========================================
  // STUDENT/APPLICANT ENDPOINTS
  // ==========================================

  /**
   * Get current user's payment
   * GET /api/payments/my
   */
  getMyPayment: () => apiClient.get("/payments/my"),

  /**
   * Upload payment proof (first time - all fields required)
   * POST /api/payments/{payment}/upload-proof
   * @param {number} paymentId - Payment ID
   * @param {FormData} formData - Contains:
   *   - payment_proof (file) - required
   *   - sender_bank (string) - required
   *   - sender_account_number (string) - required
   *   - sender_account_holder (string) - required
   *   - paid_amount (number) - required
   *   - payment_notes (string) - optional
   */
  uploadProof: (paymentId, formData) => {
    return apiClient.post(`/payments/${paymentId}/upload-proof`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000, // 60 seconds for file upload
    });
  },

  /**
   * Re-upload payment proof (after rejection - only file required)
   * POST /api/payments/{payment}/re-upload-proof
   * @param {number} paymentId - Payment ID
   * @param {FormData} formData - Contains:
   *   - payment_proof (file) - required
   *   - sender_bank (string) - optional (keeps old value if not provided)
   *   - sender_account_number (string) - optional
   *   - sender_account_holder (string) - optional
   *   - paid_amount (number) - optional
   *   - payment_notes (string) - optional
   */
  reUploadProof: (paymentId, formData) => {
    return apiClient.post(`/payments/${paymentId}/re-upload-proof`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000, // 60 seconds for file upload
    });
  },

  // ==========================================
  // ADMIN/MANAGER ENDPOINTS
  // ==========================================

  /**
   * Get all payments with filters (Admin/Manager)
   * GET /api/payments
   * @param {object} params - Optional filters:
   *   - status: string
   *   - search: string
   *   - page: number
   *   - per_page: number
   */
  getAllPayments: (params) => apiClient.get("/payments", { params }),

  /**
   * Get payment detail (Admin/Manager)
   * GET /api/payments/{payment}
   */
  getPayment: (id) => apiClient.get(`/payments/${id}`),

  /**
   * Verify or reject payment (Admin/Manager)
   * PUT /api/payments/{payment}/verify
   * @param {number} id - Payment ID
   * @param {object} data - Contains:
   *   - action: "verify" | "reject"
   *   - notes: string (optional for verify)
   *   - rejection_reason: string (required for reject)
   */
  verifyPayment: (id, data) => apiClient.put(`/payments/${id}/verify`, data),

  /**
   * Get payment statistics (Admin/Manager)
   * GET /api/payments/statistics
   */
  getStatistics: () => apiClient.get("/payments/statistics"),
};
