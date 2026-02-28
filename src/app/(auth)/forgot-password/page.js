"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useForgotPassword, useResetPassword } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: verify code, 3: reset password
  const [showDialog, setShowDialog] = useState(false);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const forgotPasswordMutation = useForgotPassword();

  const resetPasswordMutation = useResetPassword();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) return;

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setStep(2); // Step diset dulu
          setTimeout(() => {
            // Delay sedikit
            setShowDialog(true); // Baru buka dialog
          }, 100);
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || error.message ||
            "Gagal mengirim kode verifikasi";
          toast.error(message);
        },
      }
    );
  }

  async function handleVerifyCode(e) {
    e.preventDefault();

    if (code.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setStep(3);
    toast.success("Code verified! Please enter your new password");
  }

  async function handleResetPassword(e) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    resetPasswordMutation.mutate(
      {
        email,
        token: code,
        password,
        password_confirmation: passwordConfirmation,
      },
      {
        onSuccess: () => {
          setShowDialog(false);
          setEmail("");
          setCode("");
          setPassword("");
          setPasswordConfirmation("");
          setStep(1);
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || error.message ||
            "Gagal reset password";
          toast.error(message);
        },
      }
    );
  }

  function handleCloseDialog() {
    setShowDialog(false);
    setStep(1);
    setCode("");
    setPassword("");
    setPasswordConfirmation("");
  }

  return (
    <div
      className="flex items-center justify-center w-screen min-h-screen bg-[url('/auth.png')] bg-cover bg-center"
      style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
    >
      {/* Card */}
      <div
        className="w-full max-w-4xl mx-4 flex flex-col md:flex-row overflow-hidden shadow-2xl"
        style={{ borderRadius: '24px', minHeight: '480px' }}
      >
        {/* Left panel */}
        <div
          className="hidden md:flex flex-col items-center justify-between w-5/12 px-8 py-12 flex-shrink-0"
          style={{ backgroundColor: '#015023' }}
        >
          <div className="flex flex-col items-center gap-4 flex-1 justify-center">
            <div className="relative w-36 h-36">
              <Image src="/logo.jpg" alt="logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <h2 className="text-center font-bold text-xl leading-snug" style={{ color: '#DABC4E' }}>
              UNIVERSITAS GLOBAL NUSANTARA
            </h2>
            <p className="text-white/70 text-sm text-center mt-1">
              Sistem Pendaftaran Mahasiswa Baru
            </p>
          </div>

          <div className="flex flex-col w-full gap-3 mt-8">
            <Link href="/login" className="w-full">
              <Button variant="secondary" className="w-full font-semibold">
                Masuk
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button
                variant="outline"
                className="w-full font-semibold"
                style={{ borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'transparent' }}
              >
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center bg-white px-8 sm:px-12 py-10">
          <div className="max-w-sm w-full mx-auto">
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#015023' }}>
              Lupa Password
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Masukkan email Anda untuk menerima kode verifikasi
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full font-semibold mt-1"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending ? "Mengirim..." : "Kirim Kode Verifikasi"}
              </Button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm">
              <Link href="/login" className="font-semibold hover:underline" style={{ color: '#015023' }}>
                ← Kembali ke Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showDialog} onOpenChange={handleCloseDialog}>
        <AlertDialogContent
          className="sm:max-w-md"
          style={{ borderRadius: '16px', fontFamily: 'Urbanist, system-ui, sans-serif' }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="text-2xl font-bold"
              style={{ color: '#015023' }}
            >
              {step === 2 ? "Verifikasi Kode" : "Reset Password"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {step === 2
                ? "Masukkan kode verifikasi 6-digit yang dikirim ke email Anda."
                : "Masukkan password baru Anda untuk menyelesaikan proses reset."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="grid gap-4 mt-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dialog-email">Email</Label>
                <Input
                  id="dialog-email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="code">Kode Verifikasi</Label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setCode(value);
                  }}
                  placeholder="Masukkan kode 6-digit"
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                  required
                />
                <p className="text-xs text-gray-500 text-center">
                  Periksa kotak masuk email Anda
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog} className="flex-1">
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="flex-1" disabled={code.length !== 6}>
                  Verifikasi
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="grid gap-4 mt-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password baru"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Ulangi password baru"
                  required
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog} className="flex-1">
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? "Memproses..." : "Reset Password"}
                </Button>
              </div>
            </form>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
