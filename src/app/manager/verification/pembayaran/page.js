"use client";

import { useSearchParams } from "next/navigation";

import { Info, AlertCircle, XCircle, CheckCircle, Eye } from "lucide-react";
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
import RegistrationProgress from "@/components/registrations/RegistrationProgress";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import {
  useManagerPaymentVerification,
  useVerifyApplicant,
  useManagerVerifyPayment,
} from "@/hooks/useManager";

const FormSchema = z.object({
  rekening: z.string({
    required_error: "Silakan pilih rekening tujuan pembayaran.",
  }),
  buktiBayar: z
    .any()
    .refine((files) => files?.length == 1, "Bukti pembayaran wajib di-upload.")
    .refine((files) => files?.[0]?.size <= 5000000, `Ukuran file maksimal 5MB.`)
    .refine(
      (files) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(
          files?.[0]?.type
        ),
      "Format file harus .pdf, .jpg, atau .png"
    ),
});

import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Heading } from "@/components/Heading";

export default function Pembayaran() {
  const router = useRouter();

  const { mutate: setPaymentStatus, isLoading: isPaymentLoading } =
    useManagerVerifyPayment();

  const { mutate: setRegistrationStatus, isLoading: isRegistrationLoading } =
    useVerifyApplicant();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const payment_id = searchParams.get("payment_id");

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaymentRejectDialog, setShowPaymentRejectDialog] = useState(false);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [showRegistrationActionDialog, setShowRegistrationActionDialog] =
    useState(false);
  const [showRevisionDialog, setShowRevisionDialog] = useState(false);
  const [paymentRejectionNote, setPaymentRejectionNote] = useState("");
  const [openProof, setOpenProof] = useState(false);

  console.log(id);
  const { data, isLoading, isError, error } =
    useManagerPaymentVerification(payment_id);

  if (isLoading) return <div>Loading payment...</div>;
  if (isError) return <div>Error loading payment: {error.message}</div>;

  console.log(data);

  const paymentData = data.data.data;

  console.log(paymentData);

  const handleRegistration = async (statusType, note = "") => {
    const payload = {
      id: Number(id),
      data: {
        status: statusType,
        ...(note && { notes: note }),
      },
    };

    console.log("Sending Registration:", payload);

    await setRegistrationStatus(payload);
  };

  const handlePayment = async (statusType, note = "") => {
    const payload = {
      id: Number(payment_id),
      data: {
        status: statusType,
        ...(note && { verification_notes: note }),
      },
    };

    console.log("Sending Payment:", payload);

    await setPaymentStatus(payload);
  };

  return (
    <div className="w-full w-max-6xl px-6 md:px-12">
      <Heading title="Pembayaran" />
      <Heading title={"Rincian Pembayaran"} />
      <Card className={"mx-0 md:mx-12 p-6 gap-0"}>
        <h1 className="font-bold text-lg text-[var(--green)] mb-4">
          Ringkasan Pembayaran
        </h1>
        <div className="ms-6 gap-4">
          <p>{paymentData.user_info.name}</p>
          <p>{paymentData.user_info.registration_number}</p>
          <p>{paymentData.payment_summary.amount}</p>
          <p>{paymentData.payment_summary.payment_method}</p>
        </div>
      </Card>

      <Heading title="Bukti Pembayaran" />
      <div className="mx-0 md:mx-12 items-center flex justify-center">
        <Dialog open={openProof} onOpenChange={setOpenProof}>
          <DialogTrigger asChild>
            <Button variant={"green"} className={"w-full"} type="button">
              <Eye className="w-4 h-4 mr-2" />
              Lihat Bukti Pembayaran
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Bukti Pembayaran</DialogTitle>
              <DialogDescription>
                Dokumen bukti pembayaran pendaftar
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center p-4">
              <img
                src={`/${paymentData.payment_proof.download_url}`}
                alt="Bukti Pembayaran"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Heading title="Validation Notes" />
      <Form {...form}>
        <div className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl mx-0 md:mx-12 bg-[var(--light-cream)]">
            {paymentData.validation_notes}
          </div>
          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
            <Link href="/manager/verification">
              <Button variant={"green"}>Kembali</Button>
            </Link>

            {/* Dialog 1: Verifikasi Pembayaran */}
            <AlertDialog
              open={showPaymentDialog}
              onOpenChange={setShowPaymentDialog}
            >
              <AlertDialogTrigger asChild>
                <Button variant="matcha">Lanjut</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Verifikasi Pembayaran</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah bukti pembayaran sudah sesuai dan valid?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setShowPaymentDialog(false);
                      setShowPaymentRejectDialog(true);
                    }}
                    disabled={isPaymentLoading}
                  >
                    Tidak
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isPaymentLoading}
                    onClick={async () => {
                      await handlePayment(
                        "verified",
                        "Pembayaran Anda telah terverifikasi!"
                      );
                      setShowPaymentDialog(false);
                      setShowRegistrationDialog(true);
                    }}
                  >
                    Ya, Sesuai
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Dialog 2: Input Pesan Penolakan Pembayaran */}
            <AlertDialog
              open={showPaymentRejectDialog}
              onOpenChange={setShowPaymentRejectDialog}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Alasan Penolakan Pembayaran
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Masukkan alasan mengapa pembayaran tidak sesuai
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="my-4">
                  <TextareaAutosize
                    className="w-full min-h-24 p-3 border rounded-md resize-none"
                    placeholder="Contoh: Nominal pembayaran tidak sesuai, bukti pembayaran tidak jelas, dll..."
                    value={paymentRejectionNote}
                    onChange={(e) => setPaymentRejectionNote(e.target.value)}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setPaymentRejectionNote("");
                      setShowPaymentRejectDialog(false);
                    }}
                  >
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isPaymentLoading || !paymentRejectionNote.trim()}
                    onClick={async () => {
                      await handlePayment("rejected", paymentRejectionNote);
                      setShowPaymentRejectDialog(false);
                      setShowRegistrationDialog(true);
                    }}
                  >
                    Lanjut ke Verifikasi Pendaftaran
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Dialog 3: Verifikasi Pendaftaran */}
            <AlertDialog
              open={showRegistrationDialog}
              onOpenChange={setShowRegistrationDialog}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Verifikasi Data Pendaftaran
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah data pendaftaran yang dimasukkan sudah benar dan
                    lengkap?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setShowRegistrationDialog(false);
                      setShowRegistrationActionDialog(true);
                    }}
                    disabled={isRegistrationLoading}
                  >
                    Tidak Sesuai
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isRegistrationLoading}
                    onClick={async () => {
                      await handleRegistration(
                        "approved",
                        "Selamat! Pendaftaran Anda telah disetujui."
                      );
                      setShowRegistrationDialog(false);
                      router.push(`/manager/verification?id=${id}`);
                    }}
                  >
                    Ya, Sesuai
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Dialog 3.5: Pilih Tolak atau Revisi */}
            <AlertDialog
              open={showRegistrationActionDialog}
              onOpenChange={setShowRegistrationActionDialog}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Pilih Tindakan</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda ingin menolak pendaftaran atau meminta revisi
                    data?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={async () => {
                      await handleRegistration(
                        "rejected",
                        "Mohon maaf, pendaftaran Anda ditolak."
                      );
                      setShowRegistrationActionDialog(false);
                      router.push(`/manager/verification?id=${id}`);
                    }}
                    disabled={isRegistrationLoading}
                  >
                    Tolak Pendaftaran
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setShowRegistrationActionDialog(false);
                      setShowRevisionDialog(true);
                    }}
                    disabled={isRegistrationLoading}
                  >
                    Minta Revisi
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Dialog 4: Catatan Revisi Pendaftaran */}
            <AlertDialog
              open={showRevisionDialog}
              onOpenChange={setShowRevisionDialog}
            >
              <AlertDialogContent className="max-h-[85vh] overflow-y-auto w-[95vw] sm:w-full">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Catatan Revisi Pendaftaran
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tambahkan catatan revisi untuk setiap bagian data pendaftar
                    yang perlu diperbaiki.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="w-full mt-4">
                  <Accordion type="multiple" className="w-full">
                    {[
                      {
                        key: "identity",
                        label: "Catatan Identitas Pendaftar",
                        heading: "Data Diri",
                      },
                      {
                        key: "address",
                        label: "Catatan Alamat Pendaftar",
                        heading: "Alamat",
                      },
                      {
                        key: "parents",
                        label: "Catatan Data Orang Tua",
                        heading: "Data Orang Tua",
                      },
                      {
                        key: "academic",
                        label: "Catatan Data Akademik",
                        heading: "Data Akademik",
                      },
                      {
                        key: "achievement",
                        label: "Catatan Prestasi",
                        heading: "Prestasi",
                      },
                      {
                        key: "payment",
                        label: "Catatan Pembayaran",
                        heading: "Pembayaran",
                      },
                    ].map((item) => (
                      <AccordionItem key={item.key} value={item.key}>
                        <AccordionTrigger>{item.label}</AccordionTrigger>
                        <AccordionContent>
                          <TextareaAutosize
                            id={`notes-${item.key}`}
                            data-heading={item.heading}
                            className="w-full min-h-24 mt-2 p-3 border rounded-md resize-none"
                            placeholder={`Tulis ${item.label.toLowerCase()}...`}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setShowRevisionDialog(false)}
                  >
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isRegistrationLoading}
                    onClick={async () => {
                      const sections = [
                        { key: "identity", heading: "Data Diri" },
                        { key: "address", heading: "Alamat" },
                        { key: "parents", heading: "Data Orang Tua" },
                        { key: "academic", heading: "Data Akademik" },
                        { key: "achievement", heading: "Prestasi" },
                        { key: "payment", heading: "Pembayaran" },
                      ];

                      const notes = sections
                        .map((section) => {
                          const textarea = document.querySelector(
                            `#notes-${section.key}`
                          );
                          const value = textarea?.value?.trim();

                          if (value) {
                            return `**${section.heading}**: ${value}`;
                          }
                          return null;
                        })
                        .filter(Boolean)
                        .join("\n\n");

                      console.log("Notes collected:", notes);

                      if (notes) {
                        await handleRegistration("revision_needed", notes);
                      }

                      setShowRevisionDialog(false);
                      router.push(`/manager/verification?id=${id}`);
                    }}
                  >
                    Simpan dan Kirim Revisi
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Form>
    </div>
  );
}
