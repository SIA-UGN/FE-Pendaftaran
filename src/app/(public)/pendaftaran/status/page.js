"use client";

import { useState, useEffect } from "react";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useMyRegistration } from "@/hooks/useRegistration";
import { useMyPayment } from "@/hooks/usePayment";

import ApplicantAnnouncement from "@/components/ApplicantAnnouncement";
import EmailPicker from "@/components/registrations/EmailPicker";
import Link from "next/link";

export default function Status() {
  const [status, setStatus] = useState("Pending");
  const [registrationStatus, setRegistrationStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const {
    data: registrationData,
    isLoading: isLoadingReg,
    isError: isErrorReg,
  } = useMyRegistration();
  const {
    data: paymentData,
    isLoading: isLoadingPayment,
    isError: isErrorPayment,
  } = useMyPayment();

  useEffect(() => {
    if (registrationData?.data?.data?.profile) {
      const regStatus = registrationData.data.data.profile.registration_status;

      if (regStatus === "approved") {
        setRegistrationStatus("Verified");
      } else if (regStatus === "rejected") {
        setRegistrationStatus("Rejected");
      } else if (regStatus === "submitted" || regStatus === "reviewed") {
        setRegistrationStatus("Waiting");
      } else if (regStatus === "draft") {
        setRegistrationStatus("Pending");
      } else {
        setRegistrationStatus("Pending");
      }
    }

    if (paymentData?.data?.data?.payment) {
      const pymtStatus = paymentData.data.data.payment.status;

      if (pymtStatus === "verified") {
        setPaymentStatus("Verified");
      } else if (pymtStatus === "rejected") {
        setPaymentStatus("Rejected");
      } else if (pymtStatus === "waiting_verification") {
        setPaymentStatus("Waiting");
      } else if (pymtStatus === "pending" || pymtStatus === "expired") {
        setPaymentStatus("Pending");
      } else {
        setPaymentStatus("Pending");
      }
    }

    // Determine global status
    let globalStatus = "Pending";

    const regStat = registrationData?.data?.data?.profile?.registration_status;
    const pymtStat = paymentData?.data?.data?.payment?.status;

    // Accepted: Keduanya approved dan verified
    if (regStat === "approved" && pymtStat === "verified") {
      globalStatus = "Accepted";
    }
    // Rejected: Salah satu rejected
    else if (regStat === "rejected" || pymtStat === "rejected") {
      globalStatus = "Rejected";
    }
    // Pending: Lainnya
    else {
      globalStatus = "Pending";
    }

    setStatus(globalStatus);
  }, [registrationData, paymentData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Verified":
        return "text-green-600";
      case "Waiting":
        return "text-yellow-600";
      case "Pending":
        return "text-gray-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Verified":
        return <CheckCircle className="text-green-600 w-8 h-8" />;
      case "Waiting":
        return <Clock className="text-yellow-600 w-8 h-8" />;
      case "Pending":
        return <Clock className="text-gray-600 w-8 h-8" />;
      case "Rejected":
        return <XCircle className="text-red-600 w-8 h-8" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "Verified":
        return "Terverifikasi";
      case "Waiting":
        return "Menunggu Verifikasi";
      case "Pending":
        return "Belum Selesai";
      case "Rejected":
        return "Ditolak";
      default:
        return "Pending";
    }
  };

  if (isLoadingReg || isLoadingPayment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isErrorReg || isErrorPayment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error loading data</p>
      </div>
    );
  }

  return (
    <div className="my-12 max-w-7xl mx-auto">
      <div className="w-10/12 mx-auto mt-8">
        {/* === Kondisi Utama === */}
        {status === "Accepted" && (
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className="bg-green-700 font-bold text-lg w-full p-4 text-center absolute top-30">
              Selamat
            </p>
            <p className="mt-24 w-md text-center">
              Anda dinyatakan{" "}
              <span className="font-bold text-green-800">lulus</span> seleksi
              pendaftaran mahasiswa baru.
            </p>
            <p className="font-bold text-xl text-[var(--green)]">
              Universitas Global Nusantara
            </p>
            <ApplicantAnnouncement status="Lulus" />
            <EmailPicker />
            <div className="flex gap-5 w-full">
              <Link href="/" className={"ms-auto"}>
                <Button variant={"yellow"}>Home</Button>
              </Link>
              <Link href="/">
                <Button variant={"green"}>Konfirmasi</Button>
              </Link>
            </div>
          </div>
        )}

        {status === "Pending" && (
          <>
            <RegistrationProgress />
            <h2 className="text-xl font-semibold mt-10 mb-4">
              Status Verifikasi Pendaftaran
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Status Pendaftaran */}
              <Card className="p-6 shadow-lg">
                <div className="flex flex-col items-center gap-4">
                  {getStatusIcon(registrationStatus)}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Pendaftaran</h3>
                    <p
                      className={`text-lg font-semibold ${getStatusColor(
                        registrationStatus
                      )}`}
                    >
                      {getStatusLabel(registrationStatus)}
                    </p>
                  </div>
                  {registrationStatus === "Waiting" && (
                    <p className="text-sm text-gray-600 text-center mt-2">
                      Data pendaftaran Anda sedang diverifikasi oleh admin
                    </p>
                  )}
                  {registrationStatus === "Pending" && (
                    <p className="text-sm text-gray-600 text-center mt-2">
                      Silakan lengkapi semua tahap pendaftaran
                    </p>
                  )}
                  {registrationStatus === "Rejected" &&
                    registrationData?.data?.data?.profile?.rejection_reason && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          <span className="font-semibold">Alasan: </span>
                          {registrationData.data.data.profile.rejection_reason}
                        </p>
                      </div>
                    )}
                </div>
              </Card>

              {/* Card Status Pembayaran */}
              <Card className="p-6 shadow-lg">
                <div className="flex flex-col items-center gap-4">
                  {getStatusIcon(paymentStatus)}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Pembayaran</h3>
                    <p
                      className={`text-lg font-semibold ${getStatusColor(
                        paymentStatus
                      )}`}
                    >
                      {getStatusLabel(paymentStatus)}
                    </p>
                  </div>
                  {paymentStatus === "Waiting" && (
                    <p className="text-sm text-gray-600 text-center mt-2">
                      Bukti pembayaran Anda sedang diverifikasi oleh admin
                    </p>
                  )}
                  {paymentStatus === "Pending" && (
                    <p className="text-sm text-gray-600 text-center mt-2">
                      Silakan upload bukti pembayaran
                    </p>
                  )}
                  {paymentStatus === "Rejected" &&
                    paymentData?.data?.data?.payment?.rejection_reason && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          <span className="font-semibold">Alasan: </span>
                          {paymentData.data.data.payment.rejection_reason}
                        </p>
                      </div>
                    )}
                  {paymentData?.data?.data?.payment && (
                    <div className="mt-2 text-center">
                      <p className="text-sm text-gray-600">
                        Jumlah:{" "}
                        <span className="font-semibold">
                          Rp{" "}
                          {Number(
                            paymentData.data.data.payment.amount
                          ).toLocaleString("id-ID")}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="yellow" onClick={() => window.history.back()}>
                Kembali
              </Button>
              <Link href="/pendaftaran/pembayaran">
                <Button variant="green">Lihat Detail Pembayaran</Button>
              </Link>
            </div>
          </>
        )}

        {status === "Rejected" && (
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className="bg-red-500 font-bold text-lg w-full p-4 text-center absolute top-30 text-white">
              Mohon Maaf
            </p>
            <p className="mt-24 w-md text-center">
              Anda dinyatakan{" "}
              <span className="font-bold text-red-600">tidak lulus</span>{" "}
              seleksi pendaftaran mahasiswa baru.
            </p>
            <p className="font-bold text-xl text-[var(--green)]">
              Universitas Global Nusantara
            </p>
            <ApplicantAnnouncement status="Tidak Lulus" />
            <p>Jangan Putus Asa dan Tetap Semangat!</p>
            <div className="flex gap-5 w-full">
              <Link href="/" className={"ms-auto"}>
                <Button variant={"yellow"}>Home</Button>
              </Link>
              <Link href="/">
                <Button variant={"green"}>Konfirmasi</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
