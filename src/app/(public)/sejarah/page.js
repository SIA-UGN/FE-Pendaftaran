import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Heading } from "@/components/Heading";

const TimelineCard = ({ era, title, subtitle, description }) => (
  <div
    className="flex flex-col gap-3"
    style={{
      backgroundColor: "#ffffff",
      border: "1px solid #E6EEE9",
      borderRadius: "16px",
      padding: "20px 24px",
    }}
  >
    <div>
      <Button variant="secondary" className="text-sm sm:text-base">
        {era}
      </Button>
    </div>
    <div
      className="flex flex-col sm:flex-row gap-2 font-bold text-lg sm:text-xl lg:text-2xl"
      style={{ color: "#015023" }}
    >
      <p>{title}</p>
      <span className="hidden sm:inline">-</span>
      <p>{subtitle}</p>
    </div>
    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
      {description}
    </p>
  </div>
);

export default function History() {
  return (
    <div>
      <HomeCarousel />
      <div className="flex flex-col items-center py-8 sm:py-12 lg:py-16 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto gap-5 sm:gap-6 lg:gap-8">
        <Heading title="Sejarah Universitas Global Nusantara" variant="first" />
        <div className="w-full flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <div
            className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden"
            style={{ borderRadius: "16px" }}
          >
            <Image src="/auth.png" alt="sejarah" fill className="object-cover" />
          </div>

          <p className="font-medium text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: "#015023" }}>
            Universitas Global Nusantara merupakan lembaga pendidikan tinggi
            yang berdiri di bawah naungan Yayasan Matholi`ul Huda Yogyakarta.
            Kehadirannya tidak terlepas dari akar sejarah panjang pesantren di
            Kajen, Pati, yang berawal dari perjuangan dan dedikasi para ulama
            pendiri pesantren.
          </p>

          <Heading title={"Latar Belakang Sejarah"} />

          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <TimelineCard
              era="Era Awal"
              title="Kiai Abdussalam"
              subtitle="Pendiri Pesantren"
              description="Kiai Abdussalam mendirikan pesantren yang kemudian dikenal dengan nama Matholi`ul Huda, yang bermakna sumber petunjuk. Pesantren ini menjadi cikal bakal dari lembaga-lembaga pendidikan yang berkembang kemudian, termasuk Universitas Global Nusantara."
            />
            <TimelineCard
              era="1910-an"
              title="Kiai Mahfudh"
              subtitle="Melanjutkan Estafet"
              description="Putra Kiai Abdussalam, Kiai Mahfudh, melanjutkan perjuangan dengan merintis pesantren sekitar tahun 1910-an. Beliau adalah ulama yang pernah menimba ilmu di Makkah serta berguru kepada Kiai Hasyim Asy`ari di Tebuireng."
            />
            <TimelineCard
              era="1963"
              title="Kiai Sahal Mahfudh"
              subtitle="Era Transformasi"
              description="Tahun 1963 menandai babak baru dalam sejarah pesantren. Kepemimpinan pesantren dilanjutkan oleh Kiai Sahal Mahfudh, yang kemudian mengganti namanya menjadi Pesantren Maslakul Huda (PMH), bermakna jalannya petunjuk."
            />
          </div>

          <Heading title={"Peran dan Perkembangan"} />

          <div className="flex flex-col gap-3 sm:gap-4 text-gray-800 leading-relaxed">
            {[
              "Pesantren Maslakul Huda berkembang menjadi salah satu pesantren terbesar dan tertua di Kajen, serta berperan penting dalam perjuangan kemerdekaan Indonesia dan pendidikan masyarakat.",
              "Di bawah kepemimpinan Kiai Sahal Mahfudh, pesantren menjalin komunikasi luas dengan masyarakat dan memperluas kiprahnya melalui berbagai lembaga pendidikan formal maupun non-formal.",
              "Lembaga pendidikan yang lahir dari rahim pesantren ini antara lain SMK Cordova serta penerapan sistem Pendidikan Diniyah Formal (PDF).",
              "Peranannya tidak hanya dalam pendidikan, tetapi juga sosial, budaya, dan pengembangan intelektual santri.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CircleCheck size={20} strokeWidth={1.5} className="mt-1 flex-shrink-0 sm:w-6 sm:h-6" style={{ color: "#015023" }} />
                <span className="text-sm sm:text-base flex-1">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
