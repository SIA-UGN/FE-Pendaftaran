"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import Link from 'next/link'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image'

export default function RegistrationProgress() {
     const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        username: "",
        },
    })

    function onSubmit(data) {
        toast("You submitted the following values", {
        description: (
            <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
        ),
        })
    }
  return (
        <div className="w-full p-4 flex flex-col items-center gap-12">
            <div className="flex gap-5 w-full text-2xl">
              <Image src={"/tahapan.svg"} width={30} height={30} alt='tahapan'></Image>
              Tahapan
            </div>
            <div className="flex flex-col gap-5  w-full items-center justify-center">
            <div className="flex gap-5 w-full flex-col-reverse">
              <div className="w-full relative grid grid-cols-6 gap-12 border border-green-500 rounded-full">
                  <Image src={'/line.svg'} className="absolute right-2 z-0 rotate-90" width={1} height={100} alt='kube'></Image>
                  <div className="h-12 flex justify-center items-center w-full z-10"><CheckCircle className="text-green-500 "/></div>
                  <div className="h-12 flex justify-center items-center w-full z-10"><CheckCircle className="text-green-500 "/></div>
                  <div className="h-12 flex justify-center items-center w-full z-10"><CheckCircle className="text-green-500 "/></div>
                  <div className="h-12 flex justify-center items-center w-full z-10"><CheckCircle className="text-green-500 "/></div>
                  <div className="h-12 flex justify-center items-center w-full z-10"><CheckCircle className="text-green-500 "/></div>
                  <div className="h-12 flex justify-center items-center w-full z-10"><CheckCircle className="text-green-500 "/></div>
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">
                  <Link href='/pendaftaran/data-diri'><div className="h-24 border border-green-500 rounded-lg p-4 flex items-center justify-center"><span>Data Diri</span></div></Link>
                  <Link href='/pendaftaran/data-diri'><div className="h-24 border border-green-500 rounded-lg p-4 flex items-center justify-center"><span>Data Alamat</span></div></Link>
                  <Link href='/pendaftaran/data-akademik'><div className="h-24 border border-green-500 rounded-lg p-4 flex items-center justify-center"><span>Data Akademik</span></div></Link>
                  <Link href='/pendaftaran/data-prestasi'><div className="h-24 border border-green-500 rounded-lg p-4 flex items-center justify-center"><span>Data Prestasi</span></div></Link>
                  <Link href='/pendaftaran/data-orangtua'><div className="h-24 border border-green-500 rounded-lg p-4 flex items-center justify-center"><span>Data Orang Tua</span></div></Link>
                  <Link href='/pendaftaran/pembayaran'><div className="h-24 border border-green-500 rounded-lg p-4 flex items-center justify-center"><span>Data Pembayaran</span></div></Link>
              </div>
              </div>
            </div>
        </div>

    
  );
}