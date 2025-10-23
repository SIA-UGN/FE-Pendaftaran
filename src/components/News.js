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
  const [data, setData] = useState(news); // langsung pakai data statis

  return (
    <div className="flex flex-col items-center pt-4 pb-16 px-4 sm:px-8 max-w-11/12 mx-auto">
      <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
        Berita Terbaru
      </h2>

      <div className="flex flex-col gap-12 w-full">
        {data.map((item) => (
          <Card key={item.title} className="flex flex-col md:flex-row w-full overflow-hidden p-0">
            {/* Image wrapper */}
            <div className="relative w-full md:w-1/3 h-64 md:h-auto flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title || "News Image"}
                fill
                className="object-cover rounded-l-md"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4 md:w-2/3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl md:text-2xl">{item.title}</h3>
                <span className="text-gray-500 text-sm">{item.date}</span>
              </div>
              <p className="text-gray-700">{item.summary}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}