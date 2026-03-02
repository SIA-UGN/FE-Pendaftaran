"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useLogin } from "@/hooks/useAuth";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [captcha, setCaptcha] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef(null);

  const loginMutation = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    const captchaValue = captcha || "bypass-local-dev";

    loginMutation.mutate(
      {
        email,
        password,
        "g-recaptcha-response": captchaValue,
      },
      {
        onError: () => {
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
          setCaptcha(null);
        },
      }
    );
  }

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
            <div className="relative w-42 h-46" style={{ width: '268px', height: '284px' }}>
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
              <h1 className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>Selamat Datang</h1>
              <p className="text-gray-400 text-sm mt-1">Masuk ke akun pendaftaran Anda</p>
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
                    style={{
                      backgroundColor: '#fff',
                      border: '1.5px solid #E6EEE9',
                      color: '#1a1a1a',
                    }}
                    onFocus={e => e.target.style.borderColor = '#015023'}
                    onBlur={e => e.target.style.borderColor = '#E6EEE9'}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold hover:underline"
                    style={{ color: '#015023' }}
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: '#fff',
                      border: '1.5px solid #E6EEE9',
                      color: '#1a1a1a',
                    }}
                    onFocus={e => e.target.style.borderColor = '#015023'}
                    onBlur={e => e.target.style.borderColor = '#E6EEE9'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* reCAPTCHA */}
                <div style={{ transform: 'scale(0.93)', transformOrigin: '0 0', width: '108%' }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={setCaptcha}
                  />
                </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-60 mt-1"
                style={{ backgroundColor: '#015023', color: '#fff' }}
              >
                {loginMutation.isPending ? 'Memproses...' : <>Masuk</>}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-1 my-2">
              <div className="flex-1 h-px" style={{ backgroundColor: '#E0E7E3' }} />
              <span className="text-xs text-gray-400 font-medium">atau</span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#E0E7E3' }} />
            </div>

            {/* Register CTA */}
            <p className="text-center text-sm text-gray-400 mb-2">Belum punya akun?</p>
            <Link href="/register">
              <button
                type="button"
                className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-[#E6EEE9]"
                style={{ border: '1.5px solid #015023', color: '#015023', backgroundColor: 'transparent' }}
              >
                Daftar Sekarang
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

    </div>
  );
}
