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
    retry: 2,
    retryDelay: 1000,
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
    queryFn: registrationService.getMyRegistration,
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
      toast.success("Data profil berhasil disimpan");
      queryClient.invalidateQueries({ queryKey: ["registrationProgress"] });
      queryClient.invalidateQueries({ queryKey: ["registrationProfile"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Gagal menyimpan data profil"
      );
    },
  });
};

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
      toast.success("Dokumen berhasil diupload");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
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
      toast.success("Data wali berhasil ditambahkan");
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
