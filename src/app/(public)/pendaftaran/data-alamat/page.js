"use client"; // <-- Wajib ada untuk menggunakan hooks

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import  Link  from "next/link"

// Validasi untuk file upload
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

// Skema Zod disesuaikan dengan semua field form
const FormSchema = z.object({
  sekolahAsal: z.string().min(3, { message: "Nama sekolah asal wajib diisi." }),
  statusKelulusan: z.string({ required_error: "Status kelulusan harus dipilih." }),
  ijazahTerakhir: z.string({ required_error: "Ijazah terakhir harus dipilih." }),
  uploadIjazah: z.any()
    .refine((files) => files?.length == 1, "File ijazah wajib diupload.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`)
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Format file harus .pdf, .jpg, atau .png"),
  uploadSkl: z.any().optional(), // Opsional
  uploadTranskrip: z.any()
    .refine((files) => files?.length == 1, "File transkrip/rapor wajib diupload.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`),
  uploadUn: z.any()
    .refine((files) => files?.length == 1, "File nilai UN wajib diupload.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`),
  uploadSertifikat: z.any().optional(), // Opsional
});

export default function DataAkademik() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sekolahAsal: "",
      // default value untuk file upload bisa dikosongkan
    },
  });

  function onSubmit(data) {
    // Fungsi 'toast' diganti dengan console.log dan alert standar
    console.log(data);
    alert("You submitted the following values:\n" + JSON.stringify(data, null, 2));
  }

  return (
    <>
    <div className="flex items-center gap-2 m-12 mt-6 pt-12">
                <CheckCircle className="text-green-500" />
                <h2 className="text-xl font-semibold">Data Akademik</h2>
    </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="statusKelulusan"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Status Kelulusan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

          {/* Semua input file dibungkus dengan FormField */}
          <FormField
            control={form.control}
            name="uploadIjazah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Ijazah Terakhir</FormLabel>
                <FormControl>
                  <Input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={(e) => field.onChange(e.target.files)} />
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
                  <Input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={(e) => field.onChange(e.target.files)} />
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
                <FormLabel>Upload Transkrip Nilai / Rapor 1 Tahun Terakhir</FormLabel>
                <FormControl>
                  <Input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={(e) => field.onChange(e.target.files)} />
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
                  <Input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={(e) => field.onChange(e.target.files)} />
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
                <FormLabel>Upload Sertifikat / Surat Rekomendasi (Opsional)</FormLabel>
                <FormControl>
                  <Input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={(e) => field.onChange(e.target.files)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          </div>
          <div className="w-full flex items-center justify-end my-12 px-12">
                        <Link href="/pendaftaran/data-prestasi" className="w-48"><Button type="submit" variant={"matcha"} className={"w-full"}>Lanjut</Button></Link>
                    </div>
        </form>
      </Form>
    </>
  );
}