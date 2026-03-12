"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { IdCard, UserRound, WalletMinimal, ImageIcon, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
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
import { InputGroup } from "@/components/ui/input-group";
import Image from "next/image";
import { usePaymentVerification, useVerifyPayment } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";

export default function Keuangan() {
  return (
    <Suspense fallback={null}>
      <KeuanganInner />
    </Suspense>
  );
}

function KeuanganInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [openFirst, setOpenFirst] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openBukti, setOpenBukti] = useState(false);
  const [rejectNotes, setRejectNotes] = useState("");

  const {
    data: paymentData,
    isLoading,
    isError,
    error,
  } = usePaymentVerification(id);

  const { mutate: verifyPayment, isLoading: isVerifying } = useVerifyPayment();

  const handleVerifyPayment = (status) => {
    const action =
      status === "verified" ? "verify" : status === "rejected" ? "reject" : status;
    verifyPayment(
      {
        id: Number(id),
        data: {
          action,
          ...(status === "rejected" && {
            notes: rejectNotes,
            rejection_reason: rejectNotes,
          }),
        },
      },
      {
        onSuccess: () => {
          setOpenFirst(false);
          setOpenConfirm(false);
          setOpenCancel(false);
          if (status === "verified") {
            setOpenConfirm(true);
          }
          setTimeout(() => {
            router.push("/dashboard/data");
          }, 1500);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl border p-6 animate-pulse" style={{ borderColor: '#E6EEE9' }}>
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) return (
    <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E6EEE9' }}>
      <p className="text-red-600">Error: {error.message}</p>
    </div>
  );

  const data = paymentData?.data?.data;

  return (
    <div className="space-y-6">
      {/* Applicant Info Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{data.applicant_name}</h2>
            <p className="text-sm text-gray-500">{data.registration_number}</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: data.status === 'verified' ? '#dcfce7' : data.status === 'rejected' ? '#fef2f2' : '#fef9c3',
              color: data.status === 'verified' ? '#166534' : data.status === 'rejected' ? '#991b1b' : '#854d0e'
            }}>
            {data.status}
          </span>
        </div>
      </div>

      {/* Payment Detail Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#015023' }}>Rincian Pembayaran</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <UserRound className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-500">Nama Pengguna:</span>
            <span className="font-medium text-gray-900">{data.sender_account_holder}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <IdCard className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-500">Nomor Pendaftaran:</span>
            <span className="font-medium text-gray-900">{data.registration_number}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <WalletMinimal className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-500">Jumlah:</span>
            <span className="font-semibold text-gray-900">{data.paid_amount}</span>
          </div>
        </div>
      </div>

      {/* Proof Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#015023' }}>Bukti Pembayaran</h3>
        <AlertDialog open={openBukti} onOpenChange={setOpenBukti}>
          <AlertDialogTrigger asChild>
            <div className="w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition hover:bg-gray-50 py-8" style={{ borderColor: '#E6EEE9' }}>
              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Lihat Bukti Pembayaran</span>
            </div>
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
                src={data.payment_proof_url}
                alt="Bukti Pembayaran"
                className="rounded-lg shadow-md object-contain w-full h-auto"
                width={400}
                height={400}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setOpenBukti(false)} className="rounded-xl">
                Tutup
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Validation Notes */}
      <div className="rounded-2xl border p-4 sm:p-6 text-center" style={{ backgroundColor: '#fef9c3', borderColor: '#fde68a' }}>
        <p className="text-sm font-medium" style={{ color: '#854d0e' }}>Payment verified amount matches</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" className="rounded-xl px-6" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <AlertDialog open={openFirst} onOpenChange={setOpenFirst}>
          <AlertDialogTrigger asChild>
            <Button className="rounded-xl px-6 text-white" style={{ backgroundColor: '#015023' }}>
              <CheckCircle className="w-4 h-4 mr-2" />
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
                onClick={() => { setOpenFirst(false); setOpenCancel(true); }}
                className="w-full sm:w-auto rounded-xl"
              >
                Tolak
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => { setOpenFirst(false); handleVerifyPayment("verified"); }}
                className="w-full sm:w-auto rounded-xl"
                disabled={isVerifying}
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
              <AlertDialogAction onClick={() => setOpenConfirm(false)} className="w-full sm:w-auto rounded-xl">
                Kembali
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={openCancel} onOpenChange={setOpenCancel}>
          <AlertDialogContent className="w-[90vw] sm:w-full max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Catatan Penolakan</AlertDialogTitle>
              <AlertDialogDescription>
                Tuliskan alasan penolakan pembayaran
              </AlertDialogDescription>
            </AlertDialogHeader>
            <InputGroup className="my-4">
              <TextareaAutosize
                data-slot="input-group-control"
                className="flex field-sizing-content min-h-32 w-full resize-none rounded-xl bg-transparent px-3 py-2.5 text-sm transition-[color,box-shadow] outline-none border border-gray-200"
                placeholder="Masukkan alasan penolakan..."
                value={rejectNotes}
                onChange={(e) => setRejectNotes(e.target.value)}
              />
            </InputGroup>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => { setOpenCancel(false); setRejectNotes(""); }}
                className="w-full sm:w-auto rounded-xl"
              >
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleVerifyPayment("rejected")}
                disabled={!rejectNotes.trim() || isVerifying}
                className="w-full sm:w-auto rounded-xl"
              >
                Tolak Pembayaran
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

