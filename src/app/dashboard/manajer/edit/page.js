"use client";

import { Suspense, useEffect } from "react";
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
import { ArrowLeft, UserCog } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi" }),
  email: z.string().email({ message: "Email tidak valid" }),
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageInner />
    </Suspense>
  );
}

function PageInner() {
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
      <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E6EEE9' }}>
        <p className="text-red-600">ID manajer tidak ditemukan pada parameter.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border p-6 animate-pulse" style={{ borderColor: '#E6EEE9' }}>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6" />
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6EEE9' }}>
            <UserCog className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#015023' }}>Edit Data Manager</h2>
            <p className="text-xs text-gray-400">Perbarui informasi akun manajer</p>
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
                    <Input placeholder="Nama Lengkap" className="rounded-xl border-gray-200 focus:border-[#015023] focus:ring-[#015023]" {...field} />
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
                    <Input type="email" placeholder="Email" className="rounded-xl border-gray-200 focus:border-[#015023] focus:ring-[#015023]" {...field} />
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
                disabled={updateUser.isPending}
              >
                {updateUser.isPending ? "Menyimpan..." : "Update Data"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

