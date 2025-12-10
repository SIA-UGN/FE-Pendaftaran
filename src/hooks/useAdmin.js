import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import toast from "react-hot-toast";

// Dashboard
export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: adminService.getDashboard,
  });
};

// Statistics
export const useApplicantStatistics = (params = {}) => {
  return useQuery({
    queryKey: ["applicantStatistics", params],
    queryFn: () => adminService.getApplicantStatistics(params),
  });
};

export const useProgramStatistics = () => {
  return useQuery({
    queryKey: ["programStatistics"],
    queryFn: adminService.getProgramStatistics,
  });
};

export const useFinancialStatistics = () => {
  return useQuery({
    queryKey: ["financialStatistics"],
    queryFn: adminService.getFinancialStatistics,
  });
};

export const useYearlyRevenue = (years) => {
  return useQuery({
    queryKey: ["yearlyRevenue", years],
    queryFn: () => adminService.getYearlyRevenue(years),
    enabled: !!years,
  });
};

// Managers
export const useManagers = (params = {}) => {
  return useQuery({
    queryKey: ["managers", params],
    queryFn: () => adminService.getManagers(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createManager,
    onSuccess: () => {
      toast.success("Manajer berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["managers"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan manajer");
    },
  });
};

export const useDeleteManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.deleteManager,
    onSuccess: () => {
      toast.success("Manajer berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["managers"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus manajer");
    },
  });
};

// Applicants
export const useApplicants = (params = {}) => {
  return useQuery({
    queryKey: ["applicants", params],
    queryFn: () => adminService.getApplicants(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useApplicantDetail = (id) => {
  return useQuery({
    queryKey: ["applicant", id],
    queryFn: () => adminService.getApplicantDetail(id),
    enabled: !!id,
  });
};

export const useUpdateApplicantStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => adminService.updateApplicantStatus(id, data),
    onSuccess: () => {
      toast.success("Status pendaftar berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["applicant"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui status");
    },
  });
};

export const useSetGraduationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => adminService.setGraduationStatus(id, data),
    onSuccess: () => {
      toast.success("Status kelulusan berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["applicant"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui status kelulusan"
      );
    },
  });
};

// Documents
export const useApplicantDocuments = (id) => {
  return useQuery({
    queryKey: ["applicantDocuments", id],
    queryFn: () => adminService.getApplicantDocuments(id),
    enabled: !!id,
  });
};

export const useUpdateDocumentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => adminService.updateDocumentStatus(id, data),
    onSuccess: () => {
      toast.success("Status dokumen berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["applicantDocuments"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui status dokumen"
      );
    },
  });
};
