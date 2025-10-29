import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { registrationService } from "@/services/registrationService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useRegistrationProgress = () => {
  return useQuery({
    queryKey: ["registration", "progress"],
    queryFn: registrationService.getProgress,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useMyRegistration = () => {
  return useQuery({
    queryKey: ["registration", "my"],
    queryFn: registrationService.getMyRegistration,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRegistrationStep = (step) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = {
    1: useMutation({
      mutationFn: registrationService.savePersonalIdentity,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["registration"] });
        toast.success("Personal identity saved successfully.");
        if (data.data?.can_access_next_step) {
          router.push("/registration/address-information");
        } else {
          toast.warning("Please complete all required fields.");
        }
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message || "Failed to save personal identity.";
        toast.error(message);
      },
    }),
    2: useMutation({
      mutationFn: registrationService.saveAddressInformation,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["registration"] });
        toast.success("Address information saved successfully.");
        if (data.data?.can_access_next_step) {
          router.push("/registration/academic-background");
        } else {
          toast.warning("Please complete all required fields.");
        }
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          "Failed to save address information.";
        toast.error(message);
      },
    }),
    3: useMutation({
      mutationFn: registrationService.saveAcademicBackground,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["registration"] });
        toast.success("Academic background saved successfully.");
        if (data.data?.can_access_next_step) {
          router.push("/registration/family-data");
        } else {
          toast.warning("Please complete all required fields.");
        }
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          "Failed to save academic background.";
        toast.error(message);
      },
    }),
    4: useMutation({
      mutationFn: registrationService.saveFamilyData,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["registration"] });
        toast.success("Family data saved successfully.");
        if (data.data?.can_access_next_step) {
          router.push("/registration/achievements");
        } else {
          toast.warning("Please complete all required fields.");
        }
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message || "Failed to save family data.";
        toast.error(message);
      },
    }),
    5: useMutation({
      mutationFn: registrationService.saveAchievements,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["registration"] });
        toast.success("Achievements saved successfully.");
        if (data.data?.can_submit) {
          router.push("/registration/review");
        } else {
          toast.warning("Please complete all required fields.");
        }
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message || "Failed to save achievements.";
        toast.error(message);
      },
    }),
  };

  return mutation[step];
};

export const useSubmitRegistration = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.submitRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
      toast.success("Registration submitted successfully.");
      router.push("/payment");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to submit registration.";
      toast.error(message);
    },
  });
};

// admin
export const useRegistrations = (params) => {
  return useQuery({
    queryKey: ["registrations", "all", params],
    queryFn: () => registrationService.getAllRegistrations(params),
    keepPreviousData: true,
  });
};

export const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => registrationService.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      toast.success("Registration status updated successfully.");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to update registration status.";
      toast.error(message);
    },
  });
};
