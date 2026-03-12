"use client";

import { useState } from "react";
import { Info, CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";
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
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E6EEE9' }}>
            <Info className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: '#015023' }}>Pengingat</h2>
            <p className="text-sm text-gray-500">
              Pastikan data manajer baru sudah benar sebelum data disimpan dan
              sistem akan mengirimkan aktivasi akun melalui email manajer.
            </p>
          </div>
        </div>
      </div>

      {/* Validation Form Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6EEE9' }}>
            <ShieldCheck className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#015023' }}>Validasi Data Manajer Baru</h2>
            <p className="text-xs text-gray-400">Periksa kembali data sebelum menyimpan</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
            <Input placeholder="Nama Lengkap" readOnly value="John Doe" className="rounded-xl border-gray-200 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <Input placeholder="Username" readOnly value="johnmanager" className="rounded-xl border-gray-200 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <Input type="email" placeholder="email@example.com" readOnly value="john@example.com" className="rounded-xl border-gray-200 bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <Input type="password" readOnly value="081234567890" className="rounded-xl border-gray-200 bg-gray-50" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="outline" className="rounded-xl px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>

            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
              <AlertDialogTrigger asChild>
                <Button type="button" className="rounded-xl px-6 text-white" style={{ backgroundColor: '#015023' }}>
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
                  <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirm} className="rounded-xl">
                    Ya, Simpan
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
                  <AlertDialogAction onClick={() => setOpenSuccess(false)} className="w-32 rounded-xl">
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
