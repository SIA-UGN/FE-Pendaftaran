import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Heading";

const data = [
  {
    fakultas: "Fakultas Ekonomika dan Bisnis",
    deskripsi:
      "Fakultas ini berfokus pada pengembangan ilmu ekonomi, manajemen, dan akuntansi untuk mencetak lulusan yang kompeten dan berintegritas di dunia bisnis modern.",
    prodi: [
      {
        nama: "Ilmu Ekonomi",
        deskripsi:
          "Program studi yang mempelajari teori dan kebijakan ekonomi, serta penerapannya dalam menganalisis fenomena ekonomi nasional dan global.",
      },
      {
        nama: "Akuntansi",
        deskripsi:
          "Program studi yang membekali mahasiswa dengan kemampuan dalam menyusun, menganalisis, dan mengaudit laporan keuangan perusahaan maupun organisasi publik.",
      },
      {
        nama: "Manajemen",
        deskripsi:
          "Program studi yang mempersiapkan mahasiswa untuk menjadi pemimpin dan pengambil keputusan strategis dalam organisasi bisnis, publik, maupun wirausaha.",
      },
    ],
  },
  {
    fakultas: "Fakultas Ilmu Budaya",
    deskripsi:
      "Fakultas yang mengkaji dan mengembangkan nilai-nilai budaya, bahasa, dan sastra untuk memperkuat identitas bangsa serta memperluas wawasan global mahasiswa.",
    prodi: [
      {
        nama: "Sastra Indonesia",
        deskripsi:
          "Program studi yang mempelajari karya sastra, linguistik, dan budaya Indonesia sebagai bentuk pelestarian serta pengembangan kekayaan bahasa dan budaya nasional.",
      },
      {
        nama: "Sastra Inggris",
        deskripsi:
          "Program studi yang menekankan pada penguasaan bahasa Inggris, kajian sastra dunia, serta penerapan komunikasi lintas budaya dalam konteks global.",
      },
      {
        nama: "Sejarah",
        deskripsi:
          "Program studi yang mendalami perjalanan sejarah manusia, dengan fokus pada analisis peristiwa, tokoh, dan kebudayaan dalam konteks sosial dan politik.",
      },
    ],
  },
  {
    fakultas: "Fakultas Teknik",
    deskripsi:
      "Fakultas yang mengedepankan inovasi dan penerapan teknologi untuk menjawab tantangan pembangunan berkelanjutan di berbagai sektor industri.",
    prodi: [
      {
        nama: "Teknik Sipil",
        deskripsi:
          "Program studi yang berfokus pada perancangan dan pembangunan infrastruktur seperti jembatan, gedung, dan jalan raya dengan prinsip keamanan dan efisiensi.",
      },
      {
        nama: "Teknik Elektro",
        deskripsi:
          "Program studi yang mengajarkan konsep dan aplikasi kelistrikan, sistem kontrol, serta teknologi energi modern.",
      },
      {
        nama: "Teknik Informatika",
        deskripsi:
          "Program studi yang mempersiapkan mahasiswa dalam pengembangan perangkat lunak, kecerdasan buatan, dan sistem informasi untuk era digital.",
      },
    ],
  },
];

export default function Fakultas() {
  return (
    <>
      <div>
        <HomeCarousel />
        <div className="flex flex-col items-center py-8 sm:py-12 lg:py-16 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Heading
            title="Fakultas & Program Studi Universitas Global Nusantara"
            variant="first"
          />

          {/* Fakultas Sections */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 w-full">
            {data.map((fakultas, index) => (
              <div key={index} className="w-full">
                {/* Fakultas Title */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold w-full border-b-2 border-gray-300 pb-3 text-[var(--green)] mt-6 sm:mt-8 mb-4 sm:mb-5">
                  {fakultas.fakultas}
                </h2>

                {/* Fakultas Description */}
                <p className="w-full mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                  {fakultas.deskripsi}
                </p>

                {/* Program Studi Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                  {fakultas.prodi.map((prodi, prodiIndex) => (
                    <Card
                      key={prodiIndex}
                      className="flex flex-col p-4 sm:p-5 lg:p-6 gap-3 sm:gap-4 hover:shadow-lg transition-shadow"
                    >
                      {/* Prodi Title */}
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold border-b-2 border-gray-200 pb-2 text-[var(--green)]">
                        {prodi.nama}
                      </h3>

                      {/* Prodi Description */}
                      <p className="text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed flex-grow">
                        {prodi.deskripsi}
                      </p>

                      {/* Button */}
                      {/* <Button
                        variant="green"
                        className="w-full sm:w-auto text-sm sm:text-base"
                      >
                        Selengkapnya
                      </Button> */}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
