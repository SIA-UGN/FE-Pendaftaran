"use client"

import { useRouter } from "next/navigation";

import { Info, AlertCircle, XCircle, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import Link from 'next/link'
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

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
        message: "Tanggal pengiriman wajib diisi." 
    }),
    scheduleTime: z.string().min(1, { 
        message: "Waktu pengiriman wajib diisi." 
    }),
});

export default function BroadcastMessage() {
    const router = useRouter();

    async function onSubmit(data) {
        console.log("📤 Data broadcast dikirim:", data);
        try {
            const payload = {
                target_audience: data.targetAudience,
                message_title: data.messageTitle,
                message_content: data.messageContent,
                schedule_date: data.scheduleDate,
                schedule_time: data.scheduleTime,
            };

            const token = getCookie("access_token");
            console.log("🟢 Token dari cookie:", token);

            const res = await fetch("http://localhost:8000/api/broadcast", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log("🟡 Status:", res.status, res.statusText);

            const text = await res.text();
            console.log("🧩 Raw response dari server:", text);

            let result;
            try {
                result = JSON.parse(text);
            } catch (e) {
                console.error("⚠️ Response bukan JSON");
                throw new Error("Server tidak mengembalikan JSON. Mungkin token salah atau route salah.");
            }

            if (!res.ok) {
                console.error("🚫 Server balas error JSON:", result);
                throw new Error(result?.message || "Gagal mengirim broadcast message");
            }

            console.log("✅ Response dari server:", result);
            toast.success("Broadcast message berhasil dijadwalkan!");
            router.push("/broadcast/history");

        } catch (err) {
            console.error("❌ Error saat submit:", err);
            toast.error(err.message || "Terjadi kesalahan saat mengirim broadcast");
        }
    }
    
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            targetAudience: "",
            messageTitle: "",
            messageContent: "",
            scheduleDate: "",
            scheduleTime: "",
        },
    });

    return (
        <ProtectedRoute>
            <div className="max-w-8xl mx-auto">
                <div className="flex items-center gap-2 mx-4 sm:mx-8 md:mx-12 mt-4 sm:mt-6 mb-12">
                    <Send className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
                    <h2 className="text-lg sm:text-xl font-semibold">Broadcast Message</h2>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-8 md:p-12 border rounded-xl mx-4 sm:mx-8 md:mx-12 bg-[var(--light-cream)]">
                            
                            <FormField
                                control={form.control}
                                name="targetAudience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target Audience</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih target audience" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="all">Semua Pengguna</SelectItem>
                                                <SelectItem value="students">Siswa</SelectItem>
                                                <SelectItem value="parents">Orang Tua</SelectItem>
                                                <SelectItem value="teachers">Guru</SelectItem>
                                                <SelectItem value="staff">Staff</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Pilih siapa yang akan menerima pesan ini
                                        </FormDescription>
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
                                            <Input placeholder="Contoh: Pengumuman Penting" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Judul yang menarik akan meningkatkan tingkat pembacaan
                                        </FormDescription>
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
                                                className="min-h-[150px]"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Tulis pesan dengan jelas dan ringkas
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                                <FormField
                                    control={form.control}
                                    name="scheduleTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Waktu Pengiriman</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>

                        <div className="w-full flex items-center justify-end gap-4 my-8 sm:my-12 px-4 sm:px-8 md:px-12">
                            <Link href="/broadcast">
                                <Button type="button" variant={"outline"} className={"w-full sm:w-48"}>
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" variant={"default"} className={"w-full sm:w-48"}>
                                Kirim Broadcast
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </ProtectedRoute>
    );
}