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

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Password dan konfirmasi harus sama");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal register");
        return;
      }

      const token = data.data.access_token;
      localStorage.setItem("token", token);

      router.push("/login");
    } catch (err) {
      console.error("Error saat register:", err);
      setError("Terjadi kesalahan pada sistem");
    }
  }

  return (
    <div>
        <div className="flex items-center gap-6 w-screen h-screen justify-center bg-[url('/auth.png')] bg-cover ">
          <Card className="w-3/4 w-m-7/8 max-w-11/12 flex flex-col md:flex-row gap-2 p-12 md:p-0 h-full md:h-3/4 relative rounded-[5vw]">
            <div className="w-full md:w-3/8 min-h-fit h-11/10 bg-[var(--green)] flex items-center justify-between flex-col px-4 gap-4 rounded-[5vw] md:absolute overflow-hidden left-[-10px] md:top-1/2 md:-translate-y-1/2 py-12">
              <div className="flex flex-col items-center gap-2 w-full h-3/4 justify-center">
                <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72">
                <Image
                    src="/logo.jpg"
                    alt="logo"
                    fill
                    style={{ objectFit: "contain" }}
                />
                </div>
                <CardHeader className="text-[var(--cream)] text-center w-full p-0 scroll-m-20 text-lg md:text-3xl font-bold tracking-tight">
                  UNIVERSITAS GLOBAL NUSANTARA
                </CardHeader>
              </div>
              <div className="flex flex-col gap-2 w-full items-center h-1/4 justify-center">
                <Link href="/login" className="w-8/10 flex-shrink "><Button variant={'yellow'} className={"w-full rounded-full bg-[var(--light-cream)] text-[var(--green)] hover:bg-[var(--light-cream)]/80"}>Login</Button></Link>
              </div>
            </div>
            <div className="w-full flex items-center justify-end">
            <div className="py-6 w-full md:w-5/8 h-full flex flex-col justify-center gap-4 md:px-12">
              <CardHeader className={"text-center"}>
                <CardTitle className={"font-bold text-4xl"}>REGISTER</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                
                  <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
            onChange={e => setEmail(e.target.value)}
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input id="password" type="password" value={password}
            onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="parssword_confirmation">Confirm Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                  </div>
                    <Button type="submit" className="w-full rounded-full text-white hover:text-white" variant={'green'}>
                    Register
                    </Button>
                </form>
              </CardContent>
            </div>
            </div>
          </Card>
        </div>
    </div>
  );
}
