"use client";

import {
  usePaymentMethod,
  useUpdatePaymentMethod,
} from "@/hooks/usePaymentMethod";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

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
import { ArrowLeft, CreditCard } from "lucide-react";

const FormSchema = z.object({
  method_type: z.string().min(1, "Jenis harus diisi"),
  bank_name: z.string().min(3, "Nama bank minimal 3 karakter"),
  account_number: z.string().min(5, "Nomor rekening minimal 5 karakter"),
  account_holder: z.string().min(3, "Nama penerima minimal 3 karakter"),
});

export default function DetailPaymentMethod() {
  return (
    <Suspense fallback={null}>
      <DetailPaymentMethodInner />
    </Suspense>
  );
}

function DetailPaymentMethodInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const {
    data: paymentMethodData,
    isLoading,
    isError,
    error,
  } = usePaymentMethod(id);

  const { mutate: updatePaymentMethod, isPending: isUpdating } =
    useUpdatePaymentMethod();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      method_type: "",
      bank_name: "",
      account_number: "",
      account_holder: "",
    },
  });

  useEffect(() => {
    if (paymentMethodData?.data?.data) {
      const data = paymentMethodData.data.data;
      form.reset({
        method_type: data.method_type || "",
        bank_name: data.bank_name || "",
        account_number: data.account_number || "",
        account_holder: data.account_holder || "",
      });
    }
  }, [paymentMethodData, form]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border p-6 animate-pulse" style={{ borderColor: '#E6EEE9' }}>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border p-8" style={{ borderColor: '#E6EEE9' }}>
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  const onSubmit = (formData) => {
    updatePaymentMethod(
      { id, data: formData },
      { onSuccess: () => router.push("/dashboard/edit/pembayaran") }
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6EEE9' }}>
            <CreditCard className="w-5 h-5" style={{ color: '#015023' }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#015023' }}>Detail Metode Pembayaran</h2>
            <p className="text-xs text-gray-400">Perbarui informasi metode pembayaran</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="account_holder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nama Penerima</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama penerima" className="rounded-xl border-gray-200" {...field} />
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
                    <Input placeholder="Masukkan nomor rekening" className="rounded-xl border-gray-200" {...field} />
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
                    <Input placeholder="Masukkan nama bank" className="rounded-xl border-gray-200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Metode Pembayaran</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Transfer Bank, E-Wallet" className="rounded-xl border-gray-200" {...field} />
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
                disabled={isUpdating}
                className="rounded-xl px-6 text-white"
                style={{ backgroundColor: '#015023' }}
              >
                {isUpdating ? "Memperbarui..." : "Perbarui Pembayaran"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
