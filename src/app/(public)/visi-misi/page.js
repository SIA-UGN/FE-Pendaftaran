import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Image from "next/image";
import { Heading } from "@/components/Heading";

const MisiCard = ({ title, description }) => (
  <div
    className="flex flex-col gap-2 sm:gap-3 hover:shadow-lg transition-shadow"
    style={{
      backgroundColor: "#ffffff",
      border: "1px solid #E6EEE9",
      borderRadius: "16px",
      padding: "20px 24px",
    }}
  >
    <p className="font-bold text-lg sm:text-xl lg:text-2xl" style={{ color: "#015023" }}>
      {title}
    </p>
    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{description}</p>
  </div>
);

export default function VisiMisi() {
  const misiItems = [
    {
      title: "Melanjutkan Tradisi Keilmuan Pesantren",
      description: "Mengintegrasikan nilai-nilai pesantren, khususnya warisan intelektual dan spiritual dari Pesantren Maslakul Huda, ke dalam sistem pendidikan tinggi modern.",
    },
    {
      title: "Mengembangkan Pendidikan Tinggi yang Kompetitif",
      description: "Menjadi lembaga pendidikan yang mampu bersaing di tingkat nasional dan global, dengan menghadirkan kurikulum yang relevan, riset yang produktif, serta kolaborasi internasional.",
    },
    {
      title: "Mencetak Generasi Berkarakter dan Berdaya Saing",
      description: "Membentuk lulusan yang memiliki landasan moral, keilmuan mendalam, keterampilan profesional, serta kepekaan sosial untuk menjawab tantangan zaman.",
    },
    {
      title: "Menguatkan Peran Yogyakarta sebagai Kota Pendidikan",
      description: "Memberikan kontribusi nyata terhadap ekosistem pendidikan Yogyakarta yang inklusif, dinamis, dan inovatif.",
    },
    {
      title: "Membangun Jejaring Sosial dan Kemanusiaan",
      description: "Menjalin kerjasama dengan berbagai lembaga, baik lokal maupun internasional, untuk mendorong lahirnya gagasan, inovasi, dan solusi bagi masyarakat luas.",
    },
  ];

  return (
    <>
      <div>
        <HomeCarousel />
        <div className="flex flex-col items-center py-8 sm:py-12 lg:py-16 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Heading title="Visi Misi Universitas Global Nusantara" variant="first" />
          <div className="flex flex-col w-full gap-5 sm:gap-6 lg:gap-8 items-center">
            <div
              className="relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 h-64 sm:h-80 md:h-96 overflow-hidden"
              style={{ borderRadius: "16px" }}
            >
              <Image src="/auth.png" alt="visi misi" fill className="object-cover" />
            </div>

            <div
              className="w-full p-6 sm:p-8 lg:p-10 flex flex-col items-center gap-3 sm:gap-4"
              style={{ backgroundColor: "#E6EEE9", borderRadius: "16px", border: "1px solid #D9E5DE" }}
            >
              <p className="font-bold text-2xl sm:text-3xl lg:text-4xl" style={{ color: "#015023" }}>
                Visi
              </p>
              <p className="text-center text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-4xl">
                Universitas Global Nusantara hadir untuk melanjutkan tradisi keilmuan pesantren yang berpadu
                dengan sistem pendidikan modern, sehingga mampu melahirkan generasi yang berkarakter, berilmu,
                serta berperan aktif dalam pembangunan bangsa dan dunia.
              </p>
            </div>

            <p
              className="font-bold text-2xl sm:text-3xl lg:text-4xl pb-2 mt-4 sm:mt-6"
              style={{ color: "#015023", borderBottom: "2px solid #DABC4E" }}
            >
              Misi
            </p>

            <p className="text-center text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed max-w-4xl px-2">
              Yogyakarta dipilih sebagai pusat pengembangan Universitas Global Nusantara karena kota ini dikenal
              sebagai kota pendidikan, budaya, dan pergerakan intelektual. Kehadiran universitas di Yogyakarta
              bertujuan untuk:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 w-full">
              {misiItems.map((item, i) => (
                <MisiCard key={i} title={item.title} description={item.description} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
