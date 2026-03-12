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
import { useRouter } from "next/navigation";
import { useCreatePaymentMethod } from "@/hooks/usePaymentMethod";
import { ArrowLeft, Plus } from "lucide-react";

const FormSchema = z.object({
  method_type: z.string().min(1, "Jenis pembayaran harus diisi"),
  bank_name: z.string().min(1, "Nama bank harus diisi"),
  account_number: z.string().min(1, "Nomor rekening harus diisi"),
  account_holder: z.string().min(1, "Nama pemilik rekening harus diisi"),
});

export default function TambahMetodePembayaran() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      method_type: "",
      bank_name: "",
      account_number: "",
      account_holder: "",
    },
  });

  const { mutate: createPaymentMethod, isLoading } = useCreatePaymentMethod();

  const onSubmit = (data) => {
    createPaymentMethod(data, {
      onSuccess: () => {
        router.push("/dashboard/edit/pembayaran");
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6EEE9' }}>
            <Plus className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#015023' }}>Tambah Metode Pembayaran</h2>
            <p className="text-xs text-gray-400">Tambahkan metode pembayaran baru</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="method_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Jenis Pembayaran</FormLabel>
                  <FormControl>
                    <Input placeholder="Bank, E-Wallet, Transfer" className="rounded-xl border-gray-200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nama Bank</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: BCA, BRI, Mandiri" className="rounded-xl border-gray-200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nomor Rekening</FormLabel>
                  <FormControl>
                    <Input placeholder="Nomor rekening pembayaran" className="rounded-xl border-gray-200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_holder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nama Pemilik Rekening</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama pemilik rekening" className="rounded-xl border-gray-200" {...field} />
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
                {isLoading ? "Menyimpan..." : "Tambah Metode"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

