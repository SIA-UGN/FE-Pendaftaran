"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { Label } from "@/components/ui/label";

import { SquarePen } from 'lucide-react';

export default function Profil() {
    const [user, setUser] = useState({ name: "", email: "", picture: "/logo.jpg" });
    
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
              router.push("/login");
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
      <div className="my-12">
          <div className="flex flex-col items-center pt-4 pb-16 px-4 sm:px-8 max-w-11/12 mx-auto">
            <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
              Profil Saya
            </h2>
            <div className="w-full h-full flex items-center justify-center relative flex-col gap-4 my-6">
            <Input id="picture" type="file" className="absolute w-0 opacity-0" />
            <Image
                src={user.picture}
                width={200}
                height={600}
                alt="profile-image"
                className="object-cover rounded-2xl"
                />
                <div className="py-6 w-full flex flex-col gap-6">
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input type="text" id="name" value={user.name} readOnly/>
                    </div>
                    <div className="grid w-full items-center gap-3">
              <Label htmlFor="email">Email</Label>
                    <div className="relative w-full">
                <Input type="email" id="email" value={user.email} onChange/> <SquarePen size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />

                    </div>
                    </div>
                    <div className="grid w-full  items-center gap-3">
              <Label htmlFor="email">Change Password</Label>
                    <div className="relative w-full">
                        <Input type="password" id="password" value={"••••••••"} onChange/> <SquarePen size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    </div>
                </div> 
            </div>
      </div>
    </div>
    )
}