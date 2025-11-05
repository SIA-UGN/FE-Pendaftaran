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
import Link from "next/link"
import RegistrationProgress from "@/components/RegistrationProgress";

import { Card } from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import TextareaAutosize from "react-textarea-autosize"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { useState } from "react"

const MAX_FILE_SIZE = 5000000; 
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

const FormSchema = z.object({
  sekolahAsal: z.string().min(3, { message: "Nama sekolah asal wajib diisi." }),
  statusKelulusan: z.string({ required_error: "Status kelulusan harus dipilih." }),
  ijazahTerakhir: z.string({ required_error: "Ijazah terakhir harus dipilih." }),
  uploadIjazah: z.any()
    .refine((files) => files?.length == 1, "File ijazah wajib diupload.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`)
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Format file harus .pdf, .jpg, atau .png"),
  uploadSkl: z.any().optional(), 
  uploadTranskrip: z.any()
    .refine((files) => files?.length == 1, "File transkrip/rapor wajib diupload.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`),
  uploadUn: z.any()
    .refine((files) => files?.length == 1, "File nilai UN wajib diupload.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`),
  uploadSertifikat: z.any().optional(), 
});

export default function DataAkademik() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sekolahAsal: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    alert("You submitted the following values:\n" + JSON.stringify(data, null, 2));
  }

  return (
    <>
      <div className="mx-12 mt-6 grid grid-cols-1 gap-12">
                
        <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-[var(--light-cream)] justify-between">
            <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
                <h2 className="font-bold text-xl">Faradis Yulianto</h2>
                <h3 className="text-gray-500">@faradisy20</h3>
                <p className="text-gray-500">faradisy20@gmail.com</p>
            </div>
            <Button variant={"yellow"}>
                Pending   
            </Button>  
        </Card>
        
        <div className="flex items-center gap-2 pb-0">
                <CheckCircle className="text-green-500" />
                <h2 className="text-xl font-semibold">Data Akademik</h2>
                </div>
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
                  <Input placeholder="Nama sekolah asal" {...field} readOnly/>
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
                <FormItem>
                <FormLabel>Status Kelulusan</FormLabel>
                <FormControl>
                  <Input placeholder="Sudah Lulus" {...field} readOnly/>
                </FormControl>
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
                <FormItem>
                <FormLabel>Ijazah Terakhir</FormLabel>
                <FormControl>
                  <Input placeholder="SMA" {...field} readOnly/>
                </FormControl>
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
                            <FormLabel>ijazah Terakhir</FormLabel>
                            <FormControl>
                                <Button asChild variant={"outline"}>
                                <a href="/uploads/kk.pdf" download>
                                    Unduh Ijazah Terakhir
                                </a>
                                </Button>
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
                            <FormLabel>SKL</FormLabel>
                            <FormControl>
                                <Button asChild variant={"outline"}>
                                <a href="/uploads/kk.pdf" download>
                                    Unduh SKL
                                </a>
                                </Button>
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
                            <FormLabel>Tranksrip Nilai</FormLabel>
                            <FormControl>
                                <Button asChild variant={"outline"}>
                                <a href="/uploads/kk.pdf" download>
                                    Unduh Tranksrip Nilai
                                </a>
                                </Button>
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
                            <FormLabel>Ujian Nasional</FormLabel>
                            <FormControl>
                                <Button asChild variant={"outline"}>
                                <a href="/uploads/kk.pdf" download>
                                    Unduh Nilai Ujian Nasional
                                </a>
                                </Button>
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
                            <FormLabel>Sertifikat/ Surat Rekomendasi</FormLabel>
                            <FormControl>
                                <Button asChild variant={"outline"}>
                                <a href="/uploads/kk.pdf" download>
                                    Unduh Sertifikat/Surat Rekomendasi
                                </a>
                                </Button>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
            )}
          />

          </div>
          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
                        <Button variant={"green"}>
                            Kembali
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="matcha">Lanjut</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Verifikasi Identitas Pendaftar</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah data yang dimasukkan sudah benar atau lengkap?
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setShowCancelDialog(true)}>Tidak</AlertDialogCancel>
                                    <Link href="/manager/verification/data-prestasi">
                                        <AlertDialogAction>Ya</AlertDialogAction> 
                                    </Link>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Catatan Perubahan</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tuliskan catatan untuk pendaftar untuk perbaikan data
                            </AlertDialogDescription>
                            <div className="grid w-10/12 sm:w-full gap-6">
                                <InputGroup>
                                    <TextareaAutosize
                                    data-slot="input-group-control"
                                    className="flex field-sizing-content min-h-32 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                                    placeholder="Autoresize textarea..."
                                    />
                                    <InputGroupAddon align="block-end">
                                </InputGroupAddon>
                                </InputGroup>
                            </div>
                            </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Link href="/manager/verification/data-prestasi">
                                        <AlertDialogAction onClick={() => setShowCancelDialog(false)}>
                                            Simpan
                                        </AlertDialogAction>
                                    </Link>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </div>
        </form>
      </Form>
    </>
  );
}