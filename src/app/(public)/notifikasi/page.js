import { Card } from "@/components/ui/card"

const notifikasi = [
    {
        title: "Accepted Verification",
        message: "Data diri anda sudah terverifikasi oleh admin atau manajer, menunggu verifikasi berikutnya."
    },
    {
        title: "Rejected Verification",
        message: "Data anda sudah terverifikasi oleh admin atau manager, mohon melakukan pengecekan ulang sesuai dengan catatan admin atau menager yakni: "
    },
    {
        title: "Perubahan Status Akun",
        message: "Akun Anda sudah terverifikasi oleh admin atau manajer dan memasuki status rejected, mohon lakukan pengecekan ulang data berikut."
    },
    {
        title: "Verifikasi Data Diri",
        message: "Data diri anda sudah terverifikasi oleh admin atau manajer, menunggu verifikasi berikutnya."
    }
]

export default function Notification() {
    return (
        <>
            <div className="flex flex-col items-center py-16 pb-16 px-4 sm:px-8 max-w-10/12 mx-auto">
                <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
                    Notifikasi
                </h2>
                <div className="flex flex-col gap-6 w-full">
                {
                    notifikasi.map((notifikasi, index) => (
                        <Card key={`notifikasi ${index}`} className={"p-4 gap-2"}>
                            <h1 className="font-bold text-xl text-[var(--green)]">
                                {notifikasi.title}
                            </h1>
                            <p className="text-gray-500">
                                {notifikasi.message}
                            </p>
                        </Card>
                    ))
                }
                </div>
            </div>
        </>
    )
}