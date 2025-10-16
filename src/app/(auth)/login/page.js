"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
    const router = useRouter();
    const [captcha, setCaptcha] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      const token = data.data.access_token;

      if (!token) {
        setError("Token tidak ditemukan dalam respons login");
        return;
      }

      localStorage.setItem("token", token);
      router.push("/");
    } catch (err) {
      console.error("Error login:", err);
      setError("Terjadi kesalahan saat login");
    }
  }

  return (
    <div className="flex items-center gap-6 w-screen h-screen justify-center bg-[url('/auth.png')] bg-cover ">
      <Card className="w-3/4 w-m-7/8 flex flex-row gap-2 p-0 h-3/4 relative rounded-[5vw]">
        <div className="w-3/8 h-11/10 bg-[var(--green)] flex items-center justify-between flex-col px-4 gap-4 rounded-[5vw] absolute overflow-hidden left-[-10px] top-1/2 -translate-y-1/2 py-12">
          <div className="flex flex-col items-center gap-2 w-full h-3/4 justify-center">
            <Image src='/logo.jpg' alt="logo" width={250} height={250}></Image>
            <CardHeader className="text-[var(--cream)] text-center w-full p-0 scroll-m-20 text-3xl font-bold tracking-tight">
              UNIVERSITAS GLOBAL NUSANTARA
            </CardHeader>
          </div>
          <div className="flex flex-col gap-2 w-full items-center h-1/4 justify-center">
            <Link href="/register" className="w-8/10 flex-shrink "><Button variant={'yellow'} className={"w-full rounded-full bg-[var(--light-cream)] text-[var(--green)] hover:bg-[var(--light-cream)]/80"}>Register</Button></Link>
            <Link href="/register" className="w-8/10 flex-shrink"><Button variant={'yellow'} className={"w-full rounded-full bg-white text-[var(--green)] hover:bg-white/80"}>Forgot Password</Button></Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
        <div className="py-6 w-5/8 h-full flex flex-col justify-center gap-4 px-12">
          <CardHeader className={"text-center"}>
            <CardTitle className={"font-bold text-4xl"}>LOGIN</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div style={{ transform: "scale(0.8)", transformOrigin: "0 0" }}>
                  <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setCaptcha} className="w-1/2 px-6" />
                </div>
              </div>
              </form>
              {
                error && <p className="text-sm text-red-600">{error}</p>
              }
            </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full rounded-full text-white hover:text-white" variant={'matcha'}>
              Login
            </Button>
          </CardFooter>
        </div>
        </div>
      </Card>
    </div>
  );
}
