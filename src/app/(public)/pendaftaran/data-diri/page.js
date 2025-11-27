"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import {
  useRegistrationProgress,
  useStorePersonalIdentity,
} from "@/hooks/useRegistration";
import { uploadFile } from "@/services/uploadService";

const FormSchema = z.object({
  namaLengkap: z.string().min(2, {
    message: "Nama Lengkap harus memiliki setidaknya 2 karakter.",
  }),
  email: z.string().email({
    message: "Silakan masukkan alamat email yang valid.",
  }),
  jenisKelamin: z.string().min(1, { message: "Jenis Kelamin wajib diisi." }),
  agama: z.string().min(1, { message: "Agama wajib diisi." }),
  noPonsel: z.string().min(10, { message: "Nomor Ponsel tidak valid." }),
  tempatLahir: z.string().min(1, { message: "Tempat Lahir wajib diisi." }),
  tanggalLahir: z.string().min(1, { message: "Tanggal Lahir wajib diisi." }),
  nik: z.string().length(16, { message: "NIK harus 16 digit." }),
  ktp: z.any().optional(),
  ktpFile: z.string().optional(),
  noAkta: z.string().min(1, { message: "Nomor Akta wajib diisi." }),
  akta: z.any().optional(),
  aktaFile: z.string().optional(),
  noKK: z.string().length(16, { message: "Nomor KK harus 16 digit." }),
  kk: z.any().optional(),
  kkFile: z.string().optional(),
  kewarganegaraan: z
    .string()
    .min(1, { message: "Kewarganegaraan wajib diisi." }),
  anakKe: z.coerce.number().min(1, { message: "Anak ke berapa wajib diisi." }),
  jumlahSaudara: z.coerce
    .number()
    .min(0, { message: "Jumlah saudara wajib diisi." }),
});

export default function DataDiri() {
  const router = useRouter();
  const { data: progressData, isLoading: progressLoading } =
    useRegistrationProgress();
  const storeMutation = useStorePersonalIdentity();
  const [isUploading, setIsUploading] = useState(false);

  const progress = progressData?.data;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      namaLengkap: "",
      email: "",
      jenisKelamin: "",
      agama: "",
      noPonsel: "",
      tempatLahir: "",
      tanggalLahir: "",
      nik: "",
      ktpFile: "",
      noAkta: "",
      aktaFile: "",
      noKK: "",
      kkFile: "",
      kewarganegaraan: "",
      anakKe: "",
      jumlahSaudara: "",
    },
  });

  useEffect(() => {
    if (!progressLoading && progress) {
      const accessibleSteps = progress.accessible_steps || [];

      if (!accessibleSteps.includes(1)) {
        toast.error("Silakan selesaikan tahapan sebelumnya terlebih dahulu");
        router.push("/pendaftaran");
      }
    }
  }, [progress, progressLoading, router]);

  const handleFileUpload = async (file, type) => {
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
      const response = await uploadFile(file, type);

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
      profile: {
        full_name: data.namaLengkap,
        email: data.email,
        gender: data.jenisKelamin,
        religion: data.agama,
        phone: data.noPonsel,
        birth_place: data.tempatLahir,
        birth_date: data.tanggalLahir,
        nik_kitas: data.nik,
        ktp_kitas_file: data.ktpFile || null,
        birth_certificate_number: data.noAkta,
        birth_certificate_file: data.aktaFile || null,
        family_card_number: data.noKK,
        family_card_file: data.kkFile || null,
        citizenship: data.kewarganegaraan,
        child_number: parseInt(data.anakKe),
        siblings_count: parseInt(data.jumlahSaudara),
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

        <div className="flex items-center gap-2 mx-4 sm:mx-8 md:mx-12 mt-4 sm:mt-6 mb-12">
          <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-semibold">Data Diri</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-8 md:p-12 border rounded-xl mx-4 sm:mx-8 md:mx-12 bg-[var(--light-cream)]">
              <FormField
                control={form.control}
                name="namaLengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="jenisKelamin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Laki-laki</SelectItem>
                          <SelectItem value="female">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agama</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Agama" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="islam">Islam</SelectItem>
                          <SelectItem value="kristen">Kristen</SelectItem>
                          <SelectItem value="katolik">Katolik</SelectItem>
                          <SelectItem value="hindu">Hindu</SelectItem>
                          <SelectItem value="buddha">Buddha</SelectItem>
                          <SelectItem value="konghucu">Konghucu</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="noPonsel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomer Ponsel</FormLabel>
                      <FormControl>
                        <Input placeholder="08xxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tempatLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir</FormLabel>
                      <FormControl>
                        <Input placeholder="Tempat Lahir" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggalLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input placeholder="NIK" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="ktp"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>KTP / KITAS</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file, "ktp");
                            if (url) {
                              form.setValue("ktpFile", url);
                            }
                          }
                        }}
                        disabled={isUploading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noAkta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Registrasi Akta Lahir</FormLabel>
                    <FormControl>
                      <Input placeholder="Nomor Akta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="akta"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Akta Kelahiran</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file, "akta");
                            if (url) {
                              form.setValue("aktaFile", url);
                            }
                          }
                        }}
                        disabled={isUploading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noKK"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Kartu Keluarga</FormLabel>
                    <FormControl>
                      <Input placeholder="Nomor KK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kk"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Kartu Keluarga</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file, "kk");
                            if (url) {
                              form.setValue("kkFile", url);
                            }
                          }
                        }}
                        disabled={isUploading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kewarganegaraan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kewarganegaraan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kewarganegaraan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wni">WNI</SelectItem>
                        <SelectItem value="wna">WNA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="anakKe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anak ke Berapa</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jumlahSaudara"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Saudara Kandung</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-end my-8 sm:my-12 px-4 sm:px-8 md:px-12 gap-4">
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
