"use client";

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import Link from 'next/link'
import RegistrationProgress from "@/components/RegistrationProgress";

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

import {Card} from "@/components/ui/card"

const FormSchema = z.object({
  rekening: z.string({
    required_error: "Silakan pilih rekening tujuan pembayaran.",
  }),
  buktiBayar: z.any()
    .refine((files) => files?.length == 1, "Bukti pembayaran wajib di-upload.")
    .refine((files) => files?.[0]?.size <= 5000000, `Ukuran file maksimal 5MB.`)
    .refine(
      (files) => ["application/pdf", "image/jpeg", "image/png"].includes(files?.[0]?.type),
      "Format file harus .pdf, .jpg, atau .png"
    ),
});

export default function Pembayaran() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    console.log(data);
    alert("You submitted the following values:\n" + JSON.stringify(data, null, 2));
  }

  return (
    <>
      <div className="flex items-center gap-2 mx-12 mt-6 pt-12  pb-0">
                <CheckCircle className="text-green-500" />
                <h2 className="text-xl font-semibold">Pembayaran</h2>
      </div>
      <h2 className="text-3xl sm:text-2xl font-semibold mt-12 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mx-12">Rincian Pembayaran</h2>
      <Card className={"mx-12 p-6 gap-0"}>
        <h1 className="font-bold text-lg text-[var(--green)] mb-4">Ringkasan Pembayaran</h1>
        <div className="ms-6 gap-4">
          <p>Nama Pengguna</p>
          <p>Nomor Pengguna</p>
          <p>Rp 300.000</p>
          <p>Metode Pembayaran</p>
        </div>
      </Card>

      <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mx-12">Bukti Pembayaran</h2>
      <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mx-12">Validation Notes</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">

          </div>
          <div className="flex ms-auto gap-5 mx-12">
          <Link href="/manager/verification/data-prestasi" className="ms-auto">
                  <Button
                    type="button"
                    variant="matcha"
                    className={"w-sm"}
                  > Batal
                  </Button>
            </Link>
            <Link href="/manager">
            <Button type="button"
                      variant="matcha"
                      className={"w-sm cursor-pointer"}>
                      Simpan
            </Button>
          </Link>
            </div>
        </form>
      </Form>
    </>
  );
}