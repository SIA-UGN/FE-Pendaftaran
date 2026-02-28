"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, X, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const news = [
  {
    title: "Peluncuran Program Beasiswa Baru untuk Mahasiswa Berprestasi",
    date: "15 Februari 2026",
    readTime: "3 menit baca",
    category: "Beasiswa",
    summary:
      "Universitas Global Nusantara dengan bangga mengumumkan peluncuran program beasiswa baru yang ditujukan untuk mahasiswa berprestasi akademik dan non-akademik.",
    image: "/auth.png",
    featured: true,
    content: `Universitas Global Nusantara (UGN) resmi meluncurkan Program Beasiswa Prestasi 2026, sebuah inisiatif strategis untuk mendukung mahasiswa berbakat dari seluruh Indonesia. Program ini mencakup beasiswa penuh dan parsial yang diberikan berdasarkan prestasi akademik maupun non-akademik.

Rektor UGN, Prof. Dr. Ahmad Fauzi, M.Pd., menyampaikan bahwa program ini merupakan bentuk komitmen universitas terhadap aksesibilitas pendidikan tinggi berkualitas. "Kami percaya setiap mahasiswa berpotensi, dan beasiswa ini hadir untuk memastikan biaya tidak menjadi penghalang mereka meraih cita-cita," ujarnya.

Program beasiswa ini terbagi menjadi tiga kategori: Beasiswa Akademik Penuh (100% biaya kuliah), Beasiswa Prestasi Non-Akademik (50% biaya kuliah), dan Beasiswa Keluarga Kurang Mampu Berprestasi (75% biaya kuliah). Pendaftaran dibuka mulai 1 Maret hingga 30 April 2026.

Calon penerima beasiswa wajib memenuhi syarat IPK minimal 3.50 untuk kategori akademik, atau melampirkan sertifikat prestasi tingkat nasional untuk kategori non-akademik. Seleksi dilakukan melalui tahap administrasi, tes potensi, dan wawancara.`,
  },
  {
    title: "Kerjasama Internasional dengan Universitas Terkemuka di Asia",
    date: "10 Februari 2026",
    readTime: "4 menit baca",
    category: "Kerjasama",
    summary:
      "UGN menjalin kerjasama strategis dengan beberapa universitas terkemuka di Asia guna memperluas jaringan akademik dan penelitian.",
    image: "/auth.png",
    content: `Universitas Global Nusantara (UGN) resmi menandatangani Memorandum of Understanding (MoU) dengan lima universitas terkemuka di kawasan Asia, termasuk National Taiwan University, Chulalongkorn University Thailand, dan Universiti Malaya Malaysia.

Penandatanganan ini dilakukan dalam rangkaian acara International Academic Forum 2026 yang diselenggarakan di Jakarta. Kerja sama ini mencakup program pertukaran mahasiswa dan dosen, penelitian bersama, serta pengembangan kurikulum berbasis standar internasional.

Wakil Rektor Bidang Kerjasama, Dr. Sri Mulyani, M.Si., menjelaskan bahwa melalui kerja sama ini, mahasiswa UGN akan mendapat kesempatan menempuh satu semester di universitas mitra tanpa biaya tambahan. "Ini adalah langkah nyata menuju kampus bereputasi internasional," tuturnya.

Program pertukaran pertama dijadwalkan mulai semester ganjil tahun akademik 2026/2027. Mahasiswa yang berminat dapat mendaftar melalui Biro Kerjasama Internasional UGN mulai Maret 2026.`,
  },
  {
    title: "Inovasi Teknologi dalam Pembelajaran Daring di UGN",
    date: "5 Februari 2026",
    readTime: "3 menit baca",
    category: "Teknologi",
    summary:
      "Dalam upaya meningkatkan kualitas pembelajaran daring, Universitas Global Nusantara telah mengimplementasikan berbagai inovasi teknologi terbaru.",
    image: "/auth.png",
    content: `Universitas Global Nusantara terus berkomitmen meningkatkan kualitas pendidikan melalui adopsi teknologi mutakhir. Pada tahun 2026, UGN resmi meluncurkan platform pembelajaran daring generasi baru yang dilengkapi dengan fitur kecerdasan buatan (AI).

Platform bernama UGN LMS 2.0 ini mengintegrasikan teknologi adaptive learning yang mampu menyesuaikan materi pembelajaran dengan kecepatan dan gaya belajar masing-masing mahasiswa. Selain itu, tersedia fitur AI Tutor yang dapat menjawab pertanyaan mahasiswa secara real-time selama 24 jam.

Kepala Pusat Teknologi Informasi UGN, Ir. Budi Santoso, M.T., menjelaskan bahwa sistem baru ini juga dilengkapi dengan analytics dashboard yang memungkinkan dosen memantau perkembangan setiap mahasiswa secara detail. "Dengan data ini, dosen dapat memberikan intervensi lebih awal jika ada mahasiswa yang mengalami kesulitan," jelasnya.

Seluruh mahasiswa aktif UGN kini dapat mengakses platform ini melalui aplikasi mobile UGN yang tersedia di App Store dan Google Play, atau melalui browser di lms.ugn.ac.id.`,
  },
  {
    title: "Seminar Nasional Kewirausahaan dan Ekonomi Kreatif",
    date: "28 Januari 2026",
    readTime: "2 menit baca",
    category: "Event",
    summary:
      "UGN mengadakan seminar nasional bertema kewirausahaan dan ekonomi kreatif yang dihadiri oleh berbagai pembicara tamu dari dunia bisnis.",
    image: "/auth.png",
    content: `Universitas Global Nusantara sukses menyelenggarakan Seminar Nasional Kewirausahaan dan Ekonomi Kreatif 2026 yang berlangsung di Auditorium Utama UGN pada 28 Januari 2026. Acara ini dihadiri lebih dari 800 peserta dari berbagai perguruan tinggi di Indonesia.

Seminar menghadirkan pembicara kelas dunia, di antaranya CEO salah satu unicorn Indonesia, founder startup teknologi terkemuka, dan Direktur Jenderal Ekonomi Kreatif Kementerian Pariwisata dan Ekonomi Kreatif. Materi yang dibahas mencakup tren ekonomi digital, strategi membangun startup dari nol, hingga peluang bisnis di era kecerdasan buatan.

Dekan Fakultas Ekonomi dan Bisnis UGN, Dr. Anita Rahayu, M.M., mengungkapkan bahwa seminar ini merupakan bagian dari komitmen UGN membentuk lulusan yang tidak hanya siap kerja, tetapi juga mampu menciptakan lapangan kerja. "Kami ingin mahasiswa kami menjadi penggerak ekonomi bangsa," ujarnya.

Seluruh materi presentasi dan rekaman seminar dapat diakses oleh mahasiswa UGN melalui portal akademik resmi universitas.`,
  },
];

