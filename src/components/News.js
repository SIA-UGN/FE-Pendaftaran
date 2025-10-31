"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const news = [
  {
    title: "Peluncuran Program Beasiswa Baru untuk Mahasiswa Berprestasi",
    date: "2024-06-15",
    summary:
      "Universitas Global Nusantara dengan bangga mengumumkan peluncuran program beasiswa baru yang ditujukan untuk mahasiswa berprestasi akademik dan non-akademik. Program ini bertujuan untuk mendukung pengembangan potensi mahasiswa dan memberikan kesempatan lebih luas bagi mereka untuk meraih kesuksesan.",
    image: "/auth.png",
  },
  {
    title: "Kerjasama Internasional dengan Universitas Terkemuka di Asia",
    date: "2024-06-10",
    summary:
      "Universitas Global Nusantara telah menjalin kerjasama strategis dengan beberapa universitas terkemuka di Asia guna memperluas jaringan akademik dan penelitian. Kerjasama ini mencakup pertukaran mahasiswa, kolaborasi penelitian, dan program gelar ganda yang akan memberikan manfaat besar bagi komunitas akademik kita.",
    image: "/auth.png",
  },
  {
    title: "Inovasi Teknologi dalam Pembelajaran Daring di UGN",
    date: "2024-06-05",
    summary:
      "Dalam upaya meningkatkan kualitas pembelajaran daring, Universitas Global Nusantara telah mengimplementasikan berbagai inovasi teknologi terbaru. Mulai dari penggunaan platform pembelajaran interaktif hingga integrasi kecerdasan buatan untuk personalisasi pengalaman belajar mahasiswa, langkah ini menunjukkan komitmen UGN dalam menyediakan pendidikan berkualitas tinggi di era digital.",
    image: "/auth.png",
  },
];

export default function News() {
  const [data, setData] = useState(news);

  return (
    <div className="flex flex-col items-center pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-10 w-full border-b border-gray-300 pb-3 sm:pb-4 text-[var(--green)]">
        Berita Terbaru
      </h2>

      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 w-full">
        {data.map((item) => (
          <Card key={item.title} className="flex flex-col md:flex-row w-full overflow-hidden p-0 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-full md:w-2/5 lg:w-1/3 h-48 sm:h-56 md:h-auto md:min-h-[250px] lg:min-h-[280px] flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title || "News Image"}
                fill
                className="object-cover md:rounded-l-md"
              />
            </div>

            <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 md:w-3/5 lg:w-2/3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-[var(--green)] leading-tight pr-0 sm:pr-4">
                  {item.title}
                </h3>
                <span className="text-gray-500 text-xs sm:text-sm flex-shrink-0 order-first sm:order-last">
                  {item.date}
                </span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-5 lg:line-clamp-none">
                {item.summary}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}