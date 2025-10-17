import { Card, CardContent } from "@/components/ui/card";
import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";

export default function InformasiPendaftaran() {
    return (
        <Card className="rounded-none flex flex-row gap-2 min-h-0.5 p-6 w-full mx-6 bg-[#E6EEE9] hover:bg-[#E6EEE9]">
            <CardContent className=" flex flex-col gap-5">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl tracking-tight first:mt-0 flex items-center gap-2"><Info />Informasi Tahapan</h2>
                <div className="pl-12 flex flex-col gap-5">
                    <p className="leading-7 flex items-center gap-2"><AlertCircle className="text-red-500" /> Tahapan belum diselesaikan</p>
                    <p className="leading-7 flex items-center gap-2"><XCircle className="text-yellow-500" /> Tahapan belum dapat dilakukan</p>
                    <p className="leading-7 flex items-center gap-2"><CheckCircle className="text-green-500" />Tahapan sudah diselesaikan</p>
                </div>
            </CardContent>
        </Card>
    )
}