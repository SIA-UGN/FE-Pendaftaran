"use client";

import PenambahanManajer from "@/components/PenambahanManajer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link"

// 🧩 Schema Validasi
const FormSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  noHandphone: z
    .string()
    .min(10, "Nomor handphone minimal 10 digit")
    .regex(/^0\d+$/, "Nomor harus diawali dengan 0 dan hanya angka"),
  hakAkses: z.array(z.string()).min(1, "Pilih minimal satu hak akses"),
});

export default function TambahManajer() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      namaLengkap: "",
      username: "",
      email: "",
      noHandphone: "",
      hakAkses: [],
    },
  });

  const onSubmit = async (data) => {
    console.log("Data dikirim:", data);

    try {
      const res = await fetch("/api/manajer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal menambahkan manajer");

      const result = await res.json();
      alert("Manajer berhasil ditambahkan ✅");
      console.log("Response:", result);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menambahkan manajer ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <PenambahanManajer />

      <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            
            {/* === BAGIAN 1: DATA MANAJER === */}
            <h2 className="text-3xl sm:text-2xl font-semibold mb-6 mt-12 w-full border-b-2 border-black pb-2 text-[var(--green)]">
              Data Manajer Baru
            </h2>

            <div className="flex flex-col gap-5 p-12 border rounded-xl bg-[var(--light-cream)]">
              <FormField
                control={form.control}
                name="namaLengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noHandphone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Handphone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="08xxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center justify-end gap-2">
              <Link href="/dashboard/manajer/tambah/validasi">
              <Button type="submit" variant={"matcha"} className={"w-48 rounded-md"}>
                Kembali
              </Button>
              </Link>
              <Button type="submit" variant={"matcha"} className={"w-48 rounded-md"}>
                Lanjut
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
