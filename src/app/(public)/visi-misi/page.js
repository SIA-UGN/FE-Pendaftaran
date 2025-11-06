import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Image from "next/image";

import { Card } from "@/components/ui/card";

export default function VisiMisi() {
  return (
    <>
      <div className="">
        <HomeCarousel />
        <div className="flex flex-col items-center py-16 pb-16 px-4 sm:px-8 max-w-10/12 mx-auto">
          <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            Visi Misi Universitas Global Nusantara
          </h2>
          <div className="flex flex-col w-full gap-5 items-center">
            <div className="relative w-1/2 h-96 sm:h-96">
              <Image
                src="/auth.png"
                alt="sejarah"
                fill
                className="object-cover"
              />
            </div>
            <Card className={"p-8 items-center gap-2"}>
              <p className="font-bold text-[var(--green)] text-4xl">Visi</p>
              <p className="text-center w-2xl text-md text-gray-500">
                Universitas Global Nusantara hadir untuk melanjutkan tradisi
                keilmuan pesantren yang berpadu dengan sistem pendidikan modern,
                sehingga mampu melahirkan generasi yang berkarakter, berilmu,
                serta berperan aktif dalam pembangunan bangsa dan dunia.
              </p>
            </Card>
            <p className="font-bold text-3xl text-[var(--green)] border-b-2 border-[var(--green)] mt-6">
              Misi
            </p>

            <p className="text-center my-3 text-gray-500">
              Yogyakarta dipilih sebagai pusat pengembangan Universitas Global
              Nusantara karena kota ini dikenal sebagai kota pendidikan, budaya,
              dan pergerakan intelektual. Kehadiran universitas di Yogyakarta
              bertujuan untuk:
            </p>
            <div className="grid grid-cols-2 gap-6">
              <Card className={"p-4 gap-2"}>
                <p className="font-bold text-[var(--green)] text-xl">
                  Melanjutkan Tradisi Keilmuan Pesantren
                </p>
                <p className="text-gray-500">
                  Mengintegrasikan nilai-nilai pesantren, khususnya warisan
                  intelektual dan spiritual dari Pesantren Maslakul Huda, ke
                  dalam sistem pendidikan tinggi modern.
                </p>
              </Card>
              <Card className={"p-4 gap-2"}>
                <p className="font-bold text-[var(--green)] text-xl">
                  Mengembangkan Pendidikan Tinggi yang Kompetitif
                </p>
                <p className="text-gray-500">
                  Menjadi lembaga pendidikan yang mampu bersaing di tingkat
                  nasional dan global, dengan menghadirkan kurikulum yang
                  relevan, riset yang produktif, serta kolaborasi internasional.
                </p>
              </Card>
              <Card className={"p-4 gap-2"}>
                <p className="font-bold text-[var(--green)] text-xl">
                  Mencetak Generasi Berkarakter dan Berdaya Saing
                </p>
                <p className="text-gray-500">
                  Membentuk lulusan yang memiliki landasan moral, keilmuan
                  mendalam, keterampilan profesional, serta kepekaan sosial
                  untuk menjawab tantangan zaman.
                </p>
              </Card>
              <Card className={"p-4 gap-2"}>
                <p className="font-bold text-[var(--green)] text-xl">
                  Menguatkan Peran Yogyakarta sebagai Kota Pendidikan
                </p>
                <p className="text-gray-500">
                  Memberikan kontribusi nyata terhadap ekosistem pendidikan
                  Yogyakarta yang inklusif, dinamis, dan inovatif.
                </p>
              </Card>
              <Card className={"p-4 gap-2"}>
                <p className="font-bold text-[var(--green)] text-xl">
                  Membangun Jejaring Sosial dan Kemanusiaan
                </p>
                <p className="text-gray-500">
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
