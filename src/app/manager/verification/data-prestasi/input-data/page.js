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
import Prestasi from "@/components/prestasi/Prestasi";

const FormSchema = z.object({
  uploadSertifikat: z.any().optional(),
  namaPrestasi: z.string().optional(),
  tahun: z.coerce.number().optional(),
  jenisPrestasi: z.string().optional(),
  tingkatPrestasi: z.string().optional(),
  penyelenggara: z.string().optional(),
  peringkat: z.string().optional(),
});

export default function InputData() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      namaPrestasi: "",
      penyelenggara: "",
      peringkat: "",
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
      <div className="flex items-center gap-2 m-12 mt-6 pt-12">
        <CheckCircle className="text-green-500" />
        <h2 className="text-xl font-semibold">Data Prestasi</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
            <>
              <FormField
                control={form.control}
                name="uploadSertifikat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Sertifikat Prestasi (jika ada)</FormLabel>
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
          <div className="w-full flex items-center justify-end my-12 px-12">
            <Link href="/pendaftaran/data-prestasi" className="w-48">
              <Button type="submit" variant={"matcha"} className={"w-full"}>
                Simpan Data
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
