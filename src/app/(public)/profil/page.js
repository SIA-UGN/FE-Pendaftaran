"use client";

import { useEffect, useState } from "react";
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
import { SquarePen } from "lucide-react";
import { useProfile, useUploadAvatar } from "@/hooks/useProfile";
import { useChangePassword } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function Profil() {
  const { data: profileData, isPending: isLoadingProfile } = useProfile();
  const user = profileData?.data?.user;

  const uploadAvatarMutation = useUploadAvatar();
  const changePasswordMutation = useChangePassword();

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleEditClick = ({ title, message, type }) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setInputValue("");
    setCurrentPassword("");
    setNewPassword("");
    setPasswordConfirmation("");
    setOpen(true);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Hanya file gambar yang diizinkan");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatarMutation.mutate(formData);
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
      toast.info("Fitur ubah email belum tersedia");
      setOpen(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--green)]"></div>
      </div>
    );
  }

  return (
    <div className="my-12">
      <div className="flex flex-col items-center pt-4 pb-16 px-4 sm:px-8 max-w-11/12 mx-auto">
        <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
          Profil Saya
        </h2>
        <div className="w-full h-full flex items-center justify-center relative flex-col gap-4 my-6">
          <Input id="picture" type="file" className="absolute w-0 opacity-0" />
          <div className="relative w-72 h-96 rounded-xl cursor-pointer group">
            <Image
              src={user?.avatar_url || "/logo.jpg"}
              fill
              alt="profile-image"
              className="object-cover rounded-2xl transition duration-300 group-hover:opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl">
              <Button
                className="text-white font-semibold text-lg rounded-md cursor-pointer"
                variant={"green"}
              >
                Upload Image
              </Button>
            </div>
          </div>
          <div className="py-6 w-full flex flex-col gap-6">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input type="text" id="name" value={user?.name || ""} readOnly />
            </div>
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="email">Email</Label>
              <div className="relative w-full">
                <Input
                  type="email"
                  id="email"
                  value={user?.email || ""}
                  readOnly
                />
                <SquarePen
                  size={16}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() =>
                    handleEditClick({
                      title: "Ubah Email",
                      message: "Tuliskan email baru anda di bawah!",
                      type: "email",
                    })
                  }
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="password">Change Password</Label>
              <div className="relative w-full">
                <Input
                  type="password"
                  id="password"
                  value={"••••••••"}
                  readOnly
                />
                <SquarePen
                  size={16}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() =>
                    handleEditClick({
                      title: "Ubah Password",
                      message: "Isi form di bawah untuk mengubah password!",
                      type: "password",
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p className="mb-2">{alertMessage}</p>

                {alertType === "email" && (
                  <Input
                    type="email"
                    placeholder="Email baru"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                )}

                {alertType === "password" && (
                  <>
                    <Input
                      type="password"
                      placeholder="Password saat ini"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Password baru (min 8 karakter)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Konfirmasi password baru"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSave}
                className="bg-[var(--green)]"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending ? "Menyimpan..." : "Simpan"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