const categoryColor = {
  Beasiswa:  { bg: '#DABC4E22', text: '#a08a20', border: '#DABC4E55' },
  Kerjasama: { bg: '#01502322', text: '#015023', border: '#01502355' },
  Teknologi: { bg: '#1e40af22', text: '#1e40af', border: '#1e40af55' },
  Event:     { bg: '#7c3aed22', text: '#7c3aed', border: '#7c3aed55' },
};

function NewsModal({ item, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const cat = categoryColor[item.category] ?? categoryColor.Event;
  const paragraphs = item.content.split("\n\n").filter(Boolean);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Blur backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal panel */}
        <motion.div
          className="relative z-10 w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[85dvh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#fff', fontFamily: 'Urbanist, system-ui, sans-serif' }}
          initial={{ y: 60, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image header */}
          <div className="relative w-full h-44 sm:h-52 flex-shrink-0">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>

            {/* Category + date on image */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.85)' }}
              >
                {item.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Calendar size={11} />
                {item.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Clock size={11} />
                {item.readTime}
              </span>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-5 sm:px-7 py-5 sm:py-6">
            {/* Pull indicator (mobile) */}
            <div className="sm:hidden w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4 -mt-1" />

            <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-4" style={{ color: '#015023' }}>
              {item.title}
            </h2>

            {/* Accent line */}
            <div className="w-10 h-[3px] rounded-full mb-5" style={{ backgroundColor: '#DABC4E' }} />

            {/* Article paragraphs */}
            <div className="flex flex-col gap-4">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-5 sm:px-7 py-4 border-t"
            style={{ borderColor: '#E6EEE9' }}
          >
            <p className="text-xs text-gray-400">Universitas Global Nusantara</p>
            <button
              onClick={onClose}
              className="text-sm font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: '#015023' }}
            >
              Tutup <X size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function News() {
  const [data] = useState(news);
  const [selected, setSelected] = useState(null);
  const featured = data[0];
  const rest = data.slice(1);

  return (
    <>
      <section
        className="flex flex-col items-start py-10 sm:py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full gap-6 sm:gap-8"
        style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
      >
        {/* Heading */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-8 h-[3px] rounded-full" style={{ backgroundColor: '#DABC4E' }} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#015023' }}>
            Berita Terbaru
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Informasi dan kabar terkini dari Universitas Global Nusantara
          </p>
        </div>

        {/* Grid: featured left + small cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">

          {/* Featured card */}
          <div
            className="relative w-full h-full min-h-[340px] rounded-2xl overflow-hidden shadow-md group cursor-pointer"
            onClick={() => setSelected(featured)}
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: '#DABC4E', color: '#015023' }}
              >
                Featured
              </span>
              <span className="flex items-center gap-1 text-xs text-white/90 bg-black/30 px-2.5 py-1 rounded-full">
                <Calendar size={12} />
                {featured.date}
              </span>
            </div>

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h3 className="text-white font-bold text-lg sm:text-xl leading-snug mb-2">
                {featured.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-3">
                {featured.summary}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all group-hover:gap-2.5"
                style={{ backgroundColor: 'rgba(218,188,78,0.2)', color: '#DABC4E', border: '1px solid rgba(218,188,78,0.4)' }}
              >
                Baca Selengkapnya <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Small news cards */}
          <div className="flex flex-col gap-4 h-full">
            {rest.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border bg-white hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group flex-1"
                style={{ borderColor: '#E6EEE9' }}
                onClick={() => setSelected(item)}
              >
                <div className="relative w-24 sm:w-28 flex-shrink-0 h-full min-h-[96px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="py-3 pr-4 flex flex-col justify-center gap-1.5">
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: '#DABC4E' }}>
                    <Calendar size={12} />
                    {item.date}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2" style={{ color: '#015023' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold mt-0.5 group-hover:gap-1.5 transition-all" style={{ color: '#015023' }}>
                    Baca <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selected && <NewsModal item={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
