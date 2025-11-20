import HomeCarousel from "@/components/landing-page/HomeCarousel";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Heading } from "@/components/Heading";
import Head from "next/head";

export default function History() {
  return (
    <div>
      <HomeCarousel />
      <div className="flex flex-col items-center py-8 sm:py-12 lg:py-16 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto gap-5 sm:gap-6 lg:gap-8">
        <Heading
          title="Sejarah Universitas Global Nusantara"
          variant="first"
        />
        <div className="w-full flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {/* Image Section - Responsive Height */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden">
            <Image
              src="/auth.png"
              alt="sejarah"
              fill
              className="object-cover"
            />
          </div>

          {/* Introduction Text */}
          <p className="font-medium text-base sm:text-lg lg:text-xl text-[var(--green)] leading-relaxed">
            Universitas Global Nusantara merupakan lembaga pendidikan tinggi
            yang berdiri di bawah naungan Yayasan Matholi`ul Huda Yogyakarta.
            Kehadirannya tidak terlepas dari akar sejarah panjang pesantren di
            Kajen, Pati, yang berawal dari perjuangan dan dedikasi para ulama
            pendiri pesantren.
          </p>

          <Heading title={"Latar Belakang Sejarah"} />

          {/* Timeline Cards */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Card 1 - Era Awal */}
            <Card className="p-4 sm:p-5 lg:p-6 gap-3 sm:gap-4">
              <Button className="w-fit text-sm sm:text-base" variant="green">
                Era Awal
              </Button>
              <div className="flex flex-col sm:flex-row gap-2 font-bold text-[var(--green)] text-lg sm:text-xl lg:text-2xl">
                <p>Kiai Abdussalam</p>
                <span className="hidden sm:inline">-</span>
                <p>Pendiri Pesantren</p>
              </div>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Kiai Abdussalam mendirikan pesantren yang kemudian dikenal
                dengan nama Matholi`ul Huda, yang bermakna sumber petunjuk.
                Pesantren ini menjadi cikal bakal dari lembaga-lembaga
                pendidikan yang berkembang kemudian, termasuk Universitas Global
                Nusantara.
              </p>
            </Card>

            {/* Card 2 - 1910-an */}
            <Card className="p-4 sm:p-5 lg:p-6 gap-3 sm:gap-4">
              <Button className="w-fit text-sm sm:text-base" variant="green">
                1910-an
              </Button>
              <div className="flex flex-col sm:flex-row gap-2 font-bold text-[var(--green)] text-lg sm:text-xl lg:text-2xl">
                <p>Kiai Mahfudh</p>
                <span className="hidden sm:inline">-</span>
                <p>Melanjutkan Estafet</p>
              </div>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Putra Kiai Abdussalam, Kiai Mahfudh, melanjutkan perjuangan
                dengan merintis pesantren sekitar tahun 1910-an. Beliau adalah
                ulama yang pernah menimba ilmu di Makkah serta berguru kepada
                Kiai Hasyim Asy`ari di Tebuireng. Pada awalnya, pesantren yang
                dirintis Kiai Mahfudh dikenal dengan nama Putra (akronim dari
                Gempol–Garut), yang mencerminkan lokasi dan identitas
                geografisnya.
              </p>
            </Card>

            {/* Card 3 - 1963 */}
            <Card className="p-4 sm:p-5 lg:p-6 gap-3 sm:gap-4">
              <Button className="w-fit text-sm sm:text-base" variant="green">
                1963
              </Button>
              <div className="flex flex-col sm:flex-row gap-2 font-bold text-[var(--green)] text-lg sm:text-xl lg:text-2xl">
                <p>Kiai Sahal Mahfudh</p>
                <span className="hidden sm:inline">-</span>
                <p>Era Transformasi</p>
              </div>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Tahun 1963 menandai babak baru dalam sejarah pesantren.
                Kepemimpinan pesantren dilanjutkan oleh Kiai Sahal Mahfudh, yang
                kemudian mengganti namanya menjadi Pesantren Maslakul Huda
                (PMH), bermakna jalannya petunjuk. Di bawah kepemimpinan
                beliau, pesantren mengalami transformasi signifikan, menjalin
                komunikasi luas dengan masyarakat dan memperluas kiprahnya
                melalui berbagai lembaga pendidikan formal maupun non-formal.
              </p>
            </Card>
          </div>

          <Heading title={"Peran dan Perkembangan"} />

          {/* Bullet Points Section */}
          <div className="flex flex-col gap-3 sm:gap-4 text-gray-800 leading-relaxed">
            {[
              "Pesantren Maslakul Huda berkembang menjadi salah satu pesantren terbesar dan tertua di Kajen, serta berperan penting dalam perjuangan kemerdekaan Indonesia dan pendidikan masyarakat.",
              "Di bawah kepemimpinan Kiai Sahal Mahfudh, pesantren menjalin komunikasi luas dengan masyarakat dan memperluas kiprahnya melalui berbagai lembaga pendidikan formal maupun non-formal.",
              "Lembaga pendidikan yang lahir dari rahim pesantren ini antara lain SMK Cordova serta penerapan sistem Pendidikan Diniyah Formal (PDF).",
              "Peranannya tidak hanya dalam pendidikan, tetapi juga sosial, budaya, dan pengembangan intelektual santri.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CircleCheck
                  size={20}
                  strokeWidth={1.5}
                  className="mt-1 text-[var(--green)] flex-shrink-0 sm:w-6 sm:h-6"
                />
                <span className="text-sm sm:text-base flex-1">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}