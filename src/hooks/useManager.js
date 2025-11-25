import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { managerService } from "@/services/managerService";
import toast from "react-hot-toast";

export const useManagerDashboard = () => {
  return useQuery({
    queryKey: ["manager", "dashboard"],
    queryFn: managerService.getDashboard,
    staleTime: 5 * 60 * 1000,
  });
};

export const useManagerApplicants = (params) => {
  return useQuery({
    queryKey: ["manager", "applicants", params],
    queryFn: () => managerService.getApplicants(params),
    keepPreviousData: true,
  });
};

export const useApplicantDetail = (id) => {
  return useQuery({
    queryKey: ["manager", "applicant", id],
    queryFn: () => managerService.getApplicantDetail(id),
    enabled: !!id,
  });
};

export const useVerifyApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => managerService.verifyApplicant(id, data),
    onSuccess: (data, { id }) => {
      console.log("RESPONSE FROM BACKEND:", data);

      queryClient.invalidateQueries({ queryKey: ["manager", "applicants"] });
      queryClient.invalidateQueries({ queryKey: ["manager", "applicant", id] });
      queryClient.invalidateQueries({ queryKey: ["manager", "dashboard"] });

      const status = data?.data?.data?.registration?.status;
      const message =
        status === "approved"
          ? "Pendaftaran berhasil disetujui"
          : status === "rejected"
            ? "Pendaftaran berhasil ditolak"
            : "Status pendaftaran berhasil diperbarui";
      toast.success(message);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Gagal memperbarui status pendaftaran";
      toast.error(message);
    },
  });
};

export const useSetGraduationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => managerService.setGraduationStatus(id, data),
    onSuccess: (data, { id }) => {
      console.log("RESPONSE FROM BACKEND:", data);

      queryClient.invalidateQueries({ queryKey: ["manager", "applicants"] });
      queryClient.invalidateQueries({ queryKey: ["manager", "applicant", id] });
      queryClient.invalidateQueries({ queryKey: ["manager", "dashboard"] });

      const status = data.data.data.registration.graduation_status;
      const message =
        status === "graduated"
          ? "Pendaftar berhasil ditandai sebagai lulusan"
          : "Status kelulusan pendaftar berhasil diperbarui";
      toast.success(message);
    },
    onError: (error) => {
      console.log("ERROR OBJECT:", error);
      console.log("RESPONSE:", error.response);
      console.log("REQUEST:", error.request);

      toast.error("Gagal memperbarui status kelulusan");
    },
  });
};

export const usePaymentVerification = (id) => {
  return useQuery({
    queryKey: ["manager", "payment", "verification", id],
    queryFn: () => managerService.getPaymentVerification(id),
    enabled: !!id,
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => managerService.verifyPayment(id, data),
    onSuccess: (data, { id }) => {
      console.log("RESPONSE FROM BACKEND:", data);

      queryClient.invalidateQueries({
        queryKey: ["manager", "payment", "verification", id],
      });
      queryClient.invalidateQueries({ queryKey: ["manager", "applicants"] });
      queryClient.invalidateQueries({ queryKey: ["manager", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });

      const status = data?.data?.data?.payment?.status;
      const message =
        status === "verified"
          ? "Pembayaran berhasil diverifikasi"
          : "Pembayaran ditolak";
      toast.success(message);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal memverifikasi pembayaran";
      toast.error(message);
    },
  });
};

export const useManagerNotifications = (params) => {
  return useQuery({
    queryKey: ["manager", "notifications", params],
    queryFn: () => managerService.getNotifications(params),
    keepPreviousData: true,
  });
};

export const useCreateBroadcastNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: managerService.createBroadcastNotification,
    onSuccess: (data) => {
      console.log("RESPONSE FROM BACKEND:", data);

      queryClient.invalidateQueries({ queryKey: ["manager", "notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });

      toast.success(
        `Broadcast berhasil dikirim ke ${data.data.data.target_count} penerima`
      );
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal mengirim notifikasi broadcast";
      toast.error(message);
    },
  });
};
