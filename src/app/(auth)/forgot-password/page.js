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
  const [showDialog, setShowDialog] = useState(false);
  
  // State untuk form reset password
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const {
    mutate: forgotPasswordMutation,
    isLoading: isForgotLoading,
    isError,
    error,
  } = useForgotPassword();

  const resetPasswordMutation = useResetPassword();

  if (isError) return <div>Error: {error.message}</div>;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) return;

    forgotPasswordMutation(
      { email },
      {
        onSuccess: () => {
          setShowDialog(true);
          toast.success("Token has been sent to your email");
        },
      }
    );
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
        token,
        password,
        password_confirmation: passwordConfirmation,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successful");
          setShowDialog(false);
          // Reset form
          setEmail("");
          setToken("");
          setPassword("");
          setPasswordConfirmation("");
        },
      }
    );
  }

  return (
    <div className="flex items-center gap-6 w-screen h-screen justify-center bg-[url('/auth.png')] bg-cover">
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
            <Link href="/login" className="w-8/10 flex-shrink">
              <Button
                variant={"yellow"}
                className={
                  "w-full rounded-full bg-[var(--light-cream)] text-[var(--green)] hover:bg-[var(--light-cream)]/80"
                }
              >
                Login
              </Button>
            </Link>
            <Link href="/register" className="w-8/10 flex-shrink">
              <Button
                variant={"yellow"}
                className={
                  "w-full rounded-full bg-white text-[var(--green)] hover:bg-white/80"
                }
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-end bg-white rounded-[5vw]">
          <div className="py-6 w-full md:w-5/8 h-full flex flex-col justify-center gap-4 md:px-12">
            <CardHeader className={"text-center"}>
              <CardTitle
                className={"font-bold text-2xl md:text-3xl text-[var(--green)]"}
              >
                Forgot Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="grid gap-12 overflow-auto"
              >
                <div className="flex flex-col gap-6 w-full">
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
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full text-white hover:text-white"
                  variant={"green"}
                  disabled={isForgotLoading}
                >
                  {isForgotLoading ? "Sending..." : "Send Token"}
                </Button>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Reset Password Alert Dialog */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-[var(--green)]">
              Reset Password
            </AlertDialogTitle>
            <AlertDialogDescription>
              Enter the token from your email and your new password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleResetPassword} className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="dialog-email">Email</Label>
              <Input
                id="dialog-email"
                type="email"
                value={email}
                disabled
                className="bg-gray-100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="token">Token</Label>
              <Input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter token from email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="green"
                className="flex-1 text-white"
                disabled={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending
                  ? "Resetting..."
                  : "Reset Password"}
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}