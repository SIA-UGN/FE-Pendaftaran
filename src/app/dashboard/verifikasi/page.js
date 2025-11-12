"use client";

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

export default function Keuangan() {
  const [openFirst, setOpenFirst] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openBukti, setOpenBukti] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 max-w-6xl mx-auto my-12 w-full">
        <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-[var(--light-cream)] justify-between">
          <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
            <h2 className="font-bold text-xl">Faradis Yulianto</h2>
            <h3 className="text-gray-500">@faradisy20</h3>
            <p className="text-gray-500">faradisy20@gmail.com</p>
          </div>
          <Button variant={"yellow"}>Pending</Button>
        </Card>

        <Heading title={"Rincian Pembayaran"} />
        <Card
          className={
            "w-full flex flex-col gap-6 p-8 rounded-xl shadow-md bg-[var(--light-cream)] justify-between"
          }
        >
          <h3>Ringkasan Pembayaran</h3>
          <div className="flex flex-col">
            <div className="flex gap-3">
              <UserRound />
              <span className="text-md">Nama Pengguna: </span>
            </div>
            <div className="flex gap-3">
              <IdCard />
              <span className="text-md">Nomor Pendaftaran: </span>
            </div>
            <div className="flex gap-3">
              <WalletMinimal />
              <span className="text-md">Rp500.000,-</span>
            </div>
          </div>
        </Card>

        <Heading title={"Bukti Pembayaran"} />

        {/* === BUKTI PEMBAYARAN CARD + DIALOG === */}
        <AlertDialog open={openBukti} onOpenChange={setOpenBukti}>
          <AlertDialogTrigger asChild>
            <Card
              className={
                "w-full flex flex-col items-center justify-center border-2 border-dashed border-white-400 cursor-pointer transition hover:bg-[var(--green)]/90"
              }
              variant="green"
            >
              <div className="flex flex-col items-center gap-2 py-10">
                <ImageIcon className="w-8 h-8 " />
                <span className="">Lihat Bukti Pembayaran</span>
              </div>
            </Card>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Bukti Pembayaran</AlertDialogTitle>
              <AlertDialogDescription>
                Berikut adalah foto bukti pembayaran yang telah diunggah.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex justify-center my-4">
              <Image
                src="/bukti-pembayaran.jpg" // Ganti dengan URL atau path gambar dinamis
                alt="Bukti Pembayaran"
                className="rounded-lg shadow-md object-contain"
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

        <Heading title={"Validation Notes"} />

        <Card
          className={"w-full items-center justify-center border-1 border-black"}
          variant="yellow"
        >
          Payment verified amount matches
        </Card>

        <div className="w-full mt-12">
          <div className="grid grid-cols-2 gap-3 ms-auto w-lg">
            <Button
              variant="yellow"
              className="flex items-center gap-2 rounded-lg"
            >
              Kembali
            </Button>

            {/* === DIALOG VERIFIKASI === */}
            <AlertDialog open={openFirst} onOpenChange={setOpenFirst}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="green"
                  className="flex items-center gap-2 rounded-lg"
                >
                  Verifikasi Keuangan
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Verifikasi</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin memverifikasi data keuangan ini?
                    Tindakan ini tidak dapat dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOpenCancel(true)}>
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => setOpenConfirm(true)}>
                    Ya, Verifikasi
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* === DIALOG BERHASIL === */}
            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Selamat</AlertDialogTitle>
                  <AlertDialogDescription>
                    Pembayaran pendaftar telah berhasil diverifikasi.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => setOpenConfirm(false)}>
                    Kembali
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* === DIALOG PEMBATALAN === */}
            <AlertDialog open={openCancel} onOpenChange={setOpenCancel}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Catatan Perubahan</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tuliskan perubahan untuk dokumen pendaftar
                    <InputGroup>
                      <TextareaAutosize
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-32 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                        placeholder="Autoresize textarea..."
                      />
                      <InputGroupAddon align="block-end"></InputGroupAddon>
                    </InputGroup>
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => setOpenCancel(false)}>
                    Kembali
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
}
