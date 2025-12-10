import { useState } from "react";
import toast from "react-hot-toast";

/**
 * Hook untuk handle file upload dengan validasi
 * @param {Object} options - Configuration options
 * @param {number} options.maxSize - Maximum file size in bytes (default: 2MB)
 * @param {string[]} options.allowedTypes - Allowed MIME types
 * @param {Function} options.onUpload - Upload handler function
 * @returns {Object} Upload utilities
 */
export const useFileUpload = ({
  maxSize = 2 * 1024 * 1024, // 2MB default
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

      // Append additional data
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });

      // Simulate progress
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
