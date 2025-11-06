"use client";

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const FormSchema = z.object({
  provinsi: z.string().min(1, { message: "Provinsi wajib diisi." }),
  kota: z.string().min(1, { message: "Kota / Kabupaten wajib diisi." }),
  kecamatan: z.string().min(1, { message: "Kecamatan wajib diisi." }),
  kelurahan: z.string().min(1, { message: "Kelurahan wajib diisi." }),
  kodePos: z
    .string()
    .min(5, { message: "Kode Pos minimal 5 digit." })
    .max(5, { message: "Kode Pos maksimal 5 digit." }),
  namaDusun: z.string().min(1, { message: "Nama Dusun wajib diisi." }),
  alamatLengkap: z
    .string()
    .min(10, { message: "Alamat Lengkap harus lebih detail." }),
});

export default function DataAlamat() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      provinsi: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
      kodePos: "",
      namaDusun: "",
      alamatLengkap: "",
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

        <div className="flex items-center gap-2 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-4 sm:mt-6 mb-12">
          <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-semibold">Data Alamat</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-6 md:p-8 lg:p-12 border rounded-xl mx-4 sm:mx-6 md:mx-8 lg:mx-12 bg-[var(--light-cream)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="provinsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <FormControl>
                        <Input placeholder="Provinsi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kota"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota / Kabupaten</FormLabel>
                      <FormControl>
                        <Input placeholder="Kota / Kabupaten" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kecamatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecamatan</FormLabel>
                      <FormControl>
                        <Input placeholder="Kecamatan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kelurahan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelurahan</FormLabel>
                      <FormControl>
                        <Input placeholder="Kelurahan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kodePos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Pos</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Kode Pos"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="namaDusun"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Dusun</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Dusun" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="alamatLengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Jl. Nama Jalan No. XX" {...field} />
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
                href="/pendaftaran/data-orangtua"
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
