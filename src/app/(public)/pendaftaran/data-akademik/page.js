"use client";

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import RegistrationProgress from "@/components/RegistrationProgress";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const FormSchema = z.object({
  sekolahAsal: z.string().min(3, { message: "Nama sekolah asal wajib diisi." }),
  statusKelulusan: z.string({
    required_error: "Status kelulusan harus dipilih.",
  }),
  ijazahTerakhir: z.string({
    required_error: "Ijazah terakhir harus dipilih.",
  }),
  uploadIjazah: z
    .any()
    .refine((files) => files?.length == 1, "File ijazah wajib diupload.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 5MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Format file harus .pdf, .jpg, atau .png"
    ),
  uploadSkl: z.any().optional(),
  uploadTranskrip: z
    .any()
    .refine(
      (files) => files?.length == 1,
      "File transkrip/rapor wajib diupload."
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 5MB.`
    ),
  uploadUn: z
    .any()
    .refine((files) => files?.length == 1, "File nilai UN wajib diupload.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 5MB.`
    ),
  uploadSertifikat: z.any().optional(),
});

export default function DataAkademik() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sekolahAsal: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    alert(
      "You submitted the following values:\n" + JSON.stringify(data, null, 2)
    );
  }

  return (
    <>
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
                            <SelectItem value="sudah">Sudah Lulus</SelectItem>
                            <SelectItem value="belum">Belum Lulus</SelectItem>
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
                            <SelectItem value="lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="uploadIjazah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Ijazah Terakhir</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uploadSkl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload SKL (jika ijazah belum keluar)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uploadTranskrip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload Transkrip Nilai / Rapor 1 Tahun Terakhir
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uploadUn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Nilai Ujian Nasional</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uploadSertifikat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload Sertifikat / Surat Rekomendasi (Opsional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center justify-end my-6 sm:my-8 md:my-10 lg:my-12 px-4 sm:px-6 md:px-8 lg:px-12">
              <Link href="/pendaftaran">
                <Button
                  type="submit"
                  variant={"yellow"}
                  className={"w-full sm:w-48"}
                >
                  Kembali
                </Button>
              </Link>
              <Link
                href="/pendaftaran/data-prestasi"
                className="w-full sm:w-48"
              >
                <Button type="submit" variant={"matcha"} className={"w-full"}>
                  Lanjut
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
