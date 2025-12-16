"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import toast from "react-hot-toast";
import { useUserProfile, useUpdateUser } from "@/hooks/useAdmin";
import { useManagers } from "@/hooks/useAdmin";
import { Heading } from "@/components/Heading";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi" }),
  email: z.string().email({ message: "Email tidak valid" }),
});

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const { data, isLoading, isError, error } = useManagers();
  const { data: managerData, isLoading: userLoading } = useUserProfile(id);
  const updateUser = useUpdateUser();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const userData = data?.data?.data?.find((m) => m.id_user === parseInt(id));
    if (userData) {
      const name = userData.name || userData.full_name || "";
      const email = userData.email || "";
      form.reset({ name, email });
    }
  }, [data, id, form]);

  async function onSubmit(values) {
    if (!id) return toast.error("ID manajer tidak ditemukan");

    try {
      const payload = {
        name: values.name,
        email: values.email,
      };
      await updateUser.mutateAsync({ id, data: payload });
      router.push("/dashboard/data");
    } catch (error) {
      console.error(error);
    }
  }

  if (!id) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <p className="text-red-600">
          ID manajer tidak ditemukan pada parameter.
        </p>
      </div>
    );
  }

  const userData = data?.data?.data?.find((m) => m.id_user === parseInt(id));

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl my-6 sm:my-8 lg:mb-12 w-full">
      <Heading title="Edit Data Manager" />
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
                  <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
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
              disabled={updateUser.isPending}
            >
              {updateUser.isPending ? "Menyimpan..." : "Update Data"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
