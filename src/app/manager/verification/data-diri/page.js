"use client";

import { useRouter } from "next/navigation";

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "sonner";
import { getCookie } from "cookies-next";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";
import { Card } from "@/components/ui/card";

export default function DataDiri() {
  const router = useRouter();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  async function onSubmit(data) {
    console.log("📤 Data dikirim:", data);
    try {
      const formData = new FormData();

      // Struktur sesuai Laravel: profile[...]
      formData.append("profile[full_name]", data.namaLengkap);
      formData.append("profile[email]", data.email);
      formData.append("profile[gender]", data.jenisKelamin);
      formData.append("profile[religion]", data.agama);
      formData.append("profile[phone]", data.noPonsel);
      formData.append("profile[birth_place]", data.tempatLahir);
      formData.append("profile[birth_date]", data.tanggalLahir);
      formData.append("profile[nik_kitas]", data.nik);
      formData.append("profile[family_card_number]", data.noKK);
      formData.append("profile[citizenship]", data.kewarganegaraan);
      formData.append("profile[child_number]", data.anakKe);
      formData.append("profile[siblings_count]", data.jumlahSaudara);
      formData.append("profile[birth_certificate_number]", data.noAkta);

      // File upload
      if (data.ktp && data.ktp.length > 0) {
        formData.append("profile[ktp_kitas_file]", data.ktp[0]);
      }
      if (data.akta && data.akta.length > 0) {
        formData.append("profile[birth_certificate_file]", data.akta[0]);
      }
      if (data.kk && data.kk.length > 0) {
        formData.append("profile[family_card_file]", data.kk[0]);
      }

      const token = getCookie("access_token");
      console.log("🟢 Token dari cookie:", token);

      const res = await fetch("http://localhost:8000/api/registration", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      console.log("🟡 Status:", res.status, res.statusText);

      // Ambil response sebagai text
      const text = await res.text();
      console.log("🧩 Raw response dari server:", text);

      // Parse JSON
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error(
          "⚠️ Response bukan JSON, kemungkinan HTML error (token salah / route salah / sanctum belum aktif)"
        );
        throw new Error(
          "Server tidak mengembalikan JSON. Mungkin token salah, route salah, atau sanctum belum aktif."
        );
      }

      if (!res.ok) {
        console.error("🚫 Server balas error JSON:", result);
        throw new Error(result?.message || "Gagal menyimpan data pendaftaran");
      }

      console.log("✅ Response dari server:", result);
      toast.success("Data berhasil disimpan!");
      router.push("/manager/verification/data-alamat");
    } catch (err) {
      console.error("❌ Error saat submit:", err);
      toast.error(err.message || "Terjadi kesalahan saat menyimpan data");
    }
  }

  const form = useForm({
    defaultValues: {
      namaLengkap: "",
      email: "",
      jenisKelamin: "",
      agama: "",
      noPonsel: "",
      tempatLahir: "",
      tanggalLahir: "",
      nik: "",
      noAkta: "",
      noKK: "",
      kewarganegaraan: "",
      anakKe: "",
      jumlahSaudara: "",
    },
  });

  return (
    <ProtectedRoute>
      <div className="mx-12 mt-6 grid grid-cols-1 gap-12">
        <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-[var(--light-cream)] justify-between">
          <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
            <h2 className="font-bold text-xl">Faradis Yulianto</h2>
            <h3 className="text-gray-500">@faradisy20</h3>
            <p className="text-gray-500">faradisy20@gmail.com</p>
          </div>
          <Button variant={"yellow"}>Pending</Button>
        </Card>

        <div className="flex items-center gap-2 pb-0">
          <CheckCircle className="text-green-500" />
          <h2 className="text-xl font-semibold">Identitas Pendaftar</h2>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
            <FormField
              control={form.control}
              name="namaLengkap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Faradis Yulianto" {...field} readOnly />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="faradisy20@gmail.com"
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Input placeholder="Laki-laki" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agama</FormLabel>
                    <FormControl>
                      <Input placeholder="Islam" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noPonsel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomer Ponsel</FormLabel>
                    <FormControl>
                      <Input placeholder="085876270545" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tempatLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input placeholder="Magelang" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tanggalLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="12/12/2025"
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input placeholder="123123123123" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ktp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>KTP / KITAS</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href="/uploads/kk.pdf" download>
                        Unduh KTP
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noAkta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Registrasi Akta Lahir</FormLabel>
                  <FormControl>
                    <Input placeholder="123123123123" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="akta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Akta Kelahiran</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href="/uploads/kk.pdf" download>
                        Unduh Akta Kelahiran
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noKK"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input placeholder="12312312313" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Button asChild variant={"outline"}>
                      <a href="/uploads/kk.pdf" download>
                        Unduh Kartu Keluarga
                      </a>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kewarganegaraan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kewarganegaraan</FormLabel>
                  <FormControl>
                    <Input placeholder="WNI" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="anakKe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anak ke Berapa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jumlahSaudara"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Saudara Kandung</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
            <Link href="/manager/verification">
              <Button variant={"green"}>Kembali</Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="matcha">Lanjut</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Verifikasi Identitas Pendaftar
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah data yang dimasukkan sudah benar atau lengkap?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setShowCancelDialog(true)}>
                    Tidak
                  </AlertDialogCancel>
                  <Link href="/manager/verification/data-alamat">
                    <AlertDialogAction>Ya</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
              open={showCancelDialog}
              onOpenChange={setShowCancelDialog}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Catatan Perubahan</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tuliskan catatan untuk pendaftar untuk perbaikan data
                  </AlertDialogDescription>
                  <div className="grid w-10/12 sm:w-full gap-6">
                    <InputGroup>
                      <TextareaAutosize
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-32 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                        placeholder="Autoresize textarea..."
                      />
                      <InputGroupAddon align="block-end"></InputGroupAddon>
                    </InputGroup>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Link href="/manager/verification/data-alamat">
                    <AlertDialogAction
                      onClick={() => setShowCancelDialog(false)}
                    >
                      Simpan
                    </AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </ProtectedRoute>
  );
}
