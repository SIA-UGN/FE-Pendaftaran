"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { Label } from "@/components/ui/label";

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
    
            if (!res.ok) throw new Error("Unauthorized");
    
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
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 m-12">
                <h2 className="text-xl font-semibold">Profil</h2>
            </div>
            <div className="w-full flex items-center justify-center relative flex-col gap-4 my-6">
            <Input id="picture" type="file" className="absolute w-0 opacity-0" />
            <Image
                src={user.picture}
                width={200}
                height={600}
                alt="profile-image"
                className="object-cover rounded-2xl"
                />
                <div className="py-6 w-xl flex flex-col gap-6">
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input type="text" id="name" value={user.name} />
                    </div>
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" value={user.email} />
                    </div>
                    <div className="grid w-full  items-center gap-3">
                        <Label htmlFor="email">Change Password</Label>
                        <Input type="password" id="password" value={user.password} />
                    </div>
                </div>
                    
                
            </div>
        </div>
    )
}