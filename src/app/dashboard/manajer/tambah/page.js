"use client";

import PenambahanManajer from "@/components/admin/PenambahanManajer";
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
import { Heading } from "@/components/Heading";

import { useCreateManager } from "@/hooks/useAdmin";

import { useRouter } from "next/navigation";

import Link from "next/link";

const FormSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  noRegistrasi: z
    .string()
    .min(10, "Nomor registrasi minimal 10 digit")
    .regex(/^0\d+$/, "Nomor harus diawali dengan 0 dan hanya angka"),
});

export default function TambahManajer() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      namaLengkap: "",
      username: "",
      email: "",
      noRegistrasi: "",
    },
  });

  const { mutate: createManager, isLoading } = useCreateManager();

  const onSubmit = (data) => {
    // Map form fields to backend
    const payload = {
      name: data.namaLengkap,
      email: data.email,
      username: data.username,
      nomor_registrasi: data.noRegistrasi,
    };

    createManager(payload, {
      onSuccess: () => {
        router.push({
          pathname: "/dashboard/manajer/tambah/validasi",
          query: { ...payload },
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <PenambahanManajer />

      <div className="flex flex-col items-center px-4 sm:px-8 max-w-6xl my-12 w-full">
        <Heading title={"Data Manajer Baru"} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <div className="flex flex-col gap-5 p-12 border rounded-xl bg-[var(--yellow)]">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
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
                name="noRegistrasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Registrasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Nomor Registrasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="yellow"
                onClick={() => router.back()}
                className={"w-48 rounded-2xl"}
              >
                Kembali
              </Button>
              <Button
                type="submit"
                variant={"green"}
                className={"w-48 rounded-2xl"}
                disabled={isLoading}
              >
                {isLoading ? "Menyimpan..." : "Lanjut"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
