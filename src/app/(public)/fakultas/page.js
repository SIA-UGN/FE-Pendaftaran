
import HomeCarousel from "@/components/HomeCarousel"
import Image from 'next/image'
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"

const data = [
  {
    fakultas: "Fakultas Ekonomika dan Bisnis",
    deskripsi: "Fakultas ini berfokus pada pengembangan ilmu ekonomi, manajemen, dan akuntansi untuk mencetak lulusan yang kompeten dan berintegritas di dunia bisnis modern.",
    prodi: [
      {
        nama: "Ilmu Ekonomi",
        deskripsi:
          "Program studi yang mempelajari teori dan kebijakan ekonomi, serta penerapannya dalam menganalisis fenomena ekonomi nasional dan global."
      },
      {
        nama: "Akuntansi",
        deskripsi:
          "Program studi yang membekali mahasiswa dengan kemampuan dalam menyusun, menganalisis, dan mengaudit laporan keuangan perusahaan maupun organisasi publik."
      },
      {
        nama: "Manajemen",
        deskripsi:
          "Program studi yang mempersiapkan mahasiswa untuk menjadi pemimpin dan pengambil keputusan strategis dalam organisasi bisnis, publik, maupun wirausaha."
      }
    ]
  },
  {
    fakultas: "Fakultas Ilmu Budaya",
    deskripsi: "Fakultas yang mengkaji dan mengembangkan nilai-nilai budaya, bahasa, dan sastra untuk memperkuat identitas bangsa serta memperluas wawasan global mahasiswa.",
    prodi: [
      {
        nama: "Sastra Indonesia",
        deskripsi:
          "Program studi yang mempelajari karya sastra, linguistik, dan budaya Indonesia sebagai bentuk pelestarian serta pengembangan kekayaan bahasa dan budaya nasional."
      },
      {
        nama: "Sastra Inggris",
        deskripsi:
          "Program studi yang menekankan pada penguasaan bahasa Inggris, kajian sastra dunia, serta penerapan komunikasi lintas budaya dalam konteks global."
      },
      {
        nama: "Sejarah",
        deskripsi:
          "Program studi yang mendalami perjalanan sejarah manusia, dengan fokus pada analisis peristiwa, tokoh, dan kebudayaan dalam konteks sosial dan politik."
      }
    ]
  },
  {
    fakultas: "Fakultas Teknik",
    deskripsi: "Fakultas yang mengedepankan inovasi dan penerapan teknologi untuk menjawab tantangan pembangunan berkelanjutan di berbagai sektor industri.",
    prodi: [
      {
        nama: "Teknik Sipil",
        deskripsi:
          "Program studi yang berfokus pada perancangan dan pembangunan infrastruktur seperti jembatan, gedung, dan jalan raya dengan prinsip keamanan dan efisiensi."
      },
      {
        nama: "Teknik Elektro",
        deskripsi:
          "Program studi yang mengajarkan konsep dan aplikasi kelistrikan, sistem kontrol, serta teknologi energi modern."
      },
      {
        nama: "Teknik Informatika",
        deskripsi:
          "Program studi yang mempersiapkan mahasiswa dalam pengembangan perangkat lunak, kecerdasan buatan, dan sistem informasi untuk era digital."
      }
    ]
  }
];


export default function Fakultas() {
    return (
        <>
            <div>
                <HomeCarousel />
                <div className="flex flex-col items-center py-16 pb-16 px-4 sm:px-8 max-w-10/12 mx-auto">
                    <h2 className="text-4xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
                        Fakultas & Program Studi Universitas Global Nusantara
                    </h2>
                    {
                        data.map((data, index) => (
                            (
                                <>
                                    <h2 className="text-3xl sm:text-2xl font-semibold mb-2 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-6">
                                        {data.fakultas}

                                        
                                    </h2>
                                    <div className="w-full mb-4">
                                        {data.deskripsi}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {
                                            data['prodi'].map((prodi, index) => (
                                                <Card key={index} className="grid grid-cols-1 p-4 gap-3">
                                                    <h2 className="text-2xl sm:text-xl font-semibold w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
                                                        
                        {prodi.nama}
                    </h2>
                                                    <p className="text-sm text-gray-500">
                                                    {prodi.deskripsi}
                                                    </p>
                                                    <Button variant={"green"} className={"w-4/10"}>
                                                        Selengkapnya
                                                    </Button>
                                                </Card>
                                            ))}
                                    </div>
                                </>
                            )
                        ))
                    }
                </div>
            </div>
        </>
    )
}