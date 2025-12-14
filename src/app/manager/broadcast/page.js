"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Heading } from "@/components/Heading";
import { useCreateBroadcastNotification } from "@/hooks/useManager";

const FormSchema = z.object({
  targetAudience: z.string().min(1, {
    message: "Target Audience wajib dipilih.",
  }),
  messageTitle: z.string().min(3, {
    message: "Judul pesan harus memiliki setidaknya 3 karakter.",
  }),
  messageContent: z.string().min(10, {
    message: "Isi pesan harus memiliki setidaknya 10 karakter.",
  }),
  scheduleDate: z.string().min(1, {
    message: "Tanggal pengiriman wajib diisi.",
  }),
});

export default function BroadcastMessage() {
  const router = useRouter();
  const { mutate: setBroadcast, isLoading: isBroadcastLoading } =
    useCreateBroadcastNotification();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      targetAudience: "all_applicants",
      messageTitle: "",
      messageContent: "",
      scheduleDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data) => {
    const statusMap = {
      all_applicants: null,
      pending_applicants: "submitted",
      approved_applicants: "approved",
      rejected_applicants: "rejected",
    };

    const payload = {
      title: data.messageTitle,
      message: data.messageContent,
      type: "info",
    };

    const mappedStatus = statusMap[data.targetAudience];
    if (mappedStatus) {
      payload.registration_status = mappedStatus;
    }

    setBroadcast(payload, {
      onSuccess: () => {
        router.push("/manager");
      },
    });
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mx-4 sm:mx-8 md:mx-12 ">
          <Heading title={"Broadcast Notifikasi"} />
        </div>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 sm:gap-5 rounded-xl mx-4 sm:mx-8 md:mx-12">
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih target audience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all_applicants">
                          Semua Pendaftar
                        </SelectItem>
                        <SelectItem value="pending_applicants">
                          Pendaftar Pending
                        </SelectItem>
                        <SelectItem value="approved_applicants">
                          Pendaftar Diterima
                        </SelectItem>
                        <SelectItem value="rejected_applicants">
                          Pendaftar Ditolak
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="messageTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Pesan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Pengumuman Penting"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="messageContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Isi Pesan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tulis isi pesan Anda di sini..."
                        className={"bg-white"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduleDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Pengiriman</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center justify-end gap-4 my-8 sm:my-12 px-4 sm:px-8 md:px-12">
              <Link href="/broadcast">
                <Button
                  type="button"
                  variant="yellow"
                  className="w-full sm:w-48"
                >
                  Batal
                </Button>
              </Link>
              <Button
                variant="green"
                className="w-full sm:w-48"
                type="submit"
                disabled={isBroadcastLoading}
              >
                Kirim Broadcast
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ProtectedRoute>
  );
}
