"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { SquarePen } from 'lucide-react';

export default function Profil() {
    const [user, setUser] = useState({ name: "", email: "", picture: "/logo.jpg" });
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertTitle, setAlertTitle] = useState("")
    
    const handleEditClick = ({ title, message }) => {
      setAlertTitle(title)
      setAlertMessage(message)
      setOpen(true)
    }
    
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const token = getCookie("access_token");

            if (!token) return;
    
            const res = await fetch("http://localhost:8000/api/auth/user", {
              method: "GET",
              headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });
    
            if (!res.ok) {
              console.warn("Token invalid, redirect ke login");
              // router.push("/login");
            }
    
            const data = await res.json();
            const userData = data.data.user;
    
            setUser({
              name: userData.name || "User",
              email: userData.email || "user@example.com",
              picture: userData.picture || "/logo.jpg",
            });
          } catch (err) {
            console.error("Gagal ambil data user:", err);
          }
        };
    
        fetchUser();
      }, []);
    
    return (
      <div className="py-8 md:py-12 lg:py-16">
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8 w-full border-b border-gray-300 pb-3 md:pb-4 text-[var(--green)]">
            Profil Saya
          </h2>
          
          <div className="w-full flex flex-col items-center gap-6 md:gap-8 my-4 md:my-6">
            {/* Profile Image Section */}
            <div className="relative w-full flex flex-col items-center gap-4">
              <Input id="picture" type="file" className="absolute w-0 opacity-0" />
              <div className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-xl cursor-pointer group">
                <Image
                  src={user.picture}
                  fill
                  alt="profile-image"
                  className="object-cover rounded-2xl transition duration-300 group-hover:opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl">
                  <Button 
                    className="text-white font-semibold text-sm md:text-base lg:text-lg rounded-md cursor-pointer px-4 py-2 md:px-6 md:py-3" 
                    variant="green"
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-2xl flex flex-col gap-4 md:gap-6">
              {/* Nama Lengkap */}
              <div className="grid w-full items-center gap-2 md:gap-3">
                <Label htmlFor="name" className="text-sm md:text-base">Nama Lengkap</Label>
                <Input 
                  type="text" 
                  id="name" 
                  value={user.name} 
                  readOnly
                  className="text-sm md:text-base"
                />
              </div>

              {/* Email */}
              <div className="grid w-full items-center gap-2 md:gap-3">
                <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                <div className="relative w-full">
                  <Input 
                    type="email" 
                    id="email" 
                    value={user.email} 
                    readOnly
                    className="pr-10 text-sm md:text-base"
                    onClick={() => handleEditClick({
                      title: "Ubah Email",
                      message: "Tuliskan email baru anda di bawah!",
                    })}
                  />
                  <SquarePen 
                    size={16} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" 
                  />
                </div>
              </div>

              {/* Change Password */}
              <div className="grid w-full items-center gap-2 md:gap-3">
                <Label htmlFor="password" className="text-sm md:text-base">Change Password</Label>
                <div className="relative w-full">
                  <Input 
                    type="password" 
                    id="password" 
                    value="••••••••" 
                    readOnly
                    className="pr-10 text-sm md:text-base"
                    onClick={() => handleEditClick({
                      title: "Ubah Password",
                      message: "Tuliskan password baru anda di bawah!",
                    })} 
                  />
                  <SquarePen 
                    size={16} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alert Dialog */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="w-[90%] max-w-md sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg md:text-xl">{alertTitle}</AlertDialogTitle>
              <AlertDialogDescription className="text-sm md:text-base">
                {alertMessage}
                <Input 
                  type="password" 
                  id="new-password" 
                  className="mt-3 md:mt-4 text-sm md:text-base"
                  placeholder="Masukkan password baru"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <AlertDialogCancel className="w-full sm:w-auto text-sm md:text-base">
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setOpen(false)
                  console.log("Aksi dikonfirmasi!")
                }}
                className="bg-[var(--green)] w-full sm:w-auto text-sm md:text-base hover:bg-[var(--green)]/90"
              >
                Simpan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
}