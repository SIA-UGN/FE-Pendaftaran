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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
          <FormField
            control={form.control}
            name="rekening"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pilih Rekening Pembayaran</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rekening tujuan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bca">BCA - 123456789 a/n Universitas</SelectItem>
                    <SelectItem value="bni">BNI - 987654321 a/n Universitas</SelectItem>
                    <SelectItem value="mandiri">Mandiri - 555222111 a/n Universitas</SelectItem>
                    <SelectItem value="bri">BRI - 111222333 a/n Universitas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buktiBayar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Bukti Pembayaran</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          </div>
          <div className="flex flex-col m-12 gap-5 items-center">
          <Button type="button"
                    variant="matcha"
                    className={"w-10/12 cursor-pointer"}>
          <AlertDialog>
            <AlertDialogTrigger>Konfirmasi Pembayaran</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
                <AlertDialogDescription>
                  Silahkan upload bukti pembayaran anda!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input id='picture' type='file'></Input>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </Button>
          <Link href="/manager" className={"w-10/12"}>
                  <Button
                    type="button"
                    variant="matcha"
                    className={"w-full"}
                  > Kembali Ke Tahap Pendaftaran
                  </Button>
                </Link>
            </div>
        </form>
      </Form>
    </>
  );
}