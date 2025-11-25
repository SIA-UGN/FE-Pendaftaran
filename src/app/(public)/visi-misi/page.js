import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";

export default function VisiMisi() {
  return (
    <>
      <div>
        <HomeCarousel />
        <div className="flex flex-col items-center py-8 sm:py-12 lg:py-16 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Heading
            title="Visi Misi Universitas Global Nusantara"
            variant="first"
          />
          <div className="flex flex-col w-full gap-5 sm:gap-6 lg:gap-8 items-center">
            {/* Image Section - Responsive */}
            <div className="relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/auth.png"
                alt="visi misi"
                fill
                className="object-cover"
              />
            </div>

            {/* Visi Card */}
            <Card className="w-full p-6 sm:p-8 lg:p-10 items-center gap-3 sm:gap-4">
              <p className="font-bold text-[var(--green)] text-2xl sm:text-3xl lg:text-4xl">
                Visi
              </p>
              <p className="text-center text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed max-w-4xl">
                Universitas Global Nusantara hadir untuk melanjutkan tradisi
                keilmuan pesantren yang berpadu dengan sistem pendidikan modern,
                sehingga mampu melahirkan generasi yang berkarakter, berilmu,
                serta berperan aktif dalam pembangunan bangsa dan dunia.
              </p>
            </Card>

            {/* Misi Title */}
            <p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[var(--green)] border-b-2 border-[var(--green)] mt-4 sm:mt-6 pb-2">
              Misi
            </p>

            {/* Misi Description */}
            <p className="text-center text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed max-w-4xl px-2">
              Yogyakarta dipilih sebagai pusat pengembangan Universitas Global
              Nusantara karena kota ini dikenal sebagai kota pendidikan, budaya,
              dan pergerakan intelektual. Kehadiran universitas di Yogyakarta
              bertujuan untuk:
            </p>

            {/* Misi Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 w-full">
              <Card className="p-4 sm:p-5 lg:p-6 gap-2 sm:gap-3 hover:shadow-lg transition-shadow">
                <p className="font-bold text-[var(--green)] text-lg sm:text-xl lg:text-2xl">
                  Melanjutkan Tradisi Keilmuan Pesantren
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Mengintegrasikan nilai-nilai pesantren, khususnya warisan
                  intelektual dan spiritual dari Pesantren Maslakul Huda, ke
                  dalam sistem pendidikan tinggi modern.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 lg:p-6 gap-2 sm:gap-3 hover:shadow-lg transition-shadow">
                <p className="font-bold text-[var(--green)] text-lg sm:text-xl lg:text-2xl">
                  Mengembangkan Pendidikan Tinggi yang Kompetitif
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Menjadi lembaga pendidikan yang mampu bersaing di tingkat
                  nasional dan global, dengan menghadirkan kurikulum yang
                  relevan, riset yang produktif, serta kolaborasi internasional.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 lg:p-6 gap-2 sm:gap-3 hover:shadow-lg transition-shadow">
                <p className="font-bold text-[var(--green)] text-lg sm:text-xl lg:text-2xl">
                  Mencetak Generasi Berkarakter dan Berdaya Saing
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Membentuk lulusan yang memiliki landasan moral, keilmuan
                  mendalam, keterampilan profesional, serta kepekaan sosial
                  untuk menjawab tantangan zaman.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 lg:p-6 gap-2 sm:gap-3 hover:shadow-lg transition-shadow">
                <p className="font-bold text-[var(--green)] text-lg sm:text-xl lg:text-2xl">
                  Menguatkan Peran Yogyakarta sebagai Kota Pendidikan
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Memberikan kontribusi nyata terhadap ekosistem pendidikan
                  Yogyakarta yang inklusif, dinamis, dan inovatif.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 lg:p-6 gap-2 sm:gap-3 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                <p className="font-bold text-[var(--green)] text-lg sm:text-xl lg:text-2xl">
                  Membangun Jejaring Sosial dan Kemanusiaan
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Menjalin kerjasama dengan berbagai lembaga, baik lokal maupun
                  internasional, untuk mendorong lahirnya gagasan, inovasi, dan
                  solusi bagi masyarakat luas.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
