"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Mail, SquarePen, Upload } from "lucide-react";
import { useProfile, useUploadAvatar } from "@/hooks/useProfile";
import { useChangePassword, useChangeEmail } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function Profil() {
  const { data: profileData, isPending: isLoadingProfile } = useProfile();
  const user = profileData?.data?.data?.user;

  const uploadAvatarMutation = useUploadAvatar();
  const changePasswordMutation = useChangePassword();
  const changeEmailMutation = useChangeEmail();

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [emailPassword, setEmailPassword] = useState("");
  const [emailPasswordConfirmation, setEmailPasswordConfirmation] =
    useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const isSaving = changePasswordMutation.isPending || changeEmailMutation.isPending;

  const handleEditClick = ({ title, message, type }) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setInputValue("");
    setCurrentPassword("");
    setNewPassword("");
    setPasswordConfirmation("");
    setEmailPassword("");
    setEmailPasswordConfirmation("");
    setOpen(true);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB!");
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar!");
      e.target.value = "";
      return;
    }

    uploadAvatarMutation.mutate(file, {
      onSuccess: () => {
        e.target.value = "";
      },
    });
  };

  const handleSave = () => {
    if (alertType === "password") {
      if (!currentPassword || !newPassword || !passwordConfirmation) {
        toast.error("Semua field password harus diisi!");
        return;
      }

      if (newPassword !== passwordConfirmation) {
        toast.error("Konfirmasi password tidak cocok!");
        return;
      }

      if (newPassword.length < 8) {
        toast.error("Password baru minimal 8 karakter!");
        return;
      }

      changePasswordMutation.mutate(
        {
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: passwordConfirmation,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setCurrentPassword("");
            setNewPassword("");
            setPasswordConfirmation("");
          },
        }
      );
    } else if (alertType === "email") {
      if (!inputValue || !inputValue.includes("@")) {
        toast.error("Email tidak valid!");
        return;
      }

      if (!emailPassword) {
        toast.error("Password harus diisi untuk mengganti email.");
        return;
      }

      if (emailPassword !== emailPasswordConfirmation) {
        toast.error("Konfirmasi password tidak cocok!");
        return;
      }

      changeEmailMutation.mutate(
        {
          email: inputValue,
          password: emailPassword,
          password_confirmation: emailPasswordConfirmation,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setInputValue("");
            setEmailPassword("");
            setEmailPasswordConfirmation("");
          },
        }
      );
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        <div className="h-20 rounded-2xl bg-white border animate-pulse" style={{ borderColor: "#E6EEE9" }} />
        <div className="h-[420px] rounded-2xl bg-white border animate-pulse" style={{ borderColor: "#E6EEE9" }} />
      </div>
    );
  }

  const applicant = profileData?.data?.data;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: "#E6EEE9" }}>
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#015023" }}>
          Profil Saya
        </h2>
        <p className="text-sm text-gray-500 mt-1">Kelola informasi akun dan keamanan login Anda.</p>
      </div>

      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: "#E6EEE9" }}>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarUpload}
          disabled={uploadAvatarMutation.isPending}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 sm:gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border" style={{ borderColor: "#E6EEE9" }}>
              <Image
                alt="Avatar pengguna"
                src={applicant?.user?.avatar_url || "/default-avatar-male.webp"}
                fill
                sizes="(max-width: 640px) 176px, 224px"
                className="object-cover"
              />
            </div>

            <label htmlFor="picture" className="w-full max-w-[224px]">
              <Button type="button" variant="primary" className="w-full" disabled={uploadAvatarMutation.isPending}>
                {uploadAvatarMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Mengunggah...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Ubah Foto Profil
                  </>
                )}
              </Button>
            </label>
          </div>

          <div className="space-y-6">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input type="text" id="name" value={user?.name || ""} readOnly className="bg-gray-50" />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <div className="relative w-full">
                <Input type="email" id="email" value={user?.email || ""} readOnly className="pr-10 bg-gray-50" />
                <SquarePen
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[var(--green)] transition-colors"
                  onClick={() =>
                    handleEditClick({
                      title: "Ubah Email",
                      message: "Tuliskan email baru Anda di bawah:",
                      type: "email",
                    })
                  }
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative w-full">
                <Input type="password" id="password" value="••••••••" readOnly className="pr-10 bg-gray-50" />
                <SquarePen
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[var(--green)] transition-colors"
                  onClick={() =>
                    handleEditClick({
                      title: "Ubah Password",
                      message: "Isi form di bawah untuk mengubah password:",
                      type: "password",
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent
            className="rounded-2xl border shadow-2xl p-0 overflow-hidden bg-white"
            style={{ borderColor: "#E6EEE9" }}
          >
            <AlertDialogHeader className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "#E6EEE9" }}>
              <AlertDialogTitle style={{ color: "#015023" }}>{alertTitle}</AlertDialogTitle>
              <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
            </AlertDialogHeader>

            <div className="px-6 py-5 space-y-4">
              {alertType === "email" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="new-email" className="text-xs uppercase tracking-wide" style={{ color: "#015023" }}>
                      Email Baru
                    </Label>
                    <Input
                      id="new-email"
                      type="email"
                      placeholder="Masukkan email baru"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-password" className="text-xs uppercase tracking-wide" style={{ color: "#015023" }}>
                      Password
                    </Label>
                    <Input
                      id="email-password"
                      type="password"
                      placeholder="Masukkan password Anda"
                      value={emailPassword}
                      onChange={(e) => setEmailPassword(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-password-confirm" className="text-xs uppercase tracking-wide" style={{ color: "#015023" }}>
                      Konfirmasi Password
                    </Label>
                    <Input
                      id="email-password-confirm"
                      type="password"
                      placeholder="Ulangi password Anda"
                      value={emailPasswordConfirmation}
                      onChange={(e) => setEmailPasswordConfirmation(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </>
              )}

              {alertType === "password" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="current" className="text-xs uppercase tracking-wide" style={{ color: "#015023" }}>
                      Password Saat Ini
                    </Label>
                    <Input
                      type="password"
                      id="current"
                      placeholder="Masukkan password saat ini"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new" className="text-xs uppercase tracking-wide" style={{ color: "#015023" }}>
                      Password Baru
                    </Label>
                    <Input
                      type="password"
                      id="new"
                      placeholder="Minimal 8 karakter"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="text-xs uppercase tracking-wide" style={{ color: "#015023" }}>
                      Konfirmasi Password Baru
                    </Label>
                    <Input
                      type="password"
                      id="confirm"
                      placeholder="Ulangi password baru"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </>
              )}
            </div>

            <AlertDialogFooter className="px-6 pb-6 pt-2">
              <AlertDialogCancel asChild>
                <Button variant="outline" disabled={isSaving}>
                  Batal
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
