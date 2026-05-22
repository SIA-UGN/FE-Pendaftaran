import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { registrationService } from "@/services/registrationService";
import toast from "react-hot-toast";

// ==========================================
// PUBLIC HOOKS (Portal Pendaftar)
// ==========================================

/**
 * Hook untuk pendaftar — fetch section aktif (is_visible: true).
 * Data di-cache selama 10 menit karena konfigurasi jarang berubah.
 * @param {string|null} programId - Opsional, filter per program studi.
 */
export const useVisibleSections = (programId = null) => {
  return useQuery({
    queryKey: ["visibleSections", programId],
    queryFn: () => registrationService.getVisibleSections(programId),
    staleTime: 10 * 60 * 1000, // Cache aman selama 10 menit
    refetchOnWindowFocus: false,
    select: (response) => response?.data?.data || [],
  });
};

// ==========================================
// ADMIN HOOKS (Dashboard Manager)
// ==========================================

/**
 * Admin — fetch semua section (visible & hidden).
 */
export const useAdminSections = (params = {}) => {
  return useQuery({
    queryKey: ["adminSections", params],
    queryFn: () => registrationService.adminGetSections(params),
    select: (response) => response?.data?.data || [],
  });
};

/**
 * Admin — mutation update visibilitas single section.
 * Invalidates kedua query key agar public & admin view sinkron.
 */
export const useUpdateSectionVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      registrationService.adminUpdateVisibility(id, data),
    onSuccess: () => {
      toast.success("Visibilitas section berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["adminSections"] });
      queryClient.invalidateQueries({ queryKey: ["visibleSections"] });
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message || "Gagal memperbarui visibilitas";
      toast.error(msg);
    },
  });
};

/**
 * Admin — mutation batch update visibilitas.
 */
export const useBatchUpdateVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => registrationService.adminBatchUpdateVisibility(data),
    onSuccess: () => {
      toast.success("Batch update visibilitas berhasil!");
      queryClient.invalidateQueries({ queryKey: ["adminSections"] });
      queryClient.invalidateQueries({ queryKey: ["visibleSections"] });
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message || "Gagal melakukan batch update";
      toast.error(msg);
    },
  });
};

/**
 * Admin — fetch riwayat perubahan (audit log) per section.
 */
export const useAdminSectionHistory = (id) => {
  return useQuery({
    queryKey: ["adminSectionHistory", id],
    queryFn: () => registrationService.adminGetSectionHistory(id),
    enabled: !!id,
    select: (response) => response?.data?.data || [],
  });
};
