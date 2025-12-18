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
import { Heading } from "@/components/Heading";
import { useRouter } from "next/navigation";
import { useCreatePaymentMethod } from "@/hooks/usePaymentMethod";

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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-6xl my-6 sm:my-8 lg:my-12 w-full">
        <Heading title="Tambah Metode Pembayaran" variant="first" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <div className="flex flex-col gap-5 p-8 border rounded-xl bg-[var(--yellow)]">
              <FormField
                control={form.control}
                name="method_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Pembayaran</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bank, E-Wallet, Transfer"
                        {...field}
                      />
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
                    <FormLabel>Nama Bank</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: BCA, BRI, Mandiri"
                        {...field}
                      />
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
                    <FormLabel>Nomor Rekening</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nomor rekening pembayaran"
                        {...field}
                      />
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
                    <FormLabel>Nama Pemilik Rekening</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama pemilik rekening" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="yellow"
                onClick={() => router.back()}
                className="w-40 rounded-2xl"
              >
                Kembali
              </Button>

              <Button
                type="submit"
                variant="green"
                className="w-40 rounded-2xl"
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
