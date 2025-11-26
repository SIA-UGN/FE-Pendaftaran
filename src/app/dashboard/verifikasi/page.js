"use client";

import { useSearchParams } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import { IdCard, UserRound, WalletMinimal, ImageIcon } from "lucide-react";
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
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import Image from "next/image";
import { usePaymentVerification } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";

export default function Keuangan() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [openFirst, setOpenFirst] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openBukti, setOpenBukti] = useState(false);

  const {
    data: paymentData,
    isLoading,
    isError,
    error,
  } = usePaymentVerification(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const data = paymentData?.data;

  console.log(data);

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-6 sm:my-8 lg:my-12 w-full gap-3">
      <Card className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-md bg-[var(--light-cream)] justify-between items-start sm:items-center">
        <div className="flex flex-col w-full sm:w-2/3 space-y-1">
          <h2 className="font-bold text-lg sm:text-xl">
            {data.data.user.name}
          </h2>
          <h3 className="text-gray-500 text-sm sm:text-base">
            {data.data.user.registration_number}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            {data.data.user.email}
          </p>
        </div>
        <Button
          variant="yellow"
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          {data.status}
        </Button>
      </Card>

      <Heading title="Rincian Pembayaran" />
      <Card className="w-full flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 rounded-xl shadow-md bg-[var(--light-cream)]">
        <h3 className="font-semibold text-base sm:text-lg">
          Ringkasan Pembayaran
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-start">
            <UserRound className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base">
              Nama Pengguna: {data.data.payment_details.sender_name}
            </span>
          </div>
          <div className="flex gap-3 items-start">
            <IdCard className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base">
              Nomor Pendaftaran: {data.data.payment_details.registration_number}
            </span>
          </div>
          <div className="flex gap-3 items-start">
            <WalletMinimal className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base font-semibold">
              {data.data.payment_details.amount}
            </span>
          </div>
        </div>
      </Card>

      <Heading title="Bukti Pembayaran" />
      <AlertDialog open={openBukti} onOpenChange={setOpenBukti}>
        <AlertDialogTrigger asChild>
          <Card
            className="w-full flex flex-col items-center justify-center border-2 border-dashed border-white-400 cursor-pointer transition hover:bg-[var(--green)]/90"
            variant="green"
          >
            <div className="flex flex-col items-center gap-2 py-8 sm:py-10">
              <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-sm sm:text-base">
                Lihat Bukti Pembayaran
              </span>
            </div>
          </Card>
        </AlertDialogTrigger>

        <AlertDialogContent className="max-w-xl w-[90vw] sm:w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>Bukti Pembayaran</AlertDialogTitle>
            <AlertDialogDescription>
              Berikut adalah foto bukti pembayaran yang telah diunggah.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-center my-4">
            <Image
              src={data.data.payment.payment_proof_url}
              alt="Bukti Pembayaran"
              className="rounded-lg shadow-md object-contain w-full h-auto"
              width={400}
              height={400}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenBukti(false)}>
              Tutup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Heading title="Validation Notes" />
      <Card
        className="w-full items-center justify-center border-1 border-black p-4 sm:p-6 text-center"
        variant="yellow"
      >
        <p className="text-sm sm:text-base">Payment verified amount matches</p>
      </Card>

      <div className="w-full mt-6 sm:mt-8 lg:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full sm:w-auto sm:ml-auto">
          <Button
            variant="yellow"
            className="flex items-center justify-center gap-2 rounded-lg text-sm sm:text-base py-2 sm:py-3"
            onClick={() => router.back()}
          >
            Kembali
          </Button>

          <AlertDialog open={openFirst} onOpenChange={setOpenFirst}>
            <AlertDialogTrigger asChild>
              <Button
                variant="green"
                className="flex items-center justify-center gap-2 rounded-lg text-sm sm:text-base py-2 sm:py-3"
              >
                Verifikasi Keuangan
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90vw] sm:w-full max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Verifikasi</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin memverifikasi data keuangan ini?
                  Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel
                  onClick={() => setOpenCancel(true)}
                  className="w-full sm:w-auto"
                >
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => setOpenConfirm(true)}
                  className="w-full sm:w-auto"
                >
                  Ya, Verifikasi
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
            <AlertDialogContent className="w-[90vw] sm:w-full max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Selamat</AlertDialogTitle>
                <AlertDialogDescription>
                  Pembayaran pendaftar telah berhasil diverifikasi.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => setOpenConfirm(false)}
                  className="w-full sm:w-auto"
                >
                  Kembali
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={openCancel} onOpenChange={setOpenCancel}>
            <AlertDialogContent className="w-[90vw] sm:w-full max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Catatan Perubahan</AlertDialogTitle>
                <AlertDialogDescription>
                  Tuliskan perubahan untuk dokumen pendaftar
                </AlertDialogDescription>
              </AlertDialogHeader>

              <InputGroup className="my-4">
                <TextareaAutosize
                  data-slot="input-group-control"
                  className="flex field-sizing-content min-h-32 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-sm sm:text-base transition-[color,box-shadow] outline-none border border-gray-300"
                  placeholder="Masukkan catatan perubahan..."
                />
              </InputGroup>

              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => setOpenCancel(false)}
                  className="w-full sm:w-auto"
                >
                  Simpan
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
