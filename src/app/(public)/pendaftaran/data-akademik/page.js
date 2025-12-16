"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import {
  useRegistrationProgress,
  useUploadDocument,
  useDocuments,
  useDocumentTypes,
} from "@/hooks/useRegistration";

export default function UploadDokumen() {
  const router = useRouter();
  const { data: progressData, isLoading: progressLoading } =
    useRegistrationProgress();
  const { data: documentsData, refetch: refetchDocuments } = useDocuments();
  const { data: documentTypesData } = useDocumentTypes();
  const uploadMutation = useUploadDocument();

  const progress = progressData?.data;
  const existingDocuments = documentsData?.data?.data || [];

  const documentTypeMap = {};
  const documentTypes =
    documentTypesData?.data?.data || documentTypesData?.data || [];
  if (Array.isArray(documentTypes)) {
    documentTypes.forEach((type) => {
      documentTypeMap[type.document_name] = type.id_document_type;
    });
  }

  const [files, setFiles] = useState({
    ijazah: null,
    transkrip: null,
    skl: null,
  });

  const [previews, setPreviews] = useState({
    ijazah: null,
    transkrip: null,
    skl: null,
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    refetchDocuments();
  }, [refetchDocuments]);

  useEffect(() => {
    if (!progressLoading && progress) {
      const accessibleSteps = progress.accessible_steps || [];

      if (!accessibleSteps.includes(4)) {
        toast.error("Silakan selesaikan tahapan sebelumnya terlebih dahulu");
        router.push("/pendaftaran");
      }
    }
  }, [progress, progressLoading, router]);

  const handleFileChange = (documentType, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Hanya file PDF yang diperbolehkan");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB");
      return;
    }

    setFiles((prev) => ({ ...prev, [documentType]: file }));
    setPreviews((prev) => ({ ...prev, [documentType]: file.name }));
  };

  const handleRemoveFile = (documentType) => {
    setFiles((prev) => ({ ...prev, [documentType]: null }));
    setPreviews((prev) => ({ ...prev, [documentType]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.ijazah) {
      toast.error("Ijazah wajib diupload");
      return;
    }

    setIsUploading(true);

    try {
      const uploads = [];

      if (files.ijazah) {
        const ijazahTypeId = documentTypeMap["Ijazah"];
        if (!ijazahTypeId) {
          toast.error("Tipe dokumen Ijazah tidak ditemukan");
          setIsUploading(false);
          return;
        }
        const formData = new FormData();
        formData.append("id_document_type", ijazahTypeId);
        formData.append("file", files.ijazah);
        uploads.push(uploadMutation.mutateAsync(formData));
      }

      if (files.transkrip) {
        const transkripTypeId = documentTypeMap["Transkrip Nilai"];
        if (!transkripTypeId) {
          toast.error("Tipe dokumen Transkrip Nilai tidak ditemukan");
          setIsUploading(false);
          return;
        }
        const formData = new FormData();
        formData.append("id_document_type", transkripTypeId);
        formData.append("file", files.transkrip);
        uploads.push(uploadMutation.mutateAsync(formData));
      }

      if (files.skl) {
        const sklTypeId = documentTypeMap["SKL"];
        if (!sklTypeId) {
          toast.error("Tipe dokumen SKL tidak ditemukan");
          setIsUploading(false);
          return;
        }
        const formData = new FormData();
        formData.append("id_document_type", sklTypeId);
        formData.append("file", files.skl);
        uploads.push(uploadMutation.mutateAsync(formData));
      }

      await Promise.all(uploads);

      toast.success("Semua dokumen berhasil diupload!");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/pendaftaran/data-prestasi");
    } catch (error) {
      console.error("Failed to upload documents:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (progressLoading) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto p-12">
          <div className="animate-pulse">Memuat...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto">
        <RegistrationProgress />
        <div className="flex items-center gap-2 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-4 sm:mt-6 mb-6">
          <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-semibold">Upload Dokumen</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8 lg:p-12 border rounded-xl mx-4 sm:mx-6 md:mx-8 lg:mx-12 bg-[var(--light-cream)]">
            {/* Ijazah */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Ijazah / Surat Keterangan Lulus{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center bg-white">
                {!previews.ijazah ? (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label
                        htmlFor="ijazah"
                        className="cursor-pointer text-blue-600 hover:text-blue-500"
                      >
                        <span>Pilih file</span>
                        <input
                          id="ijazah"
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={(e) => handleFileChange("ijazah", e)}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PDF, maksimal 2MB
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white p-3 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">{previews.ijazah}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile("ijazah")}
                      className="text-red-600 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Transkrip */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Transkrip Nilai
              </label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center bg-white">
                {!previews.transkrip ? (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label
                        htmlFor="transkrip"
                        className="cursor-pointer text-blue-600 hover:text-blue-500"
                      >
                        <span>Pilih file</span>
                        <input
                          id="transkrip"
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={(e) => handleFileChange("transkrip", e)}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PDF, maksimal 2MB
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white p-3 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">{previews.transkrip}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile("transkrip")}
                      className="text-red-600 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SKL */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Surat Keterangan Lulus (SKL)
              </label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center bg-white">
                {!previews.skl ? (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label
                        htmlFor="skl"
                        className="cursor-pointer text-blue-600 hover:text-blue-500"
                      >
                        <span>Pilih file</span>
                        <input
                          id="skl"
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={(e) => handleFileChange("skl", e)}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PDF, maksimal 2MB
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white p-3 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">{previews.skl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile("skl")}
                      className="text-red-600 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Catatan:</strong> Upload dokumen dalam format PDF dengan
                ukuran maksimal 2MB per file. Ijazah/SKL wajib diupload, dokumen
                lainnya opsional.
              </p>
            </div>
          </div>

          <div className="w-full flex items-center justify-end my-6 sm:my-8 md:my-10 lg:my-12 px-4 sm:px-6 md:px-8 lg:px-12 gap-6">
            <Link href="/pendaftaran/data-orangtua" className="w-1/2 sm:w-48">
              <Button type="button" variant={"yellow"} className={"w-full"}>
                Kembali
              </Button>
            </Link>
            <Button
              type="submit"
              variant={"matcha"}
              className={"w-1/2 sm:w-48"}
              disabled={isUploading}
            >
              {isUploading ? "Mengupload..." : "Lanjut"}
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
