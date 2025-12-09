import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { registrationService } from "@/services/registrationService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useRegistrationProgress = () => {
  return useQuery({
    queryKey: ["registration", "progress"],
    queryFn: async () => {
      try {
        const response = await registrationService.getProgress();
        return response.data;
      } catch (error) {
        if (error?.response?.status === 404) {
          return {
            completed_steps: [],
            accessible_steps: [1],
            current_step: 1,
            can_submit: false,
          };
        }
        throw error;
      }
    },
    staleTime: 30 * 1000,
    retry: false,
  });
};

export const useMyRegistration = () => {
  return useQuery({
    queryKey: ["registration", "my"],
    queryFn: async () => {
      const response = await registrationService.getMyRegistration();
      return response.data;
    },
    staleTime: 30 * 1000,
    retry: false,
  });
};

export const useStorePersonalIdentity = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.storePersonalIdentity,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
      toast.success("Data diri berhasil disimpan!");

      const canAccessNext = response?.data?.data?.can_access_next_step;
      if (canAccessNext) {
        router.push("/pendaftaran/data-alamat");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal menyimpan data diri";
      toast.error(message);
    },
  });
};

export const useStoreAddressInformation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.storeAddressInformation,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
      toast.success("Data alamat berhasil disimpan!");

      const canAccessNext = response?.data?.data?.can_access_next_step;
      if (canAccessNext) {
        router.push("/pendaftaran/data-orangtua");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal menyimpan data alamat";
      toast.error(message);
    },
  });
};
export const useStoreFamilyData = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.storeFamilyData,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
      toast.success("Data orang tua berhasil disimpan!");

      const canAccessNext = response?.data?.data?.can_access_next_step;
      if (canAccessNext) {
        router.push("/pendaftaran/data-akademik");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal menyimpan data orang tua";
      toast.error(message);
    },
  });
};

export const useStoreAcademicBackground = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.storeAcademicBackground,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
      toast.success("Data akademik berhasil disimpan!");

      const canAccessNext = response?.data?.data?.can_access_next_step;
      if (canAccessNext) {
        router.push("/pendaftaran/data-prestasi");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal menyimpan data akademik";
      toast.error(message);
    },
  });
};

export const useStoreAchievements = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.storeAchievements,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
      toast.success("Data prestasi berhasil disimpan!");

      const canSubmit = response?.data?.data?.can_submit;
      if (canSubmit) {
        router.push("/pendaftaran/pembayaran");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal menyimpan data prestasi";
      toast.error(message);
    },
  });
};

export const useSubmitRegistration = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.submitRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registration"] });
      toast.success("Pendaftaran berhasil diajukan");
      router.push("/payment");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal mengajukan pendaftaran";
      toast.error(message);
    },
  });
};

// Admin hooks
export const useRegistrations = (params) => {
  return useQuery({
    queryKey: ["registrations", "all", params],
    queryFn: () => registrationService.getAllRegistrations(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => registrationService.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      toast.success("Status pendaftaran berhasil diperbarui");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Gagal memperbarui status pendaftaran";
      toast.error(message);
    },
  });
};
