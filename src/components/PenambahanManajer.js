import { Card, CardContent } from "@/components/ui/card";
import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";

export default function InformasiPendaftaran() {
    return (
        <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 mt-12 w-full">
            <h2 className="text-3xl sm:text-2xl font-semibold mb-6 mt-6 border-b-2 border-black pb-2 text-[var(--green)] w-full">
                Pendaftaran Manajer Baru
            </h2>
        <Card className="rounded-lg shadow-md flex flex-row gap-2 min-h-0.5 p-6 w-full mx-6 bg-white">
            <CardContent className=" flex flex-col gap-5 w-full">
                <h2 className="scroll-m-20 border-b-1 pb-2 text-3xl tracking-tight first:mt-0 flex items-center gap-2 border-gray-500"><Info />Informasi Tahapan</h2>
                <div className="pl-6 flex flex-col gap-2">
                    <p className="leading-7 flex items-center gap-2"> Masukkan data manajer baru pada form</p>
                    <p className="leading-7 flex items-center gap-2">Pilih hak akses untuk manajer baru</p>
                    <p className="leading-7 flex items-center gap-2">Periksa kembali data manajer sebelum disimpan dan mengirimkan email aktivasi</p>
                </div>
            </CardContent>
        </Card>
        </div>
    )
}