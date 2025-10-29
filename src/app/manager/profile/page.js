import Image from 'next/image'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Profile() {
    return (
        <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3 mx-auto">
            {/* Akun Pendaftar */}
            <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
                Akun Pendaftar
            </h2>

            <Card className="w-full flex flex-col sm:flex-row gap-6 p-8 rounded-2xl shadow-md bg-white">
            <Image
                alt="Profile banner Faradis Yulianto"
                src="/logo.jpg"
                width={180}
                height={300}
                className="w-full sm:w-1/4 h-[300px] rounded-xl object-cover"
            />
            <div className="flex flex-col p-2 w-full sm:w-2/3 space-y-1 items-start">
                <h2 className="font-bold text-xl">Faradis Yulianto</h2>
                <h3 className="text-gray-500">@faradisy20</h3>
                <p className="text-gray-500">faradisy20@gmail.com</p>
                <p className="text-gray-500 text-sm">Last online 7 days ago</p>
            </div>
            </Card>
            {/* Status Verifikasi Pendaftar */}
            <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
                Status Verifikasi Pendaftar
            </h2>
            <div className="w-full">
                <Button variant={"green"} className={"w-full "} disabled>Pending</Button>
            </div>
            <div className="w-full flex justify-end">
                <Link href="/manager/verification/data-diri"><Button variant={"green"} className={"w-sm"}>Verifikasi Data</Button></Link>
            </div>
            {/* Status Kelulusan Pendaftar */}
            <h2 className="text-3xl sm:text-2xl font-semibold mb-2 mt-6 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
                Status Kelulusan Pendaftar
            </h2>
            <p>Silahkan tentukan apakah pendaftar lulus atau tidak</p>
            <div className="w-lg flex flex-col gap-2">
                <Button variant={"green"} className={"w-full "}>Lihat Data</Button>
                <Button variant={"green"} className={"w-full "}>Lulus</Button>
                <Button variant={"green"} className={"w-full "}>Tidak Lulus</Button>
            </div>
        </div>
    )
}