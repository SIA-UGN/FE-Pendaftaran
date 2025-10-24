"use client"; // <-- Diperlukan untuk form interaktif

import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import Link from 'next/link'
import { useState } from "react"
import RegistrationProgress from "@/components/RegistrationProgress";


const FormSchema = z.object({
  namaAyah: z.string().min(2, { message: "Nama Ayah harus diisi." }),
  alamatAyah: z.string().min(5, { message: "Alamat Ayah harus diisi." }),
  telpAyah: z.string().min(10, { message: "No. HP Ayah tidak valid." }),
  pekerjaanAyah: z.string().min(2, { message: "Pekerjaan Ayah harus diisi." }),
  pendidikanAyah: z.string().min(2, { message: "Pendidikan Ayah harus diisi." }),
  penghasilanAyah: z.string({ required_error: "Penghasilan Ayah harus dipilih." }),

  namaIbu: z.string().min(2, { message: "Nama Ibu harus diisi." }),
  alamatIbu: z.string().min(5, { message: "Alamat Ibu harus diisi." }),
  telpIbu: z.string().min(10, { message: "No. HP Ibu tidak valid." }),
  pekerjaanIbu: z.string().min(2, { message: "Pekerjaan Ibu harus diisi." }),
  pendidikanIbu: z.string().min(2, { message: "Pendidikan Ibu harus diisi." }),
  penghasilanIbu: z.string({ required_error: "Penghasilan Ibu harus dipilih." }),

  namaWali: z.string().optional(),
  alamatWali: z.string().optional(),
  telpWali: z.string().optional(),
  pekerjaanWali: z.string().optional(),
  pendidikanWali: z.string().optional(),
  penghasilanWali: z.string().optional(),
});

export default function DataOrangtua() {
  const [activeForm, setActiveForm] = useState('orangTua')

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
    alert("You submitted the following values:\n" + JSON.stringify(data, null, 2));
  }

  return (
    <>
      <div className="flex items-center gap-2 m-12 mt-6 pt-12 justify-between">
        <RegistrationProgress />
        <div className="flex gap-5 items-center">
            <CheckCircle className="text-green-500" />
            <h2 className="text-xl font-semibold">Data Orang Tua/ Wali</h2>
        </div>
        <div className="flex gap-2 mb-6">
        <Button
          type="button"
          variant="yellow"
          onClick={() => setActiveForm(activeForm === 'orangTua' ? 'wali' : 'orangTua')}
        >
          {activeForm === 'orangTua' 
            ? 'Data Wali' 
            : 'Data Orang Tua'}
        </Button>
      </div>
    </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-5 p-12 border rounded-xl m-12 bg-[var(--light-cream)]">
          {activeForm === 'orangTua' && (
            <>
              <div className=" p-4 rounded-md space-y-4">
            <h3 className="font-semibold text-lg">Data Identitas Ayah</h3>
            <FormField control={form.control} name="namaAyah" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Ayah Kandung</FormLabel>
                <FormControl><Input placeholder="Nama lengkap Ayah" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="alamatAyah" render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Ayah Kandung</FormLabel>
                <FormControl><Input placeholder="Alamat lengkap Ayah" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="telpAyah" render={({ field }) => (
                <FormItem>
                  <FormLabel>No. HP Ayah Kandung</FormLabel>
                  <FormControl><Input type="tel" placeholder="08..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="pekerjaanAyah" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pekerjaan Ayah</FormLabel>
                  <FormControl><Input placeholder="Pekerjaan" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="pendidikanAyah" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pendidikan Terakhir Ayah</FormLabel>
                  <FormControl><Input placeholder="SMA/S1/..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="penghasilanAyah" render={({ field }) => (
                <FormItem>
                  <FormLabel>Penghasilan Ayah</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Pilih penghasilan" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="<5jt">&lt; 5.000.000</SelectItem>
                      <SelectItem value="5-10jt">5.000.000 – 9.999.999</SelectItem>
                      <SelectItem value=">10jt">&gt; 10.000.000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>
          </div>

          <div className=" p-4 rounded-md space-y-4">
            <h3 className="font-semibold text-lg">Data Identitas Ibu</h3>
            <FormField control={form.control} name="namaIbu" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Ibu Kandung</FormLabel>
                <FormControl><Input placeholder="Nama lengkap Ibu" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="alamatIbu" render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Ibu Kandung</FormLabel>
                <FormControl><Input placeholder="Alamat lengkap Ibu" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="telpIbu" render={({ field }) => (
                <FormItem>
                  <FormLabel>No. HP Ibu Kandung</FormLabel>
                  <FormControl><Input type="tel" placeholder="08..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="pekerjaanIbu" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pekerjaan Ibu</FormLabel>
                  <FormControl><Input placeholder="Pekerjaan" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="pendidikanIbu" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pendidikan Terakhir Ibu</FormLabel>
                  <FormControl><Input placeholder="SMA/S1/..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="penghasilanIbu" render={({ field }) => (
                <FormItem>
                  <FormLabel>Penghasilan Ibu</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Pilih penghasilan" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="<5jt">&lt; 5.000.000</SelectItem>
                      <SelectItem value="5-10jt">5.000.000 – 9.999.999</SelectItem>
                      <SelectItem value=">10jt">&gt; 10.000.000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>
          </div>
            </>
          )} 
          {activeForm === 'wali' && (
          <div className=" p-4 rounded-md space-y-4">
            <h3 className="font-semibold text-lg">Data Identitas Wali (Opsional)</h3>
            <FormField control={form.control} name="namaWali" render={({ field }) => (
                <FormItem>
                    <FormLabel>Nama Wali</FormLabel>
                    <FormControl><Input placeholder="Nama lengkap Wali" {...field} /></FormControl>
                </FormItem>
            )}/>
            <FormField control={form.control} name="alamatWali" render={({ field }) => (
                <FormItem>
                    <FormLabel>Alamat Wali</FormLabel>
                    <FormControl><Input placeholder="Alamat lengkap Wali" {...field} /></FormControl>
                </FormItem>
            )}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="telpWali" render={({ field }) => (
                    <FormItem>
                        <FormLabel>No. HP Wali</FormLabel>
                        <FormControl><Input type="tel" placeholder="08..." {...field} /></FormControl>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="pekerjaanWali" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pekerjaan Wali</FormLabel>
                        <FormControl><Input placeholder="Pekerjaan" {...field} /></FormControl>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="pendidikanWali" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pendidikan Terakhir Wali</FormLabel>
                        <FormControl><Input placeholder="SMA/S1/..." {...field} /></FormControl>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="penghasilanWali" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Penghasilan Wali</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Pilih penghasilan" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="<5jt">&lt; 5.000.000</SelectItem>
                                <SelectItem value="5-10jt">5.000.000 – 9.999.999</SelectItem>
                                <SelectItem value=">10jt">&gt; 10.000.000</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}/>
            </div>
          </div>
          )}
          </div>
          <div className="w-full flex items-center justify-end my-12 px-12">
                        <Link href="/pendaftaran/data-akademik" className="w-48"><Button type="submit" variant={"matcha"} className={"w-full"}>Lanjut</Button></Link>
                    </div>
        </form>
      </Form>
    </>
  );
}