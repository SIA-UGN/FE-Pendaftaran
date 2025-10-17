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
import Prestasi from '@/components/prestasi/Prestasi'

// Skema Zod disesuaikan untuk data prestasi.
// Semua field dibuat opsional karena prestasi mungkin tidak dimiliki semua pendaftar.
const FormSchema = z.object({
  uploadSertifikat: z.any().optional(),
  namaPrestasi: z.string().optional(),
  tahun: z.coerce.number().optional(), // z.coerce.number() akan mengubah string angka menjadi number
  jenisPrestasi: z.string().optional(),
  tingkatPrestasi: z.string().optional(),
  penyelenggara: z.string().optional(),
  peringkat: z.string().optional(),
});

export default function DataPrestasi() {
  
  // const form = useForm({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     namaPrestasi: "",
  //     penyelenggara: "",
  //     peringkat: "",
  //   },
  // });

  function onSubmit(data) {
    // Fungsi 'toast' diganti dengan console.log dan alert standar
    console.log(data);
    alert("You submitted the following values:\n" + JSON.stringify(data, null, 2));
  }

  return (
            <>
              <div className="flex justify-between items-center m-12 mt-6 pt-12">
                <div className="flex items-center gap-2 ">
                  <CheckCircle className="text-green-500" />
                  <h2 className="text-xl font-semibold">Data Prestasi</h2>
                </div>
                <Link href="/pendaftaran/data-prestasi/input-data">
                <Button
                  type="button"
                  variant="yellow"
                > Tambah
                </Button>
                </Link>
              </div>
            
              <Prestasi />

              <div className="flex flex-col m-12 gap-5 items-center">
                <div className="w-10/12 flex gap-5 items-center justify-center">
                  <Button
                  type="button"
                  variant="matcha"
                  className="flex-1"
                > Kembali
                </Button>
                <Button
                  type="button"
                  variant="matcha"
                  className="flex-1"
                > Konfirmasi Data
                </Button>
                </div>
                <Link href="/pendaftaran/pembayaran" className={"w-10/12"}>
                  <Button
                    type="button"
                    variant="matcha"
                    className={"w-full"}
                  > Pembayaran
                  </Button>
                </Link>
              </div>
            </>
  );
}