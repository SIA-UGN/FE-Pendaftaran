"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import {
  CheckCircle, Clock, AlertCircle, XCircle, Info, Loader2,
  CreditCard, Shield, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import toast from "react-hot-toast";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useMyPayment } from "@/hooks/usePayment";
import { useCreateSnapToken } from "@/hooks/usePayment";
import {
  useMyRegistration,
  useSubmitRegistration,
} from "@/hooks/useRegistration";

export default function Pembayaran() {
  const router = useRouter();
  const {
    data: paymentResponse,
    isLoading,
    refetch: refetchPayment,
  } = useMyPayment();
  const { data: registrationData } = useMyRegistration();
  const submitRegistrationMutation = useSubmitRegistration();
  const createSnapTokenMutation = useCreateSnapToken();

  const paymentData = paymentResponse?.data?.data?.payment;
  const paymentStatus = paymentData?.status;
  const paymentMessage = paymentResponse?.data?.message;

  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [isSnapReady, setIsSnapReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [snapLoadError, setSnapLoadError] = useState(false);

  // Auto-submit registration if needed
  useEffect(() => {
    const autoSubmitRegistration = async () => {
      if (
        !isLoading &&
        !paymentData &&
        paymentMessage === "Selesaikan pendaftaran terlebih dahulu" &&
        !hasTriedSubmit
      ) {
        try {
          setHasTriedSubmit(true);
          await submitRegistrationMutation.mutateAsync();
          await refetchPayment();
          toast.success("Pendaftaran berhasil disubmit");
        } catch (error) {
          console.error("Failed to submit registration:", error);
          await refetchPayment();
        }
      }
    };
    autoSubmitRegistration();
  }, [isLoading, paymentData, paymentMessage, hasTriedSubmit, refetchPayment, submitRegistrationMutation]);

  // Countdown timer
  useEffect(() => {
    if (!paymentData?.deadline) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const deadline = new Date(paymentData.deadline).getTime();
      const distance = deadline - now;
      if (distance < 0) {
        setIsExpired(true);
        setCountdown("00:00:00");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(
        `${days > 0 ? days + "d " : ""}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [paymentData?.deadline]);

  // Handle Midtrans Snap payment
  const handlePayWithMidtrans = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const response = await createSnapTokenMutation.mutateAsync();
      const snapData = response?.data?.data;

      if (!snapData?.snap_token) {
        toast.error("Gagal mendapatkan token pembayaran");
        setIsProcessing(false);
        return;
      }

      if (!window.snap) {
        toast.error("Midtrans belum siap. Silakan muat ulang halaman.");
        setIsProcessing(false);
        return;
      }

      window.snap.pay(snapData.snap_token, {
        onSuccess: function (result) {
          console.log("Payment success:", result);
          toast.success("Pembayaran berhasil!");
          refetchPayment();
          setTimeout(() => router.push("/pendaftaran/status"), 2000);
        },
        onPending: function (result) {
          console.log("Payment pending:", result);
          toast.success("Pembayaran sedang diproses. Silakan selesaikan pembayaran.");
          refetchPayment();
        },
        onError: function (result) {
          console.error("Payment error:", result);
          toast.error("Pembayaran gagal. Silakan coba lagi.");
          refetchPayment();
        },
        onClose: function () {
          console.log("Payment popup closed");
          refetchPayment();
        },
      });
    } catch (error) {
      console.error("Snap token error:", error);
      toast.error(error.response?.data?.message || "Gagal memproses pembayaran");
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, createSnapTokenMutation, refetchPayment, router]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID").format(amount || 0);
  };

  // Loading state — matches data-diri / data-prestasi pattern
  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto p-12">
          <div className="animate-pulse">Memuat data pembayaran...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      {/* Midtrans Snap JS */}
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || "https://app.sandbox.midtrans.com/snap/snap.js"}
        data-client-key={paymentResponse?.data?.data?.payment?.snap_client_key || process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""}
        strategy="afterInteractive"
        onReady={() => setIsSnapReady(true)}
        onError={() => {
          console.error("Failed to load Midtrans Snap JS");
          setSnapLoadError(true);
        }}
      />

      <div className="max-w-7xl mx-auto">
        <RegistrationProgress />

        {/* Header — matches data-diri / data-prestasi pattern */}
        <div className="flex items-center gap-2 mx-4 sm:mx-8 md:mx-12 mt-4 sm:mt-6">
          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#015023' }} />
          <h2 className="text-lg sm:text-xl font-semibold">Pembayaran Pendaftaran</h2>
        </div>

        {/* Alerts — using built-in Alert variants */}
        <div className="mx-4 sm:mx-8 md:mx-12 mt-4 space-y-4">
          {/* Alert: no payment data */}
          {!paymentData && paymentMessage && hasTriedSubmit && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Informasi</AlertTitle>
              <AlertDescription>{paymentMessage}</AlertDescription>
            </Alert>
          )}

          {/* Alert: deadline warning */}
          {!isExpired && paymentStatus === "pending" && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Perhatian!</AlertTitle>
              <AlertDescription>
                Selesaikan pembayaran sebelum batas waktu habis. Jika melewati
                batas waktu, Anda harus mendaftar ulang.
              </AlertDescription>
            </Alert>
          )}

          {/* Alert: expired */}
          {isExpired && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Pembayaran Expired</AlertTitle>
              <AlertDescription>
                Batas waktu pembayaran telah habis. Silakan hubungi admin atau
                daftar ulang.
              </AlertDescription>
            </Alert>
          )}

          {/* Alert: rejected */}
          {paymentStatus === "rejected" && paymentData?.rejection_reason && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Pembayaran Ditolak</AlertTitle>
              <AlertDescription>
                Alasan: {paymentData.rejection_reason}
                <br />
                Silakan lakukan pembayaran ulang.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Main Content */}
        {paymentData && (
          <>
            {/* MODE 1: Payment Form (pending or rejected) */}
            {(paymentStatus === "pending" || paymentStatus === "rejected") && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 sm:mx-8 md:mx-12 mt-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Ringkasan Pembayaran */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ringkasan Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nama</span>
                        <span className="font-medium">
                          {paymentData?.applicant_name || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nomor Registrasi</span>
                        <span className="font-medium">
                          {paymentData?.registration_number || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Invoice</span>
                        <span className="font-medium font-mono">
                          {paymentData?.invoice_number || "-"}
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between">
                        <span className="text-muted-foreground">Biaya Pendaftaran</span>
                        <span className="font-bold text-xl" style={{ color: "#015023" }}>
                          Rp {formatCurrency(paymentData?.amount)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Countdown */}
                  {!isExpired && paymentStatus === "pending" && (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center">
                          <p className="text-muted-foreground mb-2">
                            Batas Waktu Pembayaran
                          </p>
                          <div className="text-4xl font-bold font-mono" style={{ color: '#BE0414' }}>
                            {countdown || "00:00:00"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Midtrans Info Card — using Card variant="sage" */}
                  <Card variant="sage">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Pembayaran Aman via Midtrans
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Berbagai Metode Pembayaran</p>
                            <p className="opacity-80">
                              Transfer Bank, E-Wallet (GoPay, OVO, Dana), QRIS,
                              Kartu Kredit/Debit, dan lainnya.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Transaksi Terenkripsi</p>
                            <p className="opacity-80">
                              Semua pembayaran diproses dengan enkripsi SSL dan 3D Secure.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Verifikasi Otomatis</p>
                            <p className="opacity-80">
                              Pembayaran diverifikasi secara otomatis setelah berhasil.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Petunjuk */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="w-5 h-5" style={{ color: '#015023' }} />
                        Petunjuk Pembayaran
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Klik tombol <strong>&quot;Bayar Sekarang&quot;</strong> di samping kanan.</li>
                        <li>Popup pembayaran Midtrans akan muncul.</li>
                        <li>Pilih metode pembayaran yang Anda inginkan.</li>
                        <li>Ikuti instruksi pembayaran sesuai metode yang dipilih.</li>
                        <li>Setelah pembayaran berhasil, status akan otomatis diperbarui.</li>
                        <li>Anda akan dialihkan ke halaman status pendaftaran.</li>
                      </ol>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Action */}
                <div className="space-y-6">
                  {/* Total Pembayaran Card — using brand green header */}
                  <Card>
                    <div
                      className="px-6 py-4 text-center"
                      style={{
                        backgroundColor: '#015023',
                        borderRadius: '16px 16px 0 0',
                        margin: '-24px -1px 0 -1px',
                      }}
                    >
                      <span className="text-white font-semibold text-lg">
                        Total Pembayaran
                      </span>
                    </div>
                    <CardContent className="pt-6 space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold" style={{ color: "#015023" }}>
                          Rp {formatCurrency(paymentData?.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Biaya Pendaftaran
                        </p>
                      </div>

                      {snapLoadError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-xs">
                            Gagal memuat sistem pembayaran. Silakan muat ulang halaman.
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button
                        className="w-full h-12 text-base font-semibold"
                        variant="primary"
                        onClick={handlePayWithMidtrans}
                        disabled={isProcessing || isExpired || snapLoadError}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Memproses...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Bayar Sekarang
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Pembayaran diproses secara aman oleh Midtrans
                      </p>
                    </CardContent>
                  </Card>

                  {/* Navigation — matches data-prestasi pattern */}
                  <div className="flex flex-col gap-3">
                    <Link href="/pendaftaran/data-prestasi" className="block">
                      <Button variant="matcha" className="w-full">
                        Kembali
                      </Button>
                    </Link>
                    <Link
                      href={paymentStatus !== "pending" ? "/pendaftaran/status" : "#"}
                      className="block"
                      onClick={(e) => {
                        if (paymentStatus === "pending") {
                          e.preventDefault();
                          toast.error("Silakan lakukan pembayaran terlebih dahulu.");
                        }
                      }}
                    >
                      <Button
                        variant="primary"
                        className="w-full"
                        disabled={paymentStatus === "pending"}
                      >
                        Lihat Status Pendaftaran
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: Waiting verification / Verified */}
            {(paymentStatus === "waiting_verification" || paymentStatus === "verified") && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 sm:mx-8 md:mx-12 mt-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detail Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nama</span>
                        <span className="font-medium">{paymentData?.applicant_name || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nomor Registrasi</span>
                        <span className="font-medium">{paymentData?.registration_number || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Invoice</span>
                        <span className="font-medium font-mono">{paymentData?.invoice_number || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Biaya Pendaftaran</span>
                        <span className="font-bold text-lg" style={{ color: "#015023" }}>
                          Rp {formatCurrency(paymentData?.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className={`font-semibold ${paymentStatus === "verified" ? "text-[#16874B]" : "text-[#92620A]"}`}>
                          {paymentStatus === "verified" ? "✓ Terverifikasi" : "⏳ Menunggu Verifikasi"}
                        </span>
                      </div>
                      {paymentData?.paid_at && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tanggal Bayar</span>
                          <span className="font-medium">
                            {new Date(paymentData.paid_at).toLocaleDateString("id-ID", {
                              day: "numeric", month: "long", year: "numeric",
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Status Info — using Alert variants */}
                  <Alert variant={paymentStatus === "verified" ? "success" : "warning"}>
                    <Info className="h-4 w-4" />
                    <AlertTitle>
                      {paymentStatus === "verified" ? "Pembayaran Terverifikasi" : "Menunggu Verifikasi"}
                    </AlertTitle>
                    <AlertDescription>
                      {paymentStatus === "verified"
                        ? "Pembayaran Anda telah diverifikasi. Anda dapat melanjutkan proses pendaftaran."
                        : "Pembayaran Anda sedang diproses. Status akan diperbarui secara otomatis."}
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Status Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        {paymentStatus === "verified" ? (
                          <CheckCircle className="w-16 h-16 mx-auto mb-3" style={{ color: '#16874B' }} />
                        ) : (
                          <Clock className="w-16 h-16 mx-auto mb-3" style={{ color: '#DABC4E' }} />
                        )}
                        <p className="font-semibold mb-1">
                          {paymentStatus === "verified" ? "Terverifikasi" : "Menunggu Verifikasi"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {paymentStatus === "verified"
                            ? "Pembayaran sudah dikonfirmasi"
                            : "Harap menunggu konfirmasi"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation — matches data-prestasi pattern */}
                  <div className="flex flex-col gap-3">
                    <Link href="/pendaftaran/data-prestasi" className="block">
                      <Button variant="matcha" className="w-full">Kembali</Button>
                    </Link>
                    <Link href="/pendaftaran/status" className="block">
                      <Button variant="primary" className="w-full">Lihat Status Pendaftaran</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </ProtectedRoute>
  );
}
