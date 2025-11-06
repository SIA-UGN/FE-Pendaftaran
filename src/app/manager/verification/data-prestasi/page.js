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
  uploadSertifikat: z.any().optional(),
  namaPrestasi: z.string().optional(),
  tahun: z.coerce.number().optional(),
  jenisPrestasi: z.string().optional(),
  tingkatPrestasi: z.string().optional(),
  penyelenggara: z.string().optional(),
  peringkat: z.string().optional(),
});

export default function DataPrestasi() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  function onSubmit(data) {
    console.log(data);
    alert(
      "You submitted the following values:\n" + JSON.stringify(data, null, 2)
    );
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
          <Button variant={"yellow"}>Pending</Button>
        </Card>

        <div className="flex items-center gap-2 pb-0">
          <CheckCircle className="text-green-500" />
          <h2 className="text-xl font-semibold">Data Prestasi</h2>
        </div>
      </div>

      <Prestasi />

      <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
        <Button variant={"green"}>Kembali</Button>
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
              <Link href="/manager/verification/pembayaran">
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
                  <InputGroupAddon align="block-end"></InputGroupAddon>
                </InputGroup>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link href="/manager/verification/pembayaran">
                <AlertDialogAction onClick={() => setShowCancelDialog(false)}>
                  Simpan
                </AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
