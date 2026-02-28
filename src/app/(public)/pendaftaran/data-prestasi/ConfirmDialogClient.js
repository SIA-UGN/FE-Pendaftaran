"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";


export default function ConfirmDialogClient() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  return (
    <>
      {/* Dialog Pertama */}
      <AlertDialog open={firstOpen} onOpenChange={setFirstOpen}>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="matcha" className="w-sm">
            Konfirmasi Data
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Data</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin semua data yang diisi sudah benar? Setelah
              dikonfirmasi, Anda tidak dapat mengubah data ini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button
              variant="primary"
              onClick={() => {
                setFirstOpen(false);
                setTimeout(() => setSecondOpen(true), 200);
              }}
            >
              Ya, Konfirmasi
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog Kedua */}
      <AlertDialog open={secondOpen} onOpenChange={setSecondOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pendaftaran</AlertDialogTitle>
            <AlertDialogDescription>
              Terima kasih telah mendaftar sebagai calon mahasiswa, berikut
              nomor peserta anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div
            className="p-4 font-bold text-lg text-center"
            style={{ backgroundColor: '#E6EEE9', borderRadius: '12px', color: '#015023' }}
          >
            140072569877
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSecondOpen(false)}>
              Kembali
            </AlertDialogCancel>
            <Link href="/pendaftaran/pembayaran">
              <Button variant="yellow" className={"rounded-lg"}>
                Tutup
              </Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

