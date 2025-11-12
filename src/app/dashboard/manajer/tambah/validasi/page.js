"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, CheckCircle2 } from "lucide-react";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function TambahManajer() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleConfirm = () => {
    setOpenConfirm(false);
    setTimeout(() => {
      setOpenSuccess(true);
    }, 200); // memberi sedikit jeda agar transisi dialog terasa halus
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 🔹 Bagian Pengingat */}
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl mt-12 w-full">
        <Heading title={"Pendaftaran Manajer Baru"} />

        <Card
          className="
            rounded-lg shadow-md 
            flex flex-col sm:flex-row gap-4 
            p-4 sm:p-6 lg:p-8 
            w-full 
            bg-[var(--light-cream)] 
            border border-gray-300
          "
        >
          <CardContent className="flex flex-col gap-4 sm:gap-5 w-full p-0">
            <h2
              className="
                scroll-m-20 pb-2 border-b border-gray-500 
                text-2xl sm:text-3xl font-semibold tracking-tight 
                first:mt-0 flex items-center gap-2 text-gray-800
              "
            >
              <Info className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
              Pengingat
            </h2>

            <div className="pl-3 sm:pl-6 flex flex-col gap-2 sm:gap-3 text-gray-700">
              <p className="leading-7 flex items-start sm:items-center gap-2 text-sm sm:text-base">
                Pastikan data manajer baru sudah benar sebelum data disimpan dan
                sistem akan mengirimkan aktivasi akun melalui email manajer.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Bagian Validasi Data */}
      <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full">
        <Heading title={"Validasi Data Manajer Baru"} />

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 w-full">
          <div className="flex flex-col gap-5 p-6 sm:p-10 border rounded-xl bg-[var(--yellow)]">
            <div>
              <label className="block font-medium mb-1">Nama Lengkap</label>
              <Input placeholder="Nama Lengkap" readOnly value="John Doe" />
            </div>

            <div>
              <label className="block font-medium mb-1">Username</label>
              <Input placeholder="Username" readOnly value="johnmanager" />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <Input
                type="email"
                placeholder="email@example.com"
                readOnly
                value="john@example.com"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Password</label>
              <Input
                type="password"
                placeholder="08xxxxxxxx"
                readOnly
                value="081234567890"
              />
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-4">
            <Button
              type="button"
              variant={"yellow"}
              className="w-full sm:w-48 rounded-md"
            >
              Kembali
            </Button>

            {/* 🔸 Alert Dialog Pertama - Konfirmasi */}
            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant={"green"}
                  className="w-full sm:w-48 rounded-md"
                >
                  Konfirmasi
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Data</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin menyimpan data manajer baru ini?
                    Pastikan semua informasi sudah benar sebelum melanjutkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirm}>
                    Ya, Simpan
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* 🔸 Alert Dialog Kedua - Ucapan Selamat */}
            <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
              <AlertDialogContent className="max-w-md text-center">
                <AlertDialogHeader className="flex flex-col items-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mb-3" />
                  <AlertDialogTitle className="text-2xl font-semibold">
                    Selamat!
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base text-gray-600 mt-2">
                    Data manajer baru berhasil disimpan dan aktivasi akun telah
                    dikirim ke email yang terdaftar.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center">
                  <AlertDialogAction
                    onClick={() => setOpenSuccess(false)}
                    className="w-32"
                  >
                    Tutup
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </div>
    </div>
  );
}
