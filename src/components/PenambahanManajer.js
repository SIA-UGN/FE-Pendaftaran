import { Card, CardContent } from "@/components/ui/card";
import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";

export default function InformasiPendaftaran() {
    return (
        <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full">
            <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
                Pendaftaran Manajer Baru
            </h2>
        <Card className="rounded-none flex flex-row gap-2 min-h-0.5 p-6 w-full mx-6 bg-[#E6EEE9] hover:bg-[#E6EEE9]">
            <CardContent className=" flex flex-col gap-5">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl tracking-tight first:mt-0 flex items-center gap-2"><Info />Informasi Tahapan</h2>
                <div className="pl-12 flex flex-col gap-5">
                    <p className="leading-7 flex items-center gap-2"> Masukkan data manajer baru pada form</p>
                    <p className="leading-7 flex items-center gap-2">Pilih hak akses untuk manajer baru</p>
                    <p className="leading-7 flex items-center gap-2">Periksa kembali data manajer sebelum disimpan dan mengirimkan email aktivasi</p>
                </div>
            </CardContent>
        </Card>
        </div>
    )
}