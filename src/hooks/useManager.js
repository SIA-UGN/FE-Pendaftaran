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
    queryKey: ["manager", "applicant", params],
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
      queryClient.invalidateQueries({ queryKey: ["manager", "applicants"] });
      queryClient.invalidateQueries({ queryKey: ["manager", "applicant", id] });
      queryClient.invalidateQueries({ queryKey: ["manager", "dashboard"] });

      const status = data.data.registration.status;
      const message =
        status === "approved"
          ? "Registration approved successfully"
          : status === "rejected"
          ? "Registration rejected successfully"
          : "Registration status updated";
      toast.success(message);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to update registration status";
      toast.error(message);
    },
  });
};

export const useSetGraduationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => managerService.setGraduationStatus(id, data),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["manager", "applicants"] });
      queryClient.invalidateQueries({ queryKey: ["manager", "applicant", id] });
      queryClient.invalidateQueries({ queryKey: ["manager", "dashboard"] });

      const status = data.data.registration.graduation_status;
      const message =
        status === "graduated"
          ? "Applicant marked as graduated successfully"
          : "Applicant graduation status updated";
      toast.success(message);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to update graduation status";
      toast.error(message);
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
      queryClient.invalidateQueries({
        queryKey: ["manager", "payment", "verification", id],
      });
      queryClient.invalidateQueries({ queryKey: ["manager", "applicants"] });
      queryClient.invalidateQueries({ queryKey: ["manager", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });

      const status = data.data.payment.status;
      const message =
        status === "verified"
          ? "Payment verified successfully"
          : "Payment rejected";
      toast.success(message);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to verify payment";
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
      queryClient.invalidateQueries({ queryKey: ["manager", "notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });

      toast.success(
        `Broadcast sent to ${data.data.recipient_count} recipients successfully`
      );
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to send broadcast notification";
      toast.error(message);
    },
  });
};
