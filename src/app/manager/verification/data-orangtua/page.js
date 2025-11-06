"use client"; // <-- Diperlukan untuk form interaktif

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useState } from "react";
import RegistrationProgress from "@/components/registrations/RegistrationProgress";

import { Card } from "@/components/ui/card";

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
import TextareaAutosize from "react-textarea-autosize";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";

const FormSchema = z.object({
  namaAyah: z.string().min(2, { message: "Nama Ayah harus diisi." }),
  alamatAyah: z.string().min(5, { message: "Alamat Ayah harus diisi." }),
  telpAyah: z.string().min(10, { message: "No. HP Ayah tidak valid." }),
  pekerjaanAyah: z.string().min(2, { message: "Pekerjaan Ayah harus diisi." }),
  pendidikanAyah: z
    .string()
    .min(2, { message: "Pendidikan Ayah harus diisi." }),
  penghasilanAyah: z.string({
    required_error: "Penghasilan Ayah harus dipilih.",
  }),

  namaIbu: z.string().min(2, { message: "Nama Ibu harus diisi." }),
  alamatIbu: z.string().min(5, { message: "Alamat Ibu harus diisi." }),
  telpIbu: z.string().min(10, { message: "No. HP Ibu tidak valid." }),
  pekerjaanIbu: z.string().min(2, { message: "Pekerjaan Ibu harus diisi." }),
  pendidikanIbu: z.string().min(2, { message: "Pendidikan Ibu harus diisi." }),
  penghasilanIbu: z.string({
    required_error: "Penghasilan Ibu harus dipilih.",
  }),

  namaWali: z.string().optional(),
  alamatWali: z.string().optional(),
  telpWali: z.string().optional(),
  pekerjaanWali: z.string().optional(),
  pendidikanWali: z.string().optional(),
  penghasilanWali: z.string().optional(),
});

export default function DataOrangtua() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const [activeForm, setActiveForm] = useState("orangTua");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      namaAyah: "",
      alamatAyah: "",
      telpAyah: "",
      pekerjaanAyah: "",
      pendidikanAyah: "",
      namaIbu: "",
      alamatIbu: "",
      telpIbu: "",
      pekerjaanIbu: "",
      pendidikanIbu: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    alert(
      "You submitted the following values:\n" + JSON.stringify(data, null, 2)
    );
  }

  return (
    <>
      <div className="mx-12 mt-6 grid grid-cols-1 gap-12">
        <Card className="w-full flex flex-col md:flex-row gap-6 p-8 rounded-2xl shadow-md bg-[var(--light-cream)] justify-between">
          <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
            <h2 className="font-bold text-xl">Faradis Yulianto</h2>
            <h3 className="text-gray-500">@faradisy20</h3>
            <p className="text-gray-500">faradisy20@gmail.com</p>
          </div>
          <Button variant={"yellow"}>Pending</Button>
        </Card>

        <div className="flex justify-between">
          <div className="flex items-center gap-2 pb-0">
            <CheckCircle className="text-green-500" />
            <h2 className="text-xl font-semibold">Data Orang Tua</h2>
          </div>
          <Button
            type="button"
            variant="yellow"
            onClick={() =>
              setActiveForm(activeForm === "orangTua" ? "wali" : "orangTua")
            }
          >
            {activeForm === "orangTua" ? "Data Wali" : "Data Orang Tua"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
            {activeForm === "orangTua" && (
              <>
                <div className=" p-4 rounded-md space-y-4">
                  <h3 className="font-semibold text-lg">Data Identitas Ayah</h3>
                  <FormField
                    control={form.control}
                    name="namaAyah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Ayah Kandung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama lengkap Ayah"
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
                    name="alamatAyah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Ayah Kandung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Alamat lengkap Ayah"
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
                      name="telpAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No. HP Ayah Kandung</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="08..."
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
                      name="pekerjaanAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pekerjaan Ayah</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Pekerjaan"
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
                      name="pendidikanAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pendidikan Terakhir Ayah</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="SMA/S1/..."
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
                      name="penghasilanAyah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Penghasilan Ayah</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="<5.000.000"
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

                <div className=" p-4 rounded-md space-y-4">
                  <h3 className="font-semibold text-lg">Data Identitas Ibu</h3>
                  <FormField
                    control={form.control}
                    name="namaIbu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Ibu Kandung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama lengkap Ibu"
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
                    name="alamatIbu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Ibu Kandung</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Alamat lengkap Ibu"
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
                      name="telpIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No. HP Ibu Kandung</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="08..."
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
                      name="pekerjaanIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pekerjaan Ibu</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Pekerjaan"
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
                      name="pendidikanIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pendidikan Terakhir Ibu</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="SMA/S1/..."
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
                      name="penghasilanIbu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Penghasilan Ibu</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="<5.000.000"
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
              </>
            )}
            {activeForm === "wali" && (
              <div className=" p-4 rounded-md space-y-4">
                <h3 className="font-semibold text-lg">
                  Data Identitas Wali (Opsional)
                </h3>
                <FormField
                  control={form.control}
                  name="namaWali"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Wali</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama lengkap Wali"
                          {...field}
                          readOnly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamatWali"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Wali</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alamat lengkap Wali"
                          {...field}
                          readOnly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="telpWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. HP Wali</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="08..."
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pekerjaanWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pekerjaan Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="Pekerjaan" {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pendidikanWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pendidikan Terakhir Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="SMA/S1/..." {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="penghasilanWali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Penghasilan Wali</FormLabel>
                        <FormControl>
                          <Input placeholder="<5.000.000" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-end my-12 px-12 gap-6">
            <Button variant={"green"}>Kembali</Button>
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
                  <Link href="/manager/verification/data-akademik">
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
                  <Link href="/manager/verification/data-akademik">
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
    </>
  );
}
