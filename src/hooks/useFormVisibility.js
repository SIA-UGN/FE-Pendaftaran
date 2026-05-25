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
    select: (response) => response?.data?.data?.data || response?.data?.data || [],
  });
};

// ==========================================
// FIELD-LEVEL HOOKS
// ==========================================

/**
 * Public — fetch field yang visible untuk sebuah section.
 */
export const useVisibleFields = (sectionId) => {
  return useQuery({
    queryKey: ["visibleFields", sectionId],
    queryFn: () => registrationService.getVisibleFields(sectionId),
    enabled: !!sectionId,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (response) => response?.data?.data || [],
  });
};

/**
 * Admin — fetch semua field untuk sebuah section.
 */
export const useAdminFields = (sectionId) => {
  return useQuery({
    queryKey: ["adminFields", sectionId],
    queryFn: () => registrationService.adminGetFields(sectionId),
    enabled: !!sectionId,
    select: (response) => response?.data?.data || [],
  });
};

/**
 * Admin — fetch semua section BESERTA field-nya.
 */
export const useAdminSectionsWithFields = (params = {}) => {
  return useQuery({
    queryKey: ["adminSectionsWithFields", params],
    queryFn: () => registrationService.adminGetSectionsWithFields(params),
    select: (response) => response?.data?.data || [],
  });
};

/**
 * Admin — mutation update visibility single field.
 */
export const useUpdateFieldVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fieldId, data }) =>
      registrationService.adminUpdateFieldVisibility(fieldId, data),
    onSuccess: () => {
      toast.success("Visibilitas field berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["adminFields"] });
      queryClient.invalidateQueries({ queryKey: ["adminSectionsWithFields"] });
      queryClient.invalidateQueries({ queryKey: ["visibleFields"] });
      queryClient.invalidateQueries({ queryKey: ["visibleSections"] });
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message || "Gagal memperbarui visibilitas field";
      toast.error(msg);
    },
  });
};

/**
 * Admin — mutation batch update visibility field.
 */
export const useBatchUpdateFieldVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      registrationService.adminBatchUpdateFieldVisibility(data),
    onSuccess: () => {
      toast.success("Batch update visibilitas field berhasil!");
      queryClient.invalidateQueries({ queryKey: ["adminFields"] });
      queryClient.invalidateQueries({ queryKey: ["adminSectionsWithFields"] });
      queryClient.invalidateQueries({ queryKey: ["visibleFields"] });
      queryClient.invalidateQueries({ queryKey: ["visibleSections"] });
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        "Gagal melakukan batch update field";
      toast.error(msg);
    },
  });
};
