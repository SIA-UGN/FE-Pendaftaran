import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { registrationService } from "@/services/registrationService";
import toast from "react-hot-toast";

// Progress & Status
export const useRegistrationProgress = (enabled = true) => {
  return useQuery({
    queryKey: ["registrationProgress"],
    queryFn: registrationService.getProgress,
    enabled:
      enabled &&
      typeof window !== "undefined" &&
      !!localStorage.getItem("access_token"),
    retry: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (response) => {
      // Transform API response to match component expectations
      // Backend returns: { data: { data: { progress: {...}, profile: {...} } } }
      const apiData = response.data?.data || response.data || {};
      const progress = apiData.progress || {};

      // Map progress booleans to step numbers
      const completed_steps = [];
      const accessible_steps = [];

      // Step 1: Data Diri (profile)
      if (progress.profile) {
        completed_steps.push(1);
        accessible_steps.push(2); // Next step becomes accessible
      } else {
        accessible_steps.push(1); // First step always accessible
      }

      // Step 2: Data Alamat (part of profile)
      if (progress.profile && apiData.profile?.full_address) {
        completed_steps.push(2);
        accessible_steps.push(3);
      } else if (progress.profile) {
        accessible_steps.push(2);
      }

      // Step 3: Data Orangtua (guardians)
      if (progress.guardians) {
        completed_steps.push(3);
        accessible_steps.push(4);
      } else if (completed_steps.includes(2)) {
        accessible_steps.push(3);
      }

      // Step 4: Data Akademik (documents)
      if (progress.documents) {
        completed_steps.push(4);
        accessible_steps.push(5);
      } else if (completed_steps.includes(3)) {
        accessible_steps.push(4);
      }

      // Step 5: Data Prestasi (achievements - optional)
      if (completed_steps.includes(4)) {
        accessible_steps.push(5);
        // Achievements are optional, so consider step 5 complete if step 4 is done
        if (progress.achievements || apiData.achievements_count === 0) {
          completed_steps.push(5);
          accessible_steps.push(6); // Payment step
        }
      }

      return {
        ...response,
        data: {
          ...apiData,
          completed_steps,
          accessible_steps,
        },
      };
    },
  });
};

export const useRegistrationStatus = () => {
  return useQuery({
    queryKey: ["registrationStatus"],
    queryFn: registrationService.getStatus,
  });
};

export const useMyRegistration = () => {
  return useQuery({
    queryKey: ["myRegistration"],
    queryFn: registrationService.getStatus, // Use getStatus instead of non-existent getMyRegistration
  });
};

// Profile
export const useRegistrationProfile = () => {
  return useQuery({
    queryKey: ["registrationProfile"],
    queryFn: registrationService.getProfile,
  });
};

export const useStoreProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.storeProfile,
    onSuccess: () => {
      toast.success("Data berhasil disimpan!");
      // Invalidate queries to refetch latest data
      queryClient.invalidateQueries({ queryKey: ["registrationProgress"] });
      queryClient.invalidateQueries({ queryKey: ["registrationProfile"] });
      queryClient.invalidateQueries({ queryKey: ["myRegistration"] });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Gagal menyimpan data";
      toast.error(errorMessage);
    },
  });
};

// Aliases for backward compatibility (all use same endpoint /registration/profile)
export const useStoreAddressInformation = useStoreProfile;
export const useStoreFamilyData = useStoreProfile;
export const useStoreAcademicBackground = useStoreProfile;

// Documents
export const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: registrationService.getDocuments,
  });
};

export const useDocumentTypes = () => {
  return useQuery({
    queryKey: ["documentTypes"],
    queryFn: registrationService.getDocumentTypes,
  });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.uploadDocument,
    onSuccess: () => {
      // No toast here - will be handled at page level after all documents uploaded
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["registrationProgress"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal upload dokumen");
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.deleteDocument,
    onSuccess: () => {
      toast.success("Dokumen berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus dokumen");
    },
  });
};

// Guardians
export const useGuardians = () => {
  return useQuery({
    queryKey: ["guardians"],
    queryFn: registrationService.getGuardians,
  });
};

export const useAddGuardian = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.addGuardian,
    onSuccess: () => {
      // No toast here - will be handled at page level after all guardians submitted
      queryClient.invalidateQueries({ queryKey: ["guardians"] });
      queryClient.invalidateQueries({ queryKey: ["registrationProgress"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal menambahkan data wali"
      );
    },
  });
};

export const useUpdateGuardian = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => registrationService.updateGuardian(id, data),
    onSuccess: () => {
      toast.success("Data wali berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["guardians"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui data wali"
      );
    },
  });
};

export const useDeleteGuardian = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.deleteGuardian,
    onSuccess: () => {
      toast.success("Data wali berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["guardians"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus data wali");
    },
  });
};

// Submit
export const useSubmitRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrationService.submitRegistration,
    onSuccess: () => {
      toast.success("Pendaftaran berhasil disubmit!");
      queryClient.invalidateQueries({ queryKey: ["registrationProgress"] });
      queryClient.invalidateQueries({ queryKey: ["registrationStatus"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal submit pendaftaran");
    },
  });
};
