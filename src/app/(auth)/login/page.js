"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const loginMutation = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!captcha) {
      toast.error("Silakan selesaikan reCAPTCHA terlebih dahulu");
      return;
    }

    loginMutation.mutate({
      email,
      password,
    });
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[url('/auth.png')] bg-cover bg-center p-4 max-md:overflow-auto">
      <Card className="w-full max-w-[95%] md:w-3/4 flex flex-col-reverse md:flex-row gap-4 md:gap-2 p-4 md:p-0 h-auto md:h-3/4 relative rounded-[5vw] bg-white max-md:shadow-lg">
        <div className="w-full md:w-3/8 min-h-fit md:h-11/10 bg-[var(--green)] flex items-center justify-center flex-col px-4 gap-4 rounded-[5vw] md:absolute overflow-hidden md:left-[-10px] md:top-1/2 md:-translate-y-1/2 py-8 md:py-12 max-md:order-1 max-md:gap-6">
          <div className="flex flex-col items-center gap-4 w-full justify-center">
            <div className="relative w-24 h-full sm:w-40 sm:h-40 md:w-60 md:h-60">
              <Image
                src="/logo.jpg"
                alt="logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <CardHeader className="text-[var(--cream)] text-center w-full p-0 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              UNIVERSITAS GLOBAL NUSANTARA
            </CardHeader>
          </div>

          <div className="flex flex-col gap-3 w-full items-center justify-center pb-4 md:pb-0">
            <Link href="/register" className="w-4/5 sm:w-3/4">
              <Button
                variant={"yellow"}
                className="w-full rounded-full bg-[var(--light-cream)] text-[var(--green)] hover:bg-[var(--light-cream)]/80"
              >
                Register
              </Button>
            </Link>
            <Link href="/forgot-password" className="w-4/5 sm:w-3/4">
              <Button
                variant={"yellow"}
                className="w-full rounded-full bg-white text-[var(--green)] hover:bg-white/80"
              >
                Forgot Password
              </Button>
            </Link>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="w-full flex items-center justify-center md:justify-end">
          <div className="p-0 px-0 md:py-6 w-full md:w-5/8 h-full flex flex-col justify-center gap-4 lg:px-12 max-md:px-4">
            <CardHeader className="text-center">
              <CardTitle className="font-bold text-3xl sm:text-4xl">
                LOGIN
              </CardTitle>
            </CardHeader>
            <CardContent className={"px-0"}>
              <form
                onSubmit={handleSubmit}
                className="
      grid gap-4 
      max-w-sm 
      mx-auto 
      px-0 
      max-sm:max-w-[95%]
      transition-all
      duration-300
      w-fit
      md:w-full
    "
                style={{
                  minWidth: 280, // batas bawah biar gak sempit banget
                  maxWidth: 360, // “ngunci” biar gak ikut reflow reCAPTCHA
                }}
              >
                <div className="flex flex-col gap-6 max-sm:gap-4 w-fit md:w-full">
                  {/* Email */}
                  <div className="grid gap-2 w-fit md:w-full">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      required
                      className="
            w-full 
            text-sm sm:text-base 
            transition-all 
            duration-300 
            max-w-full
          "
                    />
                  </div>

                  {/* Password */}
                  <div className="grid gap-2 w-fit md:w-full">
                    <Label htmlFor="password" className="text-sm sm:text-base">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="
            w-full 
            text-sm sm:text-base 
            transition-all 
            duration-300 
            max-w-full
          "
                    />
                  </div>

                  {/* reCAPTCHA stabil */}
                  <div className="w-fit flex justify-center sm:justify-start">
                    <div
                      className="
            transform scale-[0.8] sm:scale-100 
            origin-center sm:origin-left 
            transition-transform duration-300
          "
                      style={{
                        width: "304px",
                        height: "78px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          transform: "scale(0.8)",
                          transformOrigin: "0 0",
                        }}
                      >
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                          onChange={setCaptcha}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tombol */}
                <Button
                  type="submit"
                  className="
        rounded-full 
        text-white 
        hover:text-white
        text-base 
        sm:text-lg
        w-[200px]
        mx-auto
        md:w-full
      "
                  variant={"green"}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2"></CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
