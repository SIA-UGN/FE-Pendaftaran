"use client"

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
import Link from 'next/link'

const FormSchema = z.object({
    namaLengkap: z.string().min(2, {
        message: "Nama Lengkap harus memiliki setidaknya 2 karakter.",
    }),
    email: z.string().email({
        message: "Silakan masukkan alamat email yang valid.",
    }),
    jenisKelamin: z.string().min(1, { message: "Jenis Kelamin wajib diisi." }),
    agama: z.string().min(1, { message: "Agama wajib diisi." }),
    noPonsel: z.string().min(10, { message: "Nomor Ponsel tidak valid." }),
    tempatLahir: z.string().min(1, { message: "Tempat Lahir wajib diisi." }),
    tanggalLahir: z.string().min(1, { message: "Tanggal Lahir wajib diisi." }),
    nik: z.string().length(16, { message: "NIK harus 16 digit." }),
    ktp: z.any().optional(),
    noAkta: z.string().min(1, { message: "Nomor Akta wajib diisi." }),
    akta: z.any().optional(),
    noKK: z.string().length(16, { message: "Nomor KK harus 16 digit." }),
    kk: z.any().optional(),
    kewarganegaraan: z.string().min(1, { message: "Kewarganegaraan wajib diisi." }),
    anakKe: z.string().min(1, { message: "Anak ke berapa wajib diisi." }),
    jumlahSaudara: z.string().min(1, { message: "Jumlah saudara wajib diisi." }),
});

export default function DataDiri() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
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

    function onSubmit(data) {
        console.log(data); 
        alert("You submitted the following values:\n" + JSON.stringify(data, null, 2));
    }

    return (
        <>
        <div className="flex items-center gap-2 m-12 mt-6 pt-12">
                <CheckCircle className="text-green-500" />
                <h2 className="text-xl font-semibold">Data Diri</h2>
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
                                    <Input placeholder="Nama Lengkap" {...field} />
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
                                    <Input type="email" placeholder="Email" {...field} />
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
                                        <Input placeholder="Jenis Kelamin" {...field} />
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
                                        <Input placeholder="Agama" {...field} />
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
                                        <Input placeholder="08xxxxxxxx" {...field} />
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
                                        <Input placeholder="Tempat Lahir" {...field} />
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
                                        <Input type="date" {...field} />
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
                                        <Input placeholder="NIK" {...field} />
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
                                    <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
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
                                    <Input placeholder="Nomor Akta" {...field} />
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
                                    <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
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
                                    <Input placeholder="Nomor KK" {...field} />
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
                                    <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
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
                                    <Input placeholder="WNI/WNA" {...field} />
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
                                        <Input type="number" placeholder="1" {...field} />
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
                                        <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    </div>
                    <div className="w-full flex items-center justify-end my-12 px-12">
                        <Link href="/pendaftaran/data-alamat" className="w-48"><Button type="submit" variant={"matcha"} className={"w-full"}>Lanjut</Button></Link>
                    </div>
                </form>
            </Form>
        </>
    );
}