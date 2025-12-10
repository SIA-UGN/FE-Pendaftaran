import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { managerService } from "@/services/managerService";
import toast from "react-hot-toast";

// Dashboard
export const useManagerDashboard = () => {
  return useQuery({
    queryKey: ["managerDashboard"],
    queryFn: managerService.getDashboard,
  });
};

// Applicants
export const useManagerApplicants = (params = {}) => {
  return useQuery({
    queryKey: ["managerApplicants", params],
    queryFn: () => managerService.getApplicants(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useManagerApplicantDetail = (id) => {
  return useQuery({
    queryKey: ["managerApplicant", id],
    queryFn: () => managerService.getApplicantDetail(id),
    enabled: !!id,
  });
};

export const useVerifyApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => managerService.verifyApplicant(id, data),
    onSuccess: () => {
      toast.success("Status pendaftar berhasil diverifikasi");
      queryClient.invalidateQueries({ queryKey: ["managerApplicants"] });
      queryClient.invalidateQueries({ queryKey: ["managerApplicant"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal verifikasi pendaftar"
      );
    },
  });
};

export const useManagerSetGraduationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => managerService.setGraduationStatus(id, data),
    onSuccess: () => {
      toast.success("Status kelulusan berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["managerApplicants"] });
      queryClient.invalidateQueries({ queryKey: ["managerApplicant"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui status kelulusan"
      );
    },
  });
};

// Documents
export const useManagerApplicantDocuments = (id) => {
  return useQuery({
    queryKey: ["managerApplicantDocuments", id],
    queryFn: () => managerService.getApplicantDocuments(id),
    enabled: !!id,
  });
};

export const useManagerUpdateDocumentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => managerService.updateDocumentStatus(id, data),
    onSuccess: () => {
      toast.success("Status dokumen berhasil diperbarui");
      queryClient.invalidateQueries({
        queryKey: ["managerApplicantDocuments"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui status dokumen"
      );
    },
  });
};

// Payment Verification
export const useManagerPaymentVerification = (id) => {
  return useQuery({
    queryKey: ["managerPaymentVerification", id],
    queryFn: () => managerService.getPaymentVerification(id),
    enabled: !!id,
  });
};

export const useManagerVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => managerService.verifyPayment(id, data),
    onSuccess: () => {
      toast.success("Pembayaran berhasil diverifikasi");
      queryClient.invalidateQueries({
        queryKey: ["managerPaymentVerification"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal verifikasi pembayaran"
      );
    },
  });
};

// Notifications
export const useManagerNotifications = (params = {}) => {
  return useQuery({
    queryKey: ["managerNotifications", params],
    queryFn: () => managerService.getNotifications(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateBroadcastNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: managerService.createBroadcastNotification,
    onSuccess: () => {
      toast.success("Notifikasi broadcast berhasil dikirim");
      queryClient.invalidateQueries({ queryKey: ["managerNotifications"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengirim notifikasi");
    },
  });
};
