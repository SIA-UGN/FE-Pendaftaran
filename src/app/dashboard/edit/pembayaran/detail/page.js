"use client";

import {
  usePaymentMethod,
  useUpdatePaymentMethod,
} from "@/hooks/usePaymentMethod";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Heading } from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  method_type: z.string().min(1, "Jenis harus diisi"),
  bank_name: z.string().min(3, "Nama bank minimal 3 karakter"),
  account_number: z.string().min(5, "Nomor rekening minimal 5 karakter"),
  account_holder: z.string().min(3, "Nama penerima minimal 3 karakter"),
});

export default function DetailPaymentMethod() {
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

  // Set form values ketika data berhasil dimuat
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Memuat data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  const data = paymentMethodData?.data?.data;

  const onSubmit = (formData) => {
    updatePaymentMethod({
      id: id,
      data: formData,
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl my-6 sm:my-8 lg:my-12 w-full">
          <Heading title="Metode Pembayaran" variant="first" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6 w-full"
            >
              <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-8 lg:p-12 border rounded-lg sm:rounded-xl bg-[var(--yellow)]">
                <FormField
                  control={form.control}
                  name="account_holder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Nama Penerima
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama penerima"
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
                  name="account_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Nomor Rekening
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nomor rekening"
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
                  name="bank_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Nama Bank
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama bank"
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
                  name="method_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Metode Pembayaran
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Transfer Bank, E-Wallet"
                          className="text-sm sm:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full sm:w-auto ms-auto"
                  variant={"green"}
                >
                  {isUpdating ? "Memperbarui..." : "Perbarui Pembayaran"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
