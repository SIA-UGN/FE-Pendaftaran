"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useLogin } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function Login() {
  const [captcha, setCaptcha] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      className="flex items-center justify-center w-screen min-h-screen bg-[url('/auth.png')] bg-cover bg-center"
      style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
    >
      {/* Card wrapper */}
      <div
        className="w-full max-w-4xl mx-4 flex flex-col md:flex-row overflow-hidden shadow-2xl"
        style={{ borderRadius: '24px', minHeight: '560px' }}
      >
        {/* Left panel — brand */}
        <div
          className="hidden md:flex flex-col items-center justify-between w-5/12 px-8 py-12 flex-shrink-0"
          style={{ backgroundColor: '#015023' }}
        >
          <div className="flex flex-col items-center gap-4 flex-1 justify-center">
            <div className="relative w-36 h-36">
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

          <div className="flex flex-col w-full gap-3 mt-8">
            <Link href="/register" className="w-full">
              <Button
                variant="secondary"
                className="w-full font-semibold"
              >
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/forgot-password" className="w-full">
              <Button
                variant="outline"
                className="w-full font-semibold"
                style={{ borderColor: '#ffffff', color: '#ffffff', backgroundColor: 'transparent' }}
              >
                Lupa Password
              </Button>
            </Link>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex flex-col justify-center bg-white px-8 sm:px-12 py-10">
          <div className="max-w-sm w-full mx-auto">
            <h1
              className="text-3xl font-bold mb-1"
              style={{ color: '#015023' }}
            >
              Selamat Datang
            </h1>
            <p className="text-gray-500 text-sm mb-8">Masuk ke akun pendaftaran Anda</p>

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

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium hover:underline"
                    style={{ color: '#DABC4E' }}
                  >
                    Lupa password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={setCaptcha}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full font-semibold mt-1"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            {/* Mobile links */}
            <div className="mt-6 flex flex-col items-center gap-2 md:hidden text-sm">
              <span className="text-gray-500">Belum punya akun?</span>
              <Link
                href="/register"
                className="font-semibold hover:underline"
                style={{ color: '#015023' }}
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
