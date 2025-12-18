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
  CreditCard,
  Banknote,
  Wallet,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import toast from "react-hot-toast";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  useMyPayment,
  useUploadPaymentProof,
  useReUploadPaymentProof,
} from "@/hooks/usePayment";
import {
  useMyRegistration,
  useSubmitRegistration,
} from "@/hooks/useRegistration";

export default function Pembayaran() {
  const router = useRouter();
  const {
    data: paymentResponse,
    isLoading,
    isError,
    refetch: refetchPayment,
  } = useMyPayment();
  const { data: registrationData } = useMyRegistration();
  const uploadProofMutation = useUploadPaymentProof();
  const reUploadProofMutation = useReUploadPaymentProof();
  const submitRegistrationMutation = useSubmitRegistration();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:8000";

  const paymentData = paymentResponse?.data?.data?.payment;
  const availablePaymentMethods =
    paymentResponse?.data?.data?.available_payment_methods || [];
  const paymentStatus = paymentData?.status;
  const paymentMessage = paymentResponse?.data?.message;

  const [selectedFile, setSelectedFile] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

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
  }, [isLoading, paymentData, paymentMessage, hasTriedSubmit]);

  useEffect(() => {
    if (paymentData?.payment_method_id) {
      setSelectedPaymentMethod(paymentData.payment_method_id);
    } else if (!selectedPaymentMethod && availablePaymentMethods?.length > 0) {
      setSelectedPaymentMethod(availablePaymentMethods[0].id);
    }
  }, [paymentData, availablePaymentMethods]);

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Data pembayaran berhasil disalin!");
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

    if (!paymentData?.id) {
      toast.error("ID pembayaran tidak ditemukan.");
      return;
    }

    const formData = new FormData();
    formData.append("payment_proof", selectedFile);
    formData.append("sender_bank", "Bank Transfer");
    formData.append("sender_account_number", "1234567890");
    formData.append(
      "sender_account_holder",
      registrationData?.data?.registration?.profile?.full_name || "User"
    );
    formData.append("paid_amount", paymentData?.amount || 0);
    formData.append(
      "payment_notes",
      `Payment method: ${selectedPaymentMethod}`
    );

    try {
      setUploading(true);

      if (paymentStatus === "rejected") {
        await reUploadProofMutation.mutateAsync({
          paymentId: paymentData.id,
          formData,
        });
      } else {
        await uploadProofMutation.mutateAsync({
          paymentId: paymentData.id,
          formData,
        });
      }

      setUploadSuccess(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        router.push("/pendaftaran/status");
      }, 2000);
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
    setUploading(false);
  };

  const isUploading =
    uploadProofMutation.isPending || reUploadProofMutation.isPending;

  const selectedMethod = availablePaymentMethods?.find(
    (method) => method.id === selectedPaymentMethod
  );

  const getPaymentIcon = (methodType) => {
    if (
      methodType &&
      (methodType.includes("bank") || methodType.includes("transfer"))
    ) {
      return <Banknote className="w-4 h-4" />;
    } else if (
      methodType &&
      (methodType.includes("wallet") || methodType.includes("e-wallet"))
    ) {
      return <Wallet className="w-4 h-4" />;
    } else {
      return <CreditCard className="w-4 h-4" />;
    }
  };

  const parseInstructions = (instructions) => {
    if (!instructions) return [];

    let parts = [];

    if (/\d+\.\s/.test(instructions)) {
      parts = instructions
        .split(/\d+\.\s*/)
        .filter((part) => part.trim() !== "");
    } else if (instructions.includes("\n")) {
      parts = instructions.split("\n");
    } else if (instructions.includes(";")) {
      parts = instructions.split(";");
    } else if (instructions.includes(",")) {
      parts = instructions.split(",");
    } else {
      parts = [instructions];
    }

    return parts.map((part) => part.trim()).filter((part) => part !== "");
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

        {/* Alert if payment data not available */}
        {!paymentData && paymentMessage && hasTriedSubmit && (
          <Alert className="mb-6 border-yellow-500 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Informasi</AlertTitle>
            <AlertDescription className="text-yellow-700">
              {paymentMessage}
            </AlertDescription>
          </Alert>
        )}

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

        {/* Main Content - Only show if paymentData exists */}
        {paymentData && (
          <>
            {/* MODE 1: Form Upload (pending atau rejected) */}
            {(paymentStatus === "pending" || paymentStatus === "rejected") && (
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
                          {paymentData?.applicant_name || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Nomor Registrasi
                        </span>
                        <span className="font-medium">
                          {paymentData?.registration_number || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Biaya Pendaftaran
                        </span>
                        <span className="font-bold text-lg text-green-600">
                          Rp{" "}
                          {paymentData?.amount?.toLocaleString("id-ID") ||
                            "300.000"}
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

                  {/* Pemilihan Metode Pembayaran */}
                  {availablePaymentMethods?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          <span>Pilih Metode Pembayaran</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          value={selectedPaymentMethod?.toString()}
                          onValueChange={(value) =>
                            setSelectedPaymentMethod(Number(value))
                          }
                          className="grid grid-cols-1 gap-3"
                        >
                          {availablePaymentMethods?.map((method) => (
                            <Label
                              key={method.id}
                              htmlFor={`method-${method.id}`}
                              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedPaymentMethod === method.id
                                  ? "border-green-500 bg-green-50 shadow-md"
                                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <RadioGroupItem
                                  value={method.id.toString()}
                                  id={`method-${method.id}`}
                                  className="shrink-0"
                                />
                                <div className="flex flex-col gap-0.5">
                                  <span className="font-semibold text-base">
                                    {method.bank_name}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    a.n {method.account_holder}
                                  </span>
                                  <span className="text-sm font-mono text-gray-700">
                                    {method.account_number}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-3">
                                {getPaymentIcon(method.method_type)}
                              </div>
                            </Label>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  )}

                  {/* Informasi Rekening */}
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {selectedMethod
                          ? `Transfer ke ${selectedMethod.bank_name}`
                          : "Transfer Bank"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedMethod ? (
                        <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">
                              {selectedMethod.bank_name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              a.n {selectedMethod.account_holder}
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-white p-3 rounded border">
                            <span className="font-mono text-lg font-bold">
                              {selectedMethod.account_number}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(selectedMethod.account_number)
                              }
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Salin
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 border rounded-lg bg-gray-50 text-center text-muted-foreground">
                          Silakan pilih metode pembayaran terlebih dahulu
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
                      {selectedMethod && selectedMethod.payment_instructions ? (
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          {parseInstructions(
                            selectedMethod.payment_instructions
                          ).map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      ) : (
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>
                            Transfer sesuai <strong>nominal EXACT</strong> yang
                            tertera (Rp{" "}
                            {paymentData?.amount?.toLocaleString("id-ID") ||
                              "300.000"}
                            )
                          </li>
                          <li>
                            Transfer ke rekening yang dipilih
                            {selectedMethod && (
                              <>
                                : <strong>{selectedMethod.bank_name}</strong>{" "}
                                (a.n {selectedMethod.account_holder})
                              </>
                            )}
                          </li>
                          <li>Simpan bukti transfer Anda</li>
                          <li>
                            Upload bukti transfer melalui tombol "Konfirmasi
                            Pembayaran"
                          </li>
                          <li>
                            Tunggu verifikasi dari admin (maksimal 1 x 24 jam)
                          </li>
                          <li>
                            Setelah terverifikasi, Anda dapat melanjutkan proses
                            pendaftaran
                          </li>
                        </ol>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Upload & Actions */}
                <div className="space-y-6">
                  {/* Upload Bukti Pembayaran */}
                  {(paymentStatus === "pending" ||
                    paymentStatus === "rejected") &&
                    !isExpired && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Upload Bukti Pembayaran</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-white">
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
                                isUploading
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
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
                                      Pastikan bukti pembayaran yang Anda upload
                                      sudah benar. Setelah di-upload, admin akan
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
                                  <p className="text-sm text-gray-600 mt-2">
                                    Anda akan dialihkan ke halaman status...
                                  </p>
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

                    <Link
                      href={
                        paymentStatus !== "pending"
                          ? "/pendaftaran/status"
                          : "#"
                      }
                      className="block"
                      onClick={(e) => {
                        if (paymentStatus === "pending") {
                          e.preventDefault();
                          toast.error(
                            "Silakan upload bukti pembayaran terlebih dahulu sebelum melihat status pendaftaran."
                          );
                        }
                      }}
                    >
                      <Button
                        variant="green"
                        className="w-full"
                        disabled={paymentStatus === "pending" && !uploadSuccess}
                      >
                        Lihat Status Pendaftaran
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: Detail View (waiting_verification atau verified) */}
            {(paymentStatus === "waiting_verification" ||
              paymentStatus === "verified") && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Payment Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Ringkasan Pembayaran */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">
                        Detail Pembayaran
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
                        <span className="text-muted-foreground">
                          Nomor Registrasi
                        </span>
                        <span className="font-medium">
                          {paymentData?.registration_number || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Biaya Pendaftaran
                        </span>
                        <span className="font-bold text-lg text-green-600">
                          Rp{" "}
                          {paymentData?.amount?.toLocaleString("id-ID") ||
                            "300.000"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span
                          className={`font-semibold ${
                            paymentStatus === "verified"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {paymentStatus === "verified"
                            ? "✓ Terverifikasi"
                            : "⏳ Menunggu Verifikasi"}
                        </span>
                      </div>
                      {paymentData?.paid_at && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Tanggal Upload
                          </span>
                          <span className="font-medium">
                            {new Date(paymentData.paid_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Info Metode Pembayaran yang Digunakan */}
                  {paymentData?.payment_method && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Metode Pembayaran</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-lg">
                              {paymentData.payment_method.bank_name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              a.n {paymentData.payment_method.account_holder}
                            </span>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <span className="font-mono text-lg font-bold">
                              {paymentData.payment_method.account_number}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Bukti Pembayaran */}
                  {paymentData?.payment_proof_url &&
                    (() => {
                      // Construct full URL for payment proof
                      const proofUrl = paymentData.payment_proof_url.startsWith(
                        "http"
                      )
                        ? paymentData.payment_proof_url
                        : `${API_URL}${paymentData.payment_proof_url}`;

                      return (
                        <Card>
                          <CardHeader>
                            <CardTitle>Bukti Pembayaran</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="border rounded-lg p-4 bg-gray-50">
                                <p className="text-sm text-muted-foreground mb-3">
                                  File bukti pembayaran yang telah diupload:
                                </p>
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  onClick={() =>
                                    window.open(proofUrl, "_blank")
                                  }
                                >
                                  <Upload className="w-4 h-4 mr-2" />
                                  Lihat Bukti
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })()}

                  {/* Info Status */}
                  <Alert
                    className={`${
                      paymentStatus === "verified"
                        ? "border-green-500 bg-green-50"
                        : "border-yellow-500 bg-yellow-50"
                    }`}
                  >
                    <Info
                      className={`h-4 w-4 ${
                        paymentStatus === "verified"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    />
                    <AlertTitle
                      className={
                        paymentStatus === "verified"
                          ? "text-green-800"
                          : "text-yellow-800"
                      }
                    >
                      {paymentStatus === "verified"
                        ? "Pembayaran Terverifikasi"
                        : "Menunggu Verifikasi"}
                    </AlertTitle>
                    <AlertDescription
                      className={
                        paymentStatus === "verified"
                          ? "text-green-700"
                          : "text-yellow-700"
                      }
                    >
                      {paymentStatus === "verified"
                        ? "Pembayaran Anda telah diverifikasi oleh admin. Anda dapat melanjutkan proses pendaftaran."
                        : "Bukti pembayaran Anda sedang diverifikasi oleh admin. Proses verifikasi memakan waktu maksimal 1 x 24 jam."}
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Right Column - Actions */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Status Pembayaran
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        {paymentStatus === "verified" ? (
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                        ) : (
                          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                        )}
                        <p className="font-semibold mb-1">
                          {paymentStatus === "verified"
                            ? "Terverifikasi"
                            : "Menunggu Verifikasi"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {paymentStatus === "verified"
                            ? "Pembayaran sudah dikonfirmasi"
                            : "Harap menunggu konfirmasi admin"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <Link href="/pendaftaran/data-prestasi" className="block">
                      <Button variant="yellow" className="w-full">
                        Kembali
                      </Button>
                    </Link>
                    <Link href="/pendaftaran/status" className="block">
                      <Button variant="green" className="w-full">
                        Lihat Status Pendaftaran
                      </Button>
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
