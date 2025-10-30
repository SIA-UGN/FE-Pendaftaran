import HomeCarousel from '@/components/HomeCarousel'
import Image from 'next/image'

export default function VisiMisi() {
    return (
        <>
            <div>
                        <HomeCarousel />
                        <div className="flex flex-col items-center py-16 pb-16 px-4 sm:px-8 max-w-11/12 mx-auto">
                            <h2 className="text-xl sm:text-2xl font-medium mb-4 w-full border-b-2 border-black pb-2">
                                Visi Misi
                            </h2>
                            <div className='flex w-full gap-5'>
                                <div className="relative w-1/2 h-96 sm:h-96">
                                    <Image
                                    src="/auth.png"
                                    alt="sejarah"
                                    fill
                                    className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p>Universitas Global Nusantara hadir untuk melanjutkan tradisi keilmuan pesantren yang berpadu dengan sistem pendidikan modern, sehingga mampu melahirkan generasi yang berkarakter, berilmu, serta berperan aktif dalam pembangunan bangsa dan dunia.</p>
                            <p>Yogyakarta dipilih sebagai pusat pengembangan Universitas Global Nusantara karena kota ini dikenal sebagai kota pendidikan, budaya, dan pergerakan intelektual. Kehadiran universitas di Yogyakarta bertujuan untuk:</p>
                            <p>Melanjutkan Tradisi Keilmuan Pesantren
Mengintegrasikan nilai-nilai pesantren, khususnya warisan intelektual dan spiritual dari Pesantren Maslakul Huda, ke dalam sistem pendidikan tinggi modern.
Mengembangkan Pendidikan Tinggi yang Kompetitif
Menjadi lembaga pendidikan yang mampu bersaing di tingkat nasional dan global, dengan menghadirkan kurikulum yang relevan, riset yang produktif, serta kolaborasi internasional.
Mencetak Generasi Berkarakter dan Berdaya Saing
Membentuk lulusan yang memiliki landasan moral, keilmuan mendalam, keterampilan profesional, serta kepekaan sosial untuk menjawab tantangan zaman.
Menguatkan Peran Yogyakarta sebagai Kota Pendidikan
Memberikan kontribusi nyata terhadap ekosistem pendidikan Yogyakarta yang inklusif, dinamis, dan inovatif.
Membangun Jejaring Sosial dan Kemanusiaan
Menjalin kerjasama dengan berbagai lembaga, baik lokal maupun internasional, untuk mendorong lahirnya gagasan, inovasi, dan solusi bagi masyarakat luas.
</p>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}