"use client";

import { useState, useEffect } from "react";
import RegistrationProgress from "@/components/RegistrationProgress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useMyRegistration } from "@/hooks/useRegistration";

import ApplicantAnnouncement from "@/components/ApplicantAnnouncement";
import EmailPicker from "@/components/EmailPicker";
import Link from "next/link";

export default function Status() {
  const [status, setStatus] = useState("Pending");
  const [dataStatus, setDataStatus] = useState([
    { title: "Data Diri", status: "Pending" },
    { title: "Data Akademik", status: "Pending" },
    { title: "Data Prestasi", status: "Pending" },
    { title: "Data Orang Tua", status: "Pending" },
    { title: "Pembayaran", status: "Pending" },
  ]);

  const { data: registrationData, isLoading, isError } = useMyRegistration();

  useEffect(() => {
    if (registrationData) {
      const reg = registrationData.registration;
      const payment = registrationData.payment;

      if (!reg) {
        setStatus("Pending");
        return;
      }

      let globalStatus = "Pending";

      if (payment && payment.status === "verified") {
        globalStatus = "Accepted";
      } else if (
        (payment && payment.status === "rejected") ||
        reg.status === "rejected"
      ) {
        globalStatus = "Rejected";
      } else if (reg.status === "waiting_payment_verification") {
        globalStatus = "Pending";
      } else if (payment && payment.status === "pending") {
        globalStatus = "Pending";
      } else if (payment && payment.status === "waiting_verification") {
        globalStatus = "Pending";
      }

      setStatus(globalStatus);

      setDataStatus([
        {
          title: "Data Diri",
          status: reg.profile ? "Accepted" : "Pending",
        },
        {
          title: "Data Akademik",
          status: reg.academicRecord ? "Accepted" : "Pending",
        },
        {
          title: "Data Prestasi",
          status:
            reg.achievements?.length > 0
              ? "Accepted"
              : reg.achievements_skipped
              ? "Accepted"
              : "Pending",
        },
        {
          title: "Data Orang Tua",
          status: reg.father && reg.mother ? "Accepted" : "Pending",
        },
        {
          title: "Pembayaran",
          status: payment
            ? payment.status === "verified"
              ? "Accepted"
              : payment.status === "rejected"
              ? "Rejected"
              : "Pending"
            : "Pending",
        },
      ]);
    }
  }, [registrationData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="text-green-800 w-5 h-5" />;
      case "Pending":
        return <Clock className="text-yellow-600 w-5 h-5" />;
      case "Rejected":
        return <XCircle className="text-red-600 w-5 h-5" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
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
              Status Verifikasi Setiap Tahap
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dataStatus.map((item, index) => (
                <Card
                  key={index}
                  className="flex flex-col items-center justify-center gap-3 p-6 font-semibold shadow-md"
                >
                  {getStatusIcon(item.status)}
                  <h1 className="text-lg">{item.title}</h1>
                  <p className={`text-base ${getStatusColor(item.status)}`}>
                    {item.status}
                  </p>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button variant="yellow" onClick={() => window.history.back()}>
                Kembali
              </Button>
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
