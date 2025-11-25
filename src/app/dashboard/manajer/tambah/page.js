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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/Heading";

import { useCreateManager } from "@/hooks/useAdmin";

import { useRouter } from "next/navigation";

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
    // Map form fields to backend
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
    <div className="flex flex-col items-center justify-center">
      <PenambahanManajer />

      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl my-6 sm:my-8 lg:my-12 w-full">
        <Heading title="Data Manajer Baru" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6 w-full"
          >
            <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-8 lg:p-12 border rounded-lg sm:rounded-xl bg-[var(--yellow)]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama Lengkap"
                        className="text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        className="text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Minimal 8 karakter"
                        className="text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Konfirmasi Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Ulangi password"
                        className="text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
              <Button
                type="button"
                variant="yellow"
                onClick={() => router.back()}
                className="w-full sm:w-40 lg:w-48 rounded-xl sm:rounded-2xl text-sm sm:text-base py-2 sm:py-3"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                variant="green"
                className="w-full sm:w-40 lg:w-48 rounded-xl sm:rounded-2xl text-sm sm:text-base py-2 sm:py-3"
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
