"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
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
import { useFileUpload } from "@/hooks/useFileUpload";
import { useAchievements } from "@/hooks/useAchievements";
import ProtectedRoute from "@/components/ProtectedRoute";

const FormSchema = z.object({
  uploadSertifikat: z.any().optional(),
  sertifikatFile: z.string().optional(),
  namaPrestasi: z
    .string()
    .min(3, { message: "Nama prestasi minimal 3 karakter" }),
  tahun: z.coerce
    .number()
    .min(2000, { message: "Tahun tidak valid" })
    .max(new Date().getFullYear(), {
      message: "Tahun tidak boleh lebih dari tahun sekarang",
    }),
  jenisPrestasi: z.string().min(1, { message: "Jenis prestasi wajib dipilih" }),
  tingkatPrestasi: z
    .string()
    .min(1, { message: "Tingkat prestasi wajib dipilih" }),
  penyelenggara: z
    .string()
    .min(3, { message: "Penyelenggara minimal 3 karakter" }),
  peringkat: z.string().min(1, { message: "Peringkat wajib diisi" }),
});

export default function InputData() {
  const router = useRouter();

  const { addAchievement, isSubmitting } = useAchievements();

  const { handleUpload, isUploading } = useFileUpload({
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      namaPrestasi: "",
      tahun: new Date().getFullYear(),
      jenisPrestasi: "",
      tingkatPrestasi: "",
      penyelenggara: "",
      peringkat: "",
      sertifikatFile: "",
    },
  });

  async function onSubmit(data) {
    const typeMap = {
      akademik: "academic",
      musik: "music",
      seni: "art",
      agama: "religion",
      olahraga: "sport",
      lainnya: "other",
    };

    const levelMap = {
      sekolah: "school",
      kecamatan: "regency",
      kabupaten: "regency",
      provinsi: "provincial",
      nasional: "national",
      internasional: "international",
    };

    const newAchievement = {
      achievement_name: data.namaPrestasi,
      year: data.tahun,
      type: typeMap[data.jenisPrestasi] || data.jenisPrestasi,
      level: levelMap[data.tingkatPrestasi] || data.tingkatPrestasi,
      organizer: data.penyelenggara,
      rank: data.peringkat,
      certificate_file: data.sertifikatFile || null,
    };

    try {
      await addAchievement(newAchievement);
      router.push("/pendaftaran/data-prestasi");
    } catch (error) {
      console.error("Failed to add achievement:", error);
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-6 pt-12">
          <CheckCircle className="text-green-500" />
          <h2 className="text-xl font-semibold">Tambah Data Prestasi</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
              <>
                <FormField
                  control={form.control}
                  name="uploadSertifikat"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        Upload Sertifikat Prestasi (Opsional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleUpload(
                                file,
                                "certificate"
                              );
                              if (url) {
                                form.setValue("sertifikatFile", url);
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
                  name="namaPrestasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Prestasi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Juara 1 Olimpiade Matematika"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tahun"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tahun</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jenisPrestasi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Prestasi</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis prestasi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="akademik">Akademik</SelectItem>
                            <SelectItem value="musik">Musik</SelectItem>
                            <SelectItem value="seni">Seni</SelectItem>
                            <SelectItem value="agama">Agama</SelectItem>
                            <SelectItem value="olahraga">Olahraga</SelectItem>
                            <SelectItem value="lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tingkatPrestasi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tingkat Prestasi</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tingkat prestasi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sekolah">Sekolah</SelectItem>
                            <SelectItem value="kecamatan">Kecamatan</SelectItem>
                            <SelectItem value="kabupaten">
                              Kabupaten/Kota
                            </SelectItem>
                            <SelectItem value="provinsi">Provinsi</SelectItem>
                            <SelectItem value="nasional">Nasional</SelectItem>
                            <SelectItem value="internasional">
                              Internasional
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="peringkat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peringkat</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contoh: Juara 1, Harapan 2"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="penyelenggara"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penyelenggara</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Kemdikbud, Pusat Bahasa"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </div>
            <div className="w-full flex items-center justify-end my-12 px-4 sm:px-6 md:px-8 lg:px-12 gap-4">
              <Link href="/pendaftaran/data-prestasi">
                <Button
                  type="button"
                  variant={"outline"}
                  className="w-full sm:w-48"
                >
                  Batal
                </Button>
              </Link>
              <Button
                type="submit"
                variant={"matcha"}
                className="w-full sm:w-48"
                disabled={isSubmitting || isUploading}
              >
                {isUploading
                  ? "Mengupload..."
                  : isSubmitting
                  ? "Menyimpan..."
                  : "Simpan Data"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ProtectedRoute>
  );
}
