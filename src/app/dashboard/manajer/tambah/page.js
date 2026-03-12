"use client";

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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateManager } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";
import { Info, UserPlus, ArrowLeft } from "lucide-react";

const FormSchema = z
  .object({
    name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    passwordConfirmation: z.string().min(8, "Password minimal 8 karakter"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password tidak cocok",
    path: ["passwordConfirmation"],
  });

export default function TambahManajer() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { mutate: createManager, isLoading } = useCreateManager();

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    };

    createManager(payload, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E6EEE9' }}>
            <Info className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: '#015023' }}>Informasi Tahapan</h2>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Masukkan data manajer baru pada form</li>
              <li>Periksa kembali data manajer sebelum disimpan dan mengirimkan email aktivasi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6EEE9' }}>
            <UserPlus className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#015023' }}>Data Manajer Baru</h2>
            <p className="text-xs text-gray-400">Isi form di bawah untuk mendaftarkan manajer baru</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Lengkap" className="rounded-xl border-gray-200" {...field} />
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
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" className="rounded-xl border-gray-200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Minimal 8 karakter" className="rounded-xl border-gray-200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Ulangi password" className="rounded-xl border-gray-200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="rounded-xl px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <Button
                type="submit"
                className="rounded-xl px-6 text-white"
                style={{ backgroundColor: '#015023' }}
                disabled={isLoading}
              >
                {isLoading ? "Menyimpan..." : "Tambah Manajer"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

