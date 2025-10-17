"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { getCookie } from "cookies-next";

export default function InformasiProfil() {
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
    <div className="flex flex-col gap-4 p-6 w-full mx-6">
      <h6 className="flex items-center gap-2 text-3xl font-semibold border-b pb-2">
        <User size={30} /> Akun
      </h6>

      <div className="flex items-center gap-4">
        <div className="w-[200px] flex items-center justify-center relative">
          <Input id="picture" type="file" className="absolute w-0 opacity-0" />
          <Image
            src={user.picture}
            width={200}
            height={200}
            alt="profile-image"
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg flex">
            <span className="w-[100px] font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-lg flex">
            <span className="w-[100px] font-semibold">Name:</span> {user.name}
          </p>
        </div>
      </div>
    </div>
  );
}
