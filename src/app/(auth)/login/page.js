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
    <div className="flex items-center gap-6 w-screen h-screen justify-center bg-[url('/auth.png')] bg-cover ">
      <Card className="w-3/4 max-w-11/12 flex flex-col md:flex-row gap-2 p-3 md:p-0 h-fit md:h-3/4 relative rounded-[5vw] bg-white justify-center items-center">
        <div className="w-full md:w-3/8 min-h-fit h-11/10 bg-[var(--green)] hidden md:flex items-center justify-between flex-col px-4 md:gap-4 rounded-[5vw] md:absolute overflow-hidden left-md:[-10px] md:top-1/2 md:-translate-y-1/2 md:py-12 absolute left-0">
          <div className="flex flex-row md:flex-col items-center gap-2 w-full h-3/4 justify-center abos">
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
          <div className="flex flex-row md:flex-col gap-2 w-full items-center h-1/4 justify-center">
            <Link href="/register" className="w-8/10 flex-shrink ">
              <Button
                variant={"yellow"}
                className={
                  "w-full rounded-full bg-[var(--light-cream)] text-[var(--green)] hover:bg-[var(--light-cream)]/80"
                }
              >
                Register
              </Button>
            </Link>
            <Link href="/forgot-password" className="w-8/10 flex-shrink">
              <Button
                variant={"yellow"}
                className={
                  "w-full rounded-full bg-white text-[var(--green)] hover:bg-white/80"
                }
              >
                Forgot Password
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-end bg-white  rounded-[5vw]">
          <div className="py-6 w-full md:w-5/8 h-full flex flex-col justify-center gap-4 md:px-12">
            <CardHeader className={"text-center"}>
              <CardTitle
                className={"font-bold text-3xl md:text-4xl text-[var(--green)]"}
              >
                LOGIN
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 overflow-auto"
              >
                <div className="flex flex-col gap-6 flex-1">
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
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      transform: "scale(0.8)",
                      transformOrigin: "0 0",
                    }}
                  >
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={setCaptcha}
                      className="w-full px-6"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="flex-1 rounded-full text-white hover:text-white"
                  variant={"green"}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
              <CardFooter className="flex justify-center md:hidden gap-1 p-0 mt-3">
                <div className="text-sm md:text-md flex flex-col items-center gap-2">
                  <div>Don`t have an account?</div>
                  <a
                    href={"/register"}
                    className="font-bold text-[var(--green)] hover:text-var[(--green)]]/80"
                  >
                    Register
                  </a>
                </div>
              </CardFooter>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
