import { useState } from "react";
import toast from "react-hot-toast";

export const useFileUpload = ({
  maxSize = 2 * 1024 * 1024,
  allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
  onUpload,
} = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFile = (file) => {
    if (!file) {
      toast.error("Tidak ada file yang dipilih");
      return false;
    }

    if (file.size > maxSize) {
      toast.error(`Ukuran file maksimal ${maxSize / (1024 * 1024)}MB`);
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Tipe file tidak diizinkan");
      return false;
    }

    return true;
  };

  const uploadFile = async (file, additionalData = {}) => {
    if (!validateFile(file)) {
      return null;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const result = await onUpload(formData);

      clearInterval(progressInterval);
      setProgress(100);

      return result;
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal upload file");
      return null;
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return {
    isUploading,
    progress,
    uploadFile,
    validateFile,
  };
};
