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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";

import { Card } from "@/components/ui/card";

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
} from "@/components/ui/alert-dialog";
import TextareaAutosize from "react-textarea-autosize";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { useState } from "react";

const FormSchema = z.object({
  rekening: z.string({
    required_error: "Silakan pilih rekening tujuan pembayaran.",
  }),
  buktiBayar: z
    .any()
    .refine((files) => files?.length == 1, "Bukti pembayaran wajib di-upload.")
    .refine((files) => files?.[0]?.size <= 5000000, `Ukuran file maksimal 5MB.`)
    .refine(
      (files) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(
          files?.[0]?.type
        ),
      "Format file harus .pdf, .jpg, atau .png"
    ),
});

export default function Pembayaran() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    console.log(data);
    alert(
      "You submitted the following values:\n" + JSON.stringify(data, null, 2)
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 mx-12 mt-6 pt-12  pb-0">
        <CheckCircle className="text-green-500" />
        <h2 className="text-xl font-semibold">Pembayaran</h2>
      </div>
      <h2 className="text-3xl sm:text-2xl font-semibold mt-12 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mx-12">
        Rincian Pembayaran
      </h2>
      <Card className={"mx-12 p-6 gap-0"}>
        <h1 className="font-bold text-lg text-[var(--green)] mb-4">
          Ringkasan Pembayaran
        </h1>
        <div className="ms-6 gap-4">
          <p>Nama Pengguna</p>
          <p>Nomor Pengguna</p>
          <p>Rp 300.000</p>
          <p>Metode Pembayaran</p>
        </div>
      </Card>

      <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mx-12">
        Bukti Pembayaran
      </h2>
      <div className="mx-12 items-center flex justify-center">
        <Button variant={"green"} className={"w-full"}>
          <a href="/uploads/kk.pdf" download>
            Unduh Bukti Pembayaran
          </a>
        </Button>
      </div>

      <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mx-12">
        Validation Notes
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
            Payment Verified Amount Matches
          </div>
          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
            <Link href="/manager/verification">
              <Button variant={"green"}>Kembali</Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="matcha">Lanjut</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Verifikasi Identitas Pendaftar
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah data yang dimasukkan sudah benar atau lengkap?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setShowCancelDialog(true)}>
                    Tidak
                  </AlertDialogCancel>
                  <Link href="/manager/verification">
                    <AlertDialogAction>Ya</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
              open={showCancelDialog}
              onOpenChange={setShowCancelDialog}
            >
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
                      <InputGroupAddon align="block-end"></InputGroupAddon>
                    </InputGroup>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Link href="/manager/verification">
                    <AlertDialogAction
                      onClick={() => setShowCancelDialog(false)}
                    >
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
