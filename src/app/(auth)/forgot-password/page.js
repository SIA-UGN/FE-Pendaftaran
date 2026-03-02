"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { useForgotPassword, useResetPassword } from "@/hooks/useAuth";
import { Eye, EyeOff, Mail, Lock, Hash, ShieldCheck, ChevronLeft } from "lucide-react";
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

  const inputBase = {
    backgroundColor: '#fff',
    border: '1.5px solid #E6EEE9',
    color: '#1a1a1a',
  };

  return (
    <div
      className="relative flex items-center justify-center w-screen min-h-screen bg-[url('/auth.png')] bg-cover bg-center"
      style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
    >
      {/* Card wrapper */}
      <div
        className="w-full max-w-4xl mx-4 flex flex-col md:flex-row overflow-hidden shadow-2xl"
        style={{ borderRadius: '24px', minHeight: '560px' }}
      >
        {/* Left panel — brand */}
        <div
          className="hidden md:flex flex-col items-center w-5/12 px-8 py-10 flex-shrink-0"
          style={{ backgroundColor: '#015023' }}
        >
          {/* Back to home */}
          <Link
            href="/"
            className="self-start flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold transition-colors mb-auto"
          >
            <ChevronLeft size={14} /> Kembali ke Beranda
          </Link>

          <div className="flex flex-col items-center gap-4 flex-1 justify-center">
            <div className="relative" style={{ width: '268px', height: '284px' }}>
              <Image src="/logo.jpg" alt="logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <h2
              className="text-center font-bold text-xl leading-snug"
              style={{ color: '#DABC4E' }}
            >
              UNIVERSITAS GLOBAL NUSANTARA
            </h2>
            <p className="text-white/70 text-sm text-center mt-1">
              Sistem Pendaftaran Mahasiswa Baru
            </p>
          </div>

          {/* Spacer to balance top link */}
          <div className="mt-auto" style={{ height: '24px' }} />
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex flex-col bg-[#F4F6F3] px-8 sm:px-12 py-10">
          <div className="max-w-sm w-full mx-auto flex flex-col flex-1">

            {/* Heading */}
            <div className="mb-3">
              <h1 className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>Lupa Password</h1>
              <p className="text-gray-400 text-sm mt-1">Masukkan email Anda untuk menerima kode verifikasi</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={inputBase}
                    onFocus={e => (e.target.style.borderColor = '#015023')}
                    onBlur={e => (e.target.style.borderColor = '#E6EEE9')}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-60 mt-1"
                style={{ backgroundColor: '#015023', color: '#fff' }}
              >
                {forgotPasswordMutation.isPending ? 'Mengirim...' : <>Kirim Kode Verifikasi <span style={{ fontSize: '1.1em', lineHeight: 1 }}>&rarr;</span></>}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-1 my-2">
              <div className="flex-1 h-px" style={{ backgroundColor: '#E0E7E3' }} />
              <span className="text-xs text-gray-400 font-medium">atau</span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#E0E7E3' }} />
            </div>

            {/* Login CTA */}
            <p className="text-center text-sm text-gray-400 mb-2">Ingat password Anda?</p>
            <Link href="/login">
              <button
                type="button"
                className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-[#E6EEE9]"
                style={{ border: '1.5px solid #015023', color: '#015023', backgroundColor: 'transparent' }}
              >
                Kembali ke Login <span style={{ fontSize: '1.1em', lineHeight: 1 }}>&rarr;</span>
              </button>
            </Link>

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              <ShieldCheck size={13} className="flex-shrink-0" style={{ color: '#9ca3af' }} />
              <p className="text-xs text-gray-400">Akun Anda dilindungi dan dienkripsi secara aman oleh sistem kami.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Dialog — Verifikasi Kode & Reset Password */}
      <AlertDialog open={showDialog} onOpenChange={handleCloseDialog}>
        <AlertDialogContent
          className="sm:max-w-md"
          style={{ borderRadius: '16px', fontFamily: 'Urbanist, system-ui, sans-serif' }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold" style={{ color: '#015023' }}>
              {step === 2 ? "Verifikasi Kode" : "Reset Password"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {step === 2
                ? "Masukkan kode verifikasi 6-digit yang dikirim ke email Anda."
                : "Masukkan password baru Anda untuk menyelesaikan proses reset."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="flex flex-col gap-4 mt-2">
              {/* Email (disabled) */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ ...inputBase, backgroundColor: '#f3f4f6', color: '#6b7280' }}
                  />
                </div>
              </div>

              {/* Kode Verifikasi */}
              <div className="flex flex-col gap-1">
                <label htmlFor="code" className="text-sm font-semibold text-gray-700">Kode Verifikasi</label>
                <div className="relative">
                  <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setCode(value);
                    }}
                    placeholder="Masukkan kode 6-digit"
                    maxLength={6}
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all text-center tracking-widest"
                    style={inputBase}
                    onFocus={e => (e.target.style.borderColor = '#015023')}
                    onBlur={e => (e.target.style.borderColor = '#E6EEE9')}
                  />
                </div>
                <p className="text-xs text-gray-400 text-center">Periksa kotak masuk email Anda</p>
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-[#E6EEE9]"
                  style={{ border: '1.5px solid #015023', color: '#015023', backgroundColor: 'transparent' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={code.length !== 6}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all hover:brightness-110 disabled:opacity-60"
                  style={{ backgroundColor: '#015023', color: '#fff' }}
                >
                  Verifikasi
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4 mt-2">
              {/* Password Baru */}
              <PasswordField
                id="new-password"
                label="Password Baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password baru"
                inputBase={inputBase}
              />

              {/* Konfirmasi Password */}
              <PasswordField
                id="confirm-password"
                label="Konfirmasi Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Ulangi password baru"
                inputBase={inputBase}
              />

              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-[#E6EEE9]"
                  style={{ border: '1.5px solid #015023', color: '#015023', backgroundColor: 'transparent' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={resetPasswordMutation.isPending}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all hover:brightness-110 disabled:opacity-60"
                  style={{ backgroundColor: '#015023', color: '#fff' }}
                >
                  {resetPasswordMutation.isPending ? "Memproses..." : "Reset Password"}
                </button>
              </div>
            </form>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function PasswordField({ id, label, value, onChange, placeholder, inputBase }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={inputBase}
          onFocus={e => (e.target.style.borderColor = '#015023')}
          onBlur={e => (e.target.style.borderColor = '#E6EEE9')}
        />
        <button
          type="button"
          onClick={() => setShow(v => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
}
