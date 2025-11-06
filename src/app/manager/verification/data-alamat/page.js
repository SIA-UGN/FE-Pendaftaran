"use client"; // <-- Ditambahkan agar bisa menggunakan hook 'useForm'

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

export default function DataAlamat() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const form = useForm({
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
          <h2 className="text-xl font-semibold">Data Alamat</h2>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="provinsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provinsi</FormLabel>
                    <FormControl>
                      <Input placeholder="Jawa Tengah" {...field} readOnly />
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
                      <Input
                        placeholder="Kabupaten Magelang"
                        {...field}
                        readOnly
                      />
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
                      <Input
                        placeholder="Kecamatan Salaman"
                        {...field}
                        readOnly
                      />
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
                      <Input placeholder="Ngadirejo" {...field} readOnly />
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
                        placeholder="56162"
                        {...field}
                        readOnly
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
                      <Input placeholder="Ngadirejo" {...field} readOnly />
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
                    <Input
                      placeholder="Jl. Nama Jalan No. 12"
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                  <Link href="/manager/verification/data-orangtua">
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
                  <Link href="/manager/verification/data-orangtua">
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
