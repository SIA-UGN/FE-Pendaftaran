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

  // Loading state
  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative h-16 w-16 mx-auto mb-4">
              <div
                className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-green-500 animate-spin"
                style={{
                  borderRadius: "50%",
                  borderTopColor: "#22c55e",
                  borderRightColor: "transparent",
                  borderBottomColor: "transparent",
                  borderLeftColor: "transparent",
                }}
              ></div>
            </div>
            <p>Memuat data pembayaran...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      {/* Midtrans Snap JS */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={paymentResponse?.data?.data?.payment?.snap_client_key || process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""}
        strategy="afterInteractive"
        onReady={() => setIsSnapReady(true)}
        onError={() => {
          console.error("Failed to load Midtrans Snap JS");
          setSnapLoadError(true);
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <RegistrationProgress />

        {/* Header */}
        <div className="flex items-center gap-2 my-6">
          <CreditCard className="text-green-600 w-6 h-6" />
          <h2 className="text-2xl font-semibold">Pembayaran Pendaftaran</h2>
        </div>

        {/* Alert: no payment data */}
        {!paymentData && paymentMessage && hasTriedSubmit && (
          <Alert className="mb-6 border-yellow-500 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Informasi</AlertTitle>
            <AlertDescription className="text-yellow-700">
              {paymentMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Alert: deadline warning */}
        {!isExpired && paymentStatus === "pending" && (
          <Alert className="mb-6 border-yellow-500 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Perhatian!</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Selesaikan pembayaran sebelum batas waktu habis. Jika melewati
              batas waktu, Anda harus mendaftar ulang.
            </AlertDescription>
          </Alert>
        )}

        {/* Alert: expired */}
        {isExpired && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Pembayaran Expired</AlertTitle>
            <AlertDescription className="text-red-700">
              Batas waktu pembayaran telah habis. Silakan hubungi admin atau
              daftar ulang.
            </AlertDescription>
          </Alert>
        )}

        {/* Alert: rejected */}
        {paymentStatus === "rejected" && paymentData?.rejection_reason && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Pembayaran Ditolak</AlertTitle>
            <AlertDescription className="text-red-700">
              Alasan: {paymentData.rejection_reason}
              <br />
              Silakan lakukan pembayaran ulang.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        {paymentData && (
          <>
            {/* MODE 1: Payment Form (pending or rejected) */}
            {(paymentStatus === "pending" || paymentStatus === "rejected") && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Ringkasan Pembayaran */}
                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#015023" }}>
                        Ringkasan Pembayaran
                      </CardTitle>
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
                          <div className="text-4xl font-bold text-red-600 font-mono">
                            {countdown || "00:00:00"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Midtrans Info Card */}
                  <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <Shield className="w-5 h-5" />
                        Pembayaran Aman via Midtrans
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm text-green-700">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Berbagai Metode Pembayaran</p>
                            <p className="text-green-600">
                              Transfer Bank, E-Wallet (GoPay, OVO, Dana), QRIS,
                              Kartu Kredit/Debit, dan lainnya.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Transaksi Terenkripsi</p>
                            <p className="text-green-600">
                              Semua pembayaran diproses dengan enkripsi SSL dan 3D Secure.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">Verifikasi Otomatis</p>
                            <p className="text-green-600">
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
                        <Info className="w-5 h-5 text-blue-500" />
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
                  <Card className="border-green-300 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                      <CardTitle className="text-center text-white text-lg">
                        Total Pembayaran
                      </CardTitle>
                    </CardHeader>
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
                        <Alert className="border-red-300 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-600 text-xs">
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

                  {/* Navigation */}
                  <div className="space-y-3">
                    <Link href="/pendaftaran/data-prestasi" className="block">
                      <Button variant="yellow" className="w-full">
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#015023" }}>Detail Pembayaran</CardTitle>
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
                        <span className={`font-semibold ${paymentStatus === "verified" ? "text-[#015023]" : "text-yellow-600"}`}>
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

                  {/* Status Info */}
                  <Alert className={paymentStatus === "verified" ? "border-green-500 bg-green-50" : "border-yellow-500 bg-yellow-50"}>
                    <Info className={`h-4 w-4 ${paymentStatus === "verified" ? "text-[#015023]" : "text-yellow-600"}`} />
                    <AlertTitle className={paymentStatus === "verified" ? "text-green-800" : "text-yellow-800"}>
                      {paymentStatus === "verified" ? "Pembayaran Terverifikasi" : "Menunggu Verifikasi"}
                    </AlertTitle>
                    <AlertDescription className={paymentStatus === "verified" ? "text-green-700" : "text-yellow-700"}>
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
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                        ) : (
                          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
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
                  <div className="space-y-3">
                    <Link href="/pendaftaran/data-prestasi" className="block">
                      <Button variant="yellow" className="w-full">Kembali</Button>
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
      </div>
    </ProtectedRoute>
  );
}
