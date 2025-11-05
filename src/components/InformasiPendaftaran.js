import { Card, CardContent } from "@/components/ui/card";
import { Info, AlertCircle, XCircle, CheckCircle } from "lucide-react";

export default function InformasiPendaftaran() {
    return (
        <Card className="rounded-lg flex flex-col w-full max-w-7xl mx-auto bg-[#E6EEE9] hover:bg-[#E6EEE9] shadow-sm">
            <CardContent className="flex flex-col gap-4 md:gap-5 p-4 sm:p-5 md:p-6">
                <h2 className="scroll-m-20 border-b border-gray-300 pb-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2 md:gap-3">
                    <Info className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span>Informasi Tahapan</span>
                </h2>
                <div className="pl-6 sm:pl-8 md:pl-12 flex flex-col gap-3 md:gap-4">
                    <p className="leading-relaxed flex items-start sm:items-center gap-2 md:gap-3 text-sm sm:text-base">
                        <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span>Tahapan belum diselesaikan</span>
                    </p>
                    <p className="leading-relaxed flex items-start sm:items-center gap-2 md:gap-3 text-sm sm:text-base">
                        <XCircle className="text-yellow-500 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span>Tahapan belum dapat dilakukan</span>
                    </p>
                    <p className="leading-relaxed flex items-start sm:items-center gap-2 md:gap-3 text-sm sm:text-base">
                        <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span>Tahapan sudah diselesaikan</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}