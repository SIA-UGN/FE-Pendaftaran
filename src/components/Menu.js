import { Card } from "@/components/ui/card"

import { GraduationCap, School, NotepadText } from "lucide-react"


export default function Menu() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-4 max-w-10/12 mx-auto my-3 py-12">
            <Card className="flex items-center justify-center p-6 flex-col w-full mx-auto cursor-pointer gap-2">
                <GraduationCap size={80} className="stroke-1 text-[var(--green)]"/>
                <span className="text-2xl font-medium text-[var(--green)]">Profil</span>
                <p className="text-gray-500 text-center text-sm">Temukan informasi lengkap mengenai sejarah, visi dan misi, serta nilai-nilai yang menjadi dasar kampus kami.</p>
            </Card>
            <Card className="flex items-center justify-center p-6 flex-col w-full not-first:mx-auto cursor-pointer gap-2">
                <School size={80} className="stroke-1 text-[var(--green)]" />
                <span className="text-2xl font-medium text-[var(--green)]">Fakultas</span>
                <p  className="text-gray-500 text-center text-sm">Jelajahi berbagai fakultas dan program studi yang tersedia.</p>
            </Card>
            <Card className="flex items-center justify-center p-6 flex-col mx-auto w-full stroke-black cursor-pointer gap-2">
                <NotepadText size={80} className="stroke-1 text-[var(--green)]" />
                <span className="text-2xl font-medium text-[var(--green)]">Pendaftaran</span>
                <p className="text-gray-500 text-center text-sm">Dapatkan informasi seputar persyaratan, alur pendaftaran, serta jadwal penting penerimaan mahasiswa baru.</p>
            </Card>
        </div>
    )
}