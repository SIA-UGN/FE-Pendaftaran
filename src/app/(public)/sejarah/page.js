import HomeCarousel from "@/components/HomeCarousel";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

export default function History() {
  return (
    <div>
      <HomeCarousel />
      <div className="flex flex-col items-center py-16 pb-16 px-4 sm:px-8 max-w-10/12 mx-auto gap-5">
        <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
          Sejarah Universitas Global Nusantara
        </h2>
        <div className="w-full flex flex-col gap-5">
          <div className="relative w-full h-96 sm:h-96">
            <Image
              src="/auth.png"
              alt="sejarah"
              fill
              className="object-cover"
            />
          </div>
          <p className="font-medium text-lg text-[var(--green)]">
            Universitas Global Nusantara merupakan lembaga pendidikan tinggi
            yang berdiri di bawah naungan Yayasan Matholi’ul Huda Yogyakarta.
            Kehadirannya tidak terlepas dari akar sejarah panjang pesantren di
            Kajen, Pati, yang berawal dari perjuangan dan dedikasi para ulama
            pendiri pesantren.
          </p>
          <h2 className="text-3xl sm:text-2xl font-semibold mb-2 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-6">
            Latar Belakang Sejarah
          </h2>
          <Card className={"p-4 gap-4"}>
            <Button className={"w-fit"} variant={"green"}>
              Era Awal
            </Button>
            <div className="flex gap-2 font-bold text-[var(--green)] text-xl">
              <p>Kiai Abdussalam</p> -<p>Pendiri Pesantren</p>
            </div>
            <p className="text-gray-500">
              Kiai Abdussalam mendirikan pesantren yang kemudian dikenal dengan
              nama Matholi'ul Huda, yang bermakna "sumber petunjuk". Pesantren
              ini menjadi cikal bakal dari lembaga-lembaga pendidikan yang
              berkembang kemudian, termasuk Universitas Global Nusantara.
            </p>
          </Card>
          <Card className={"p-4 gap-4"}>
            <Button className={"w-fit"} variant={"green"}>
              1910-an
            </Button>
            <div className="flex gap-2 font-bold text-[var(--green)] text-xl">
              <p>Kiai Mahfudh</p> -<p>Melanjutkan Estafet</p>
            </div>

            <p className="text-gray-500">
              {" "}
              Putra Kiai Abdussalam, Kiai Mahfudh, melanjutkan perjuangan dengan
              merintis pesantren sekitar tahun 1910-an. Beliau adalah ulama yang
              pernah menimba ilmu di Makkah serta berguru kepada Kiai Hasyim
              Asy'ari di Tebuireng. Pada awalnya, pesantren yang dirintis Kiai
              Mahfudh dikenal dengan nama Putra (akronim dari Gempol–Garut),
              yang mencerminkan lokasi dan identitas geografisnya
            </p>
          </Card>
          <Card className={"p-4 gap-4"}>
            <Button className={"w-fit"} variant={"green"}>
              1963
            </Button>
            <div className="flex gap-2 font-bold text-[var(--green)] text-xl">
              <p>Kiai Sahal Mahfudh</p> -<p>Era Transformasi</p>
            </div>
            <p className="text-gray-500">
              Tahun 1963 menandai babak baru dalam sejarah pesantren.
              Kepemimpinan pesantren dilanjutkan oleh Kiai Sahal Mahfudh, yang
              kemudian mengganti namanya menjadi Pesantren Maslakul Huda (PMH),
              bermakna "jalannya petunjuk". Di bawah kepemimpinan beliau,
              pesantren mengalami transformasi signifikan, menjalin komunikasi
              luas dengan masyarakat dan memperluas kiprahnya melalui berbagai
              lembaga pendidikan formal maupun non-formal.
            </p>
          </Card>

          <h2 className="text-3xl sm:text-2xl font-semibold w-full border-b-1 border-gray-500 pb-2 text-[var(--green)] mt-6 mb-2">
            Peran dan Perkembangan
          </h2>
          <div className="flex flex-col gap-3 text-gray-800 leading-relaxed">
            {[
              "Pesantren Maslakul Huda berkembang menjadi salah satu pesantren terbesar dan tertua di Kajen, serta berperan penting dalam perjuangan kemerdekaan Indonesia dan pendidikan masyarakat.",
              "Di bawah kepemimpinan Kiai Sahal Mahfudh, pesantren menjalin komunikasi luas dengan masyarakat dan memperluas kiprahnya melalui berbagai lembaga pendidikan formal maupun non-formal.",
              "Lembaga pendidikan yang lahir dari rahim pesantren ini antara lain SMK Cordova serta penerapan sistem Pendidikan Diniyah Formal (PDF).",
              "Peranannya tidak hanya dalam pendidikan, tetapi juga sosial, budaya, dan pengembangan intelektual santri.",
            ].map((text, i) => (
              <p key={i} className="flex items-start gap-3">
                <CircleCheck
                  size={24}
                  strokeWidth={1.5}
                  className="mt-1 text-[var(--green)] flex-shrink-0"
                />
                <span className="w-5xl">{text}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
