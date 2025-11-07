import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import toast from "react-hot-toast";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: adminService.getDashboard,
    staleTime: 5 * 60 * 1000,
  });
};

export const useApplicantStatistics = (params) => {
  return useQuery({
    queryKey: ["admin", "statistics", "applicants", params],
    queryFn: () => adminService.getApplicantStatistics(params),
    keepPreviousData: true,
  });
};

export const useProgramStatistics = () => {
  return useQuery({
    queryKey: ["admin", "statistics", "programs"],
    queryFn: adminService.getProgramStatistics,
    staleTime: 10 * 60 * 1000,
  });
};

export const useFinancialStatistics = () => {
  return useQuery({
    queryKey: ["admin", "statistics", "financial"],
    queryFn: adminService.getFinancialStatistics,
    staleTime: 10 * 60 * 1000,
  });
};

export const useManagers = (params) => {
  return useQuery({
    queryKey: ["admin", "managers", params],
    queryFn: () => adminService.getManagers(params),
    keepPreviousData: true,
  });
};

export const useCreateManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "managers"] });
      toast.success("Manager created successfully!");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to create manager.";
      toast.error(message);
    },
  });
};

export const useDeleteManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.deleteManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "managers"] });
      toast.success("Manager deleted successfully!");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to delete manager.";
      toast.error(message);
    },
  });
};

export const useUserProfile = (id) => {
  return useQuery({
    queryKey: ["admin", "users", id],
    queryFn: () => adminService.getUserProfile(id),
    enabled: !!id,
  });
};

export const usePaymentVerification = (id) => {
  return useQuery({
    queryKey: ["admin", "payments", id, "verification"],
    queryFn: () => adminService.getPaymentVerification(id),
    enabled: !!id,
  });
};
