"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Clock,
  Copy,
  CheckCheck,
  Upload,
  AlertCircle,
  XCircle,
  Info,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import toast from "react-hot-toast";
import RegistrationProgress from "@/components/RegistrationProgress";
import ProtectedRoute from "@/components/ProtectedRoute";
import { usePayment } from "@/hooks/usePayment";
import { useMyRegistration } from "@/hooks/useRegistration";
import { set } from "zod";

export default function Pembayaran() {
  const router = useRouter();
  const { paymentData, paymentStatus, uploadProof, isLoading, isUploading } =
    usePayment();
  const { data: registrationData } = useMyRegistration();

  const [selectedFile, setSelectedFile] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `${days > 0 ? days + "d " : ""}${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentData?.deadline]);

  useEffect(() => {
    if (
      !isLoading &&
      paymentStatus !== "pending" &&
      paymentStatus !== "rejected"
    ) {
      router.push("/pendaftaran/status");
    }
  }, [isLoading, paymentStatus, router]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Nomor rekening berhasil disalin!");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format file harus PDF, JPG, atau PNG");
      return;
    }

    setSelectedFile(file);
  };

  const handleConfirmPayment = async () => {
    if (!selectedFile) {
      toast.error("Silakan pilih file bukti pembayaran");
      return;
    }

    const actualPaymentId = paymentData?.data?.payment?.id;

    if (!actualPaymentId) {
      toast.error("ID pembayaran tidak ditemukan.");
      return;
    }

    try {
      setUploading(true);
      await uploadProof(selectedFile, actualPaymentId);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error.response?.data?.message || "Gagal mengupload bukti pembayaran"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setUploadSuccess(false);
    setIsUploading(false);
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        icon: Clock,
        text: "Menunggu Pembayaran",
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      },
      waiting_verification: {
        icon: Upload,
        text: "Menunggu Verifikasi",
        color: "text-blue-600 bg-blue-50 border-blue-200",
      },
      verified: {
        icon: CheckCheck,
        text: "Pembayaran Terverifikasi",
        color: "text-green-600 bg-green-50 border-green-200",
      },
      rejected: {
        icon: XCircle,
        text: "Bukti Pembayaran Ditolak",
        color: "text-red-600 bg-red-50 border-red-200",
      },
      expired: {
        icon: AlertCircle,
        text: "Pembayaran Expired",
        color: "text-gray-600 bg-gray-50 border-gray-200",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${config.color}`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{config.text}</span>
      </div>
    );
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <RegistrationProgress />

        {/* Header */}
        <div className="flex items-center gap-2 my-6">
          <CheckCircle className="text-green-500 w-6 h-6" />
          <h2 className="text-2xl font-semibold">Pembayaran Pendaftaran</h2>
        </div>

        {/* Status Payment */}
        <div className="mb-6">
          <StatusBadge status={paymentStatus} />
        </div>

        {/* Alert Deadline */}
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

        {/* Alert Expired */}
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

        {/* Alert Rejected */}
        {paymentStatus === "rejected" && paymentData?.rejection_reason && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">
              Bukti Pembayaran Ditolak
            </AlertTitle>
            <AlertDescription className="text-red-700">
              Alasan: {paymentData.rejection_reason}
              <br />
              Silakan upload ulang bukti pembayaran yang benar.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Payment Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ringkasan Pembayaran */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">
                  Ringkasan Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nama</span>
                  <span className="font-medium">
                    {registrationData?.data?.registration?.profile?.full_name ||
                      paymentData?.student_name ||
                      "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Nomor Registrasi
                  </span>
                  <span className="font-medium">
                    {registrationData?.data?.registration
                      ?.registration_number ||
                      paymentData?.registration_number ||
                      "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Biaya Pendaftaran
                  </span>
                  <span className="font-bold text-lg text-green-600">
                    Rp{" "}
                    {paymentData?.amount?.toLocaleString("id-ID") || "300.000"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Countdown Timer */}
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

            {/* Informasi Rekening */}
            <Card>
              <CardHeader>
                <CardTitle>Transfer Bank</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentData?.bank_accounts?.map((account, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">
                        {account.bank_name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        a.n {account.account_holder}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded border">
                      <span className="font-mono text-lg font-bold">
                        {account.account_number}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(account.account_number)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Salin
                      </Button>
                    </div>
                  </div>
                )) || (
                  <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Bank BCA</span>
                      <span className="text-sm text-muted-foreground">
                        a.n Universitas Global
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded border">
                      <span className="font-mono text-lg font-bold">
                        1234567890
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("1234567890")}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Salin
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instruksi Pembayaran */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  Petunjuk Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Transfer sesuai <strong>nominal EXACT</strong> yang tertera
                    (Rp{" "}
                    {paymentData?.amount?.toLocaleString("id-ID") || "300.000"})
                  </li>
                  <li>Transfer ke salah satu rekening yang tersedia di atas</li>
                  <li>Simpan bukti transfer Anda</li>
                  <li>
                    Upload bukti transfer melalui tombol "Konfirmasi Pembayaran"
                  </li>
                  <li>Tunggu verifikasi dari admin (maksimal 1 x 24 jam)</li>
                  <li>
                    Setelah terverifikasi, Anda dapat melanjutkan proses
                    pendaftaran
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Upload & Actions */}
          <div className="space-y-6">
            {/* Upload Bukti Pembayaran */}
            {(paymentStatus === "pending" || paymentStatus === "rejected") &&
              !isExpired && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Bukti Pembayaran</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="payment-proof"
                        disabled={isUploading}
                      />
                      <label
                        htmlFor="payment-proof"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          isUploading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">
                          {selectedFile
                            ? selectedFile.name
                            : "Klik untuk pilih file"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          PDF, JPG, PNG (Max 5MB)
                        </span>
                      </label>
                    </div>

                    <AlertDialog
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          className="w-full"
                          variant="green"
                          disabled={!selectedFile || isUploading}
                        >
                          {isUploading
                            ? "Mengupload..."
                            : "Konfirmasi Pembayaran"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        {!uploading && !uploadSuccess && (
                          <>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Konfirmasi Upload
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Pastikan bukti pembayaran yang Anda upload sudah
                                benar. Setelah di-upload, admin akan
                                memverifikasi dalam 1 x 24 jam.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex gap-3 justify-end">
                              <Button
                                variant="outline"
                                onClick={handleCloseDialog}
                              >
                                Batal
                              </Button>
                              <Button
                                variant="green"
                                onClick={handleConfirmPayment}
                                disabled={isUploading}
                              >
                                Ya, Upload
                              </Button>
                            </div>
                          </>
                        )}

                        {uploading && !uploadSuccess && (
                          <div className="flex flex-col items-center justify-center py-6">
                            <Loader2 className="w-8 h-8 text-green-500 animate-spin mb-3" />
                            <p className="text-sm text-gray-600">
                              Mengunggah bukti pembayaran...
                            </p>
                          </div>
                        )}

                        {uploadSuccess && (
                          <div className="flex flex-col items-center justify-center py-6">
                            <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
                            <p className="text-sm text-gray-700 mb-2">
                              Pembayaran berhasil dikonfirmasi!
                            </p>
                            <Link href="/pendaftaran/status">
                              <Button variant="green" className="mt-2">
                                Lanjutkan
                              </Button>
                            </Link>
                          </div>
                        )}
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/pendaftaran/data-prestasi" className="block">
                <Button variant="yellow" className="w-full">
                  Kembali
                </Button>
              </Link>

              {paymentStatus === "verified" && (
                <Link href="/pendaftaran/status" className="block">
                  <Button variant="green" className="w-full">
                    Lihat Status Pendaftaran
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
