import { useState } from "react";
import toast from "react-hot-toast";
import { uploadFile } from "@/services/uploadService";

export const useFileUpload = (options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024,
    allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    onSuccess,
    onError,
  } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file, type = "document") => {
    if (!file) return null;

    if (file.size > maxSize) {
      const sizeMB = (maxSize / (1024 * 1024)).toFixed(0);
      toast.error(`Ukuran file maksimal ${sizeMB}MB`);
      onError?.({ message: "File size exceeds limit", file });
      return null;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Format file harus PDF, JPG, atau PNG");
      onError?.({ message: "Invalid file type", file });
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      const response = await uploadFile(file, type);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.success) {
        toast.success(`File ${file.name} berhasil diupload`);
        onSuccess?.({ url: response.url, file });
        return response.url;
      } else {
        toast.error("Gagal upload file");
        onError?.({ message: "Upload failed", file });
        return null;
      }
    } catch (error) {
      toast.error(
        `Gagal upload file: ${error.response?.data?.message || error.message}`
      );
      onError?.({ error, file });
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    handleUpload,
    isUploading,
    uploadProgress,
  };
};
