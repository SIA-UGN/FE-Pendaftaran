import Image from 'next/image'

export default function UrutanTahapan() {
    return (
        <div className="flex flex-col items-center pt-4 pb-16 max-w-11/12 w-full">
            <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
              Urutan Tahapan
            </h2>
            <div className='flex gap-5 w-full'>
                <div className="relative w-1/2 h-96 sm:h-96">
                                                    <Image
                                                    src="/auth.png"
                                                    alt="sejarah"
                                                    fill
                                                    className="object-cover"
                                                    />
                                                </div>
                <div className="">
                    <ol className="list-decimal list-inside text-gray-700 leading-relaxed">
                        <li>Membaca ketentuan mendaftar pada halaman ini.</li>
                        <li>Mengisi identitas mahasiswa.</li>
                        <li>Mengisi data alamat.</li>
                        <li>Mengisi data orang tua atau wali (pilih salah satu).</li>
                        <li>Mengisi data akademik dan prestasi (opsional).</li>
                        <li>Melakukan pembayaran.</li>
                        <li>Menunggu verifikasi dokumen dan perbaikan.</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}