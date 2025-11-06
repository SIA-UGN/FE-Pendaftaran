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
import RegistrationProgress from "@/components/RegistrationProgress";
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

import { Loader2 } from "lucide-react";

import { useState } from "react";

export default function Pembayaran() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setSuccess(false);

    // Simulasikan upload (misal ke API)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000); // 2 detik loading
  };

  const FormSchema = z.object({
    rekening: z.string({
      required_error: "Silakan pilih rekening tujuan pembayaran.",
    }),
    buktiBayar: z
      .any()
      .refine(
        (files) => files?.length == 1,
        "Bukti pembayaran wajib di-upload."
      )
      .refine(
        (files) => files?.[0]?.size <= 5000000,
        `Ukuran file maksimal 5MB.`
      )
      .refine(
        (files) =>
          ["application/pdf", "image/jpeg", "image/png"].includes(
            files?.[0]?.type
          ),
        "Format file harus .pdf, .jpg, atau .png"
      ),
  });

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
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-5">
        <RegistrationProgress />
        <div className="w-10/12 mx-auto">
          <div className="flex items-center gap-2 m-12 mt-6">
            <CheckCircle className="text-green-500" />
            <h2 className="text-xl font-semibold">Rincian Pembayaran</h2>
          </div>
          <Card className={"flex flex-col gap-3 p-4 w-10/12 mx-auto"}>
            <p className="font-bold text-lg text-[var(--green)]">
              Ringkasan Pembayaran
            </p>
            <p>Faradis Yulianto</p>
            <p>1234567890</p>
            <p>Rp 300.000,-</p>
          </Card>
          <Card
            className={
              "flex items-center justify-center p-4 w-10/12 mx-auto font-bold text-xl"
            }
          >
            30:21:22
          </Card>

          <div className="flex items-center gap-2 m-12 mt-6">
            <CheckCircle className="text-green-500" />
            <h2 className="text-xl font-semibold">Transfer Bank</h2>
          </div>
          <Card className={"w-10/12 mx-auto font-bold p-4"}>Transfer Bank</Card>
          <div className="flex items-center gap-2 m-12 mt-6">
            <CheckCircle className="text-green-500" />
            <h2 className="text-xl font-semibold">Pembayaran Cek</h2>
          </div>
          <Card className={"w-10/12 mx-auto font-bold p-4"}>
            Pembayaran Cek
          </Card>
          <div className="flex m-12 gap-5 items-center flex-row-reverse">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="green"
                  className="w-sm cursor-pointer"
                >
                  Konfirmasi Pembayaran
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                {/* === State Normal === */}
                {!loading && !success && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
                      <AlertDialogDescription>
                        Silahkan upload bukti pembayaran anda!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input id="picture" type="file" className="my-2" />
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <Button variant="green" onClick={handleConfirm}>
                        Continue
                      </Button>
                    </AlertDialogFooter>
                  </>
                )}

                {/* === State Loading === */}
                {loading && !success && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Loader2 className="w-8 h-8 text-green-500 animate-spin mb-3" />
                    <p className="text-sm text-gray-600">
                      Mengunggah bukti pembayaran...
                    </p>
                  </div>
                )}

                {/* === State Sukses === */}
                {success && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
                    <p className="text-sm text-gray-700 mb-2">
                      Pembayaran berhasil dikonfirmasi!
                    </p>
                    <Link href="/pendaftaran/status">
                      <Button variant="green" className="mt-2">
                        Lanjutkan
                      </Button>
                    </Link>
                  </div>
                )}
              </AlertDialogContent>
            </AlertDialog>

            <Link href="/pendaftaran" className="w-sm">
              <Button type="button" variant="yellow" className="w-full">
                Kembali Ke Tahap Pendaftaran
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
