"use client";

import { usePaymentMethod } from "@/hooks/usePaymentMethod";
import { useSearchParams } from "next/navigation";

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

const FormSchema = z.object({
  method_type: z.string().min(1, "Jenis harus diisi"),
  bank_name: z.string().min(3, "Nama penerima minimal 3 karakter"),
  account_number: z.string().min(5, "Nomor bank minimal 5 karakter"),
  account_holder: z.string().min(1, "Cara pembayaran harus dipilih"),
});

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function DetailPaymentMethod() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: paymentMethodData,
    isLoading,
    isError,
    error,
  } = usePaymentMethod(id);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      method_type: "",
      bank_name: "",
      account_number: "",
      account_holder: "",
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error : {error.message}</div>;

  const data = paymentMethodData?.data?.data;

  console.log(data);

  const onSubmit = (data) => {
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl my-6 sm:my-8 lg:my-12 w-full">
          <Heading title="Tambah Metode Pembayaran" variant="first" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6 w-full"
            >
              <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-8 lg:p-12 border rounded-lg sm:rounded-xl bg-[var(--yellow)]">
                <FormField
                  control={form.control}
                  name="method_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Nama Penerima
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={data.account_holder}
                          className="text-sm sm:text-base"
                                  {...field}
                                  readOnly
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
                        Nomor Penerima
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={data.account_number}
                          className="text-sm sm:text-base"
                          {...field}
                          readOnly
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
                        Nama Bank
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={data.bank_name}
                          className="text-sm sm:text-base"
                                  {...field}
                                  readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="account_holder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Metode Pembayaran
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={data.method_type}
                          className="text-sm sm:text-base"
                                  {...field}
                                  readOnly
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
