"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import {
  useRegistrationProgress,
  useMyRegistration,
  useStoreAcademicBackground,
} from "@/hooks/useRegistration";
import { uploadFile } from "@/services/uploadService";

const FormSchema = z.object({
  sekolahAsal: z.string().min(3, { message: "Nama sekolah asal wajib diisi." }),
  statusKelulusan: z.string({
    required_error: "Status kelulusan harus dipilih.",
  }),
  ijazahTerakhir: z.string({
    required_error: "Ijazah terakhir harus dipilih.",
  }),
  programStudi: z.string({
    required_error: "Program studi harus dipilih.",
  }),
  fileSertifikat: z.string().optional(),
  fileSuratKelulusan: z.string().optional(),
  fileTranskrip: z.string().optional(),
  fileUjianNasional: z.string().optional(),
  fileTesSeleksi: z.string().optional(),
});

export default function DataAkademik() {
  const router = useRouter();
  const { data: progressData, isLoading: progressLoading } =
    useRegistrationProgress();
  const { data: registrationData, refetch } = useMyRegistration();
  const storeMutation = useStoreAcademicBackground();
  const [isUploading, setIsUploading] = useState(false);

  const progress = progressData?.data;

  useEffect(() => {
    refetch();
  }, [refetch]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sekolahAsal: "",
      statusKelulusan: "",
      ijazahTerakhir: "",
      programStudi: "",
      fileSertifikat: "",
      fileSuratKelulusan: "",
      fileTranskrip: "",
      fileUjianNasional: "",
      fileTesSeleksi: "",
    },
  });

  useEffect(() => {
    if (!progressLoading && progress) {
      const accessibleSteps = progress.accessible_steps || [];

      if (!accessibleSteps.includes(4)) {
        toast.error("Silakan selesaikan tahapan sebelumnya terlebih dahulu");
        router.push("/pendaftaran");
      }
    }
  }, [progress, progressLoading, router]);

  useEffect(() => {
    if (registrationData?.data?.registration?.academicRecord) {
      const academic = registrationData.data.registration.academicRecord;
      form.reset({
        sekolahAsal: academic.school_origin || "",
        statusKelulusan: academic.graduation_status || "",
        ijazahTerakhir: academic.last_certificate || "",
        programStudi: academic.study_program || "",
        fileSertifikat: academic.certification_file || "",
        fileSuratKelulusan: academic.graduation_letter_file || "",
        fileTranskrip: academic.transcript_file || "",
        fileUjianNasional: academic.national_exam_file || "",
        fileTesSeleksi: academic.selection_test_file || "",
      });
    }
  }, [registrationData, form]);

  const handleFileUpload = async (file, fieldName) => {
    if (!file) return null;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return null;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format file harus PDF, JPG, atau PNG");
      return null;
    }

    setIsUploading(true);
    try {
      const typeMap = {
        fileSertifikat: "certificate",
        fileSuratKelulusan: "graduation_letter",
        fileTranskrip: "transcript",
        fileUjianNasional: "national_exam",
        fileTesSeleksi: "selection_test",
      };

      const response = await uploadFile(file, typeMap[fieldName]);

      if (response.success) {
        toast.success(`File ${file.name} berhasil diupload`);
        return response.url;
      } else {
        toast.error("Gagal upload file");
        return null;
      }
    } catch (error) {
      toast.error(
        `Gagal upload file: ${error.response?.data?.message || error.message}`
      );
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(data) {
    const payload = {
      academic: {
        school_origin: data.sekolahAsal,
        graduation_status: data.statusKelulusan,
        last_certificate: data.ijazahTerakhir,
        study_program: data.programStudi,
        certification_file: data.fileSertifikat || null,
        graduation_letter_file: data.fileSuratKelulusan || null,
        transcript_file: data.fileTranskrip || null,
        national_exam_file: data.fileUjianNasional || null,
        selection_test_file: data.fileTesSeleksi || null,
      },
    };

    storeMutation.mutate(payload);
  }

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
          <h2 className="text-lg sm:text-xl font-semibold">Data Akademik</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-6 md:p-8 lg:p-12 border rounded-xl mx-4 sm:mx-6 md:mx-8 lg:mx-12 bg-[var(--light-cream)]">
              <FormField
                control={form.control}
                name="sekolahAsal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sekolah Asal</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama sekolah asal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="statusKelulusan"
                    render={({ field }) => (
                      <FormItem className={"w-full"}>
                        <FormLabel>Status Kelulusan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih status kelulusan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="graduated">
                              Sudah Lulus
                            </SelectItem>
                            <SelectItem value="not_graduated">
                              Belum Lulus
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="ijazahTerakhir"
                    render={({ field }) => (
                      <FormItem className={"w-full"}>
                        <FormLabel>Ijazah Terakhir</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih ijazah terakhir" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sma">SMA</SelectItem>
                            <SelectItem value="smk">SMK</SelectItem>
                            <SelectItem value="ma">MA</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="programStudi"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>Program Studi</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih program studi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="teknik-informatika">Teknik Informatika</SelectItem>
                          <SelectItem value="sistem-informasi">Sistem Informasi</SelectItem>
                          <SelectItem value="manajemen">Manajemen</SelectItem>
                          <SelectItem value="akuntansi">Akuntansi</SelectItem>
                          <SelectItem value="psikologi">Psikologi</SelectItem>
                          <SelectItem value="desain-grafis">Desain Grafis</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="font-semibold text-base">Upload Dokumen</h3>
                <p className="text-sm text-gray-600">
                  Format file: PDF, JPG, PNG (Max 5MB)
                </p>

                <FormField
                  control={form.control}
                  name="fileSertifikat"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>File Ijazah / Sertifikat</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(
                                file,
                                "fileSertifikat"
                              );
                              onChange(url);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fileSuratKelulusan"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>File Surat Keterangan Lulus (SKL)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(
                                file,
                                "fileSuratKelulusan"
                              );
                              onChange(url);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fileTranskrip"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>File Transkrip Nilai / Rapor</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(
                                file,
                                "fileTranskrip"
                              );
                              onChange(url);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fileUjianNasional"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>File Nilai Ujian Nasional</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(
                                file,
                                "fileUjianNasional"
                              );
                              onChange(url);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fileTesSeleksi"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>File Hasil Tes Seleksi</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(
                                file,
                                "fileTesSeleksi"
                              );
                              onChange(url);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-end my-6 sm:my-8 md:my-10 lg:my-12 px-4 sm:px-6 md:px-8 lg:px-12">
              <Link href="/pendaftaran">
                <Button
                  type="button"
                  variant={"yellow"}
                  className={"w-full sm:w-48"}
                >
                  Kembali
                </Button>
              </Link>
              <Button
                type="submit"
                variant={"matcha"}
                className={"w-full sm:w-48"}
                disabled={storeMutation.isPending || isUploading}
              >
                {isUploading
                  ? "Mengupload..."
                  : storeMutation.isPending
                  ? "Menyimpan..."
                  : "Lanjut"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ProtectedRoute>
  );
}
