import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  BookOpen,
  Globe,
  Users,
  Lightbulb,
  Heart,
  GraduationCap,
  Network,
  ShieldCheck,
  FlaskConical,
  Star,
  CheckCircle2,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const heroPills = ["Berkarakter", "Berilmu", "Berdaya Saing"];

const visiTags = [
  { icon: BookOpen,       label: "Tradisi Keilmuan" },
  { icon: GraduationCap, label: "Pendidikan Modern" },
  { icon: Users,          label: "Generasi Berkarakter" },
  { icon: Globe,          label: "Peran Global" },
];

const misiItems = [
  {
    icon: BookOpen,
    number: "Misi 01",
    title: "Melanjutkan Tradisi Keilmuan Pesantren",
    desc: "Mengintegrasikan nilai-nilai pesantren, khususnya warisan intelektual dan spiritual dari Pesantren Maslakul Huda, ke dalam sistem pendidikan tinggi modern yang relevan dan berdaya saing.",
  },
  {
    icon: Globe,
    number: "Misi 02",
    title: "Mengembangkan Pendidikan Tinggi yang Kompetitif",
    desc: "Menjadi lembaga pendidikan yang mampu bersaing di tingkat nasional dan global, dengan menghadirkan kurikulum yang relevan, riset yang produktif, dan program yang berkolaborasi secara internasional.",
  },
  {
    icon: Users,
    number: "Misi 03",
    title: "Mencetak Generasi Berkarakter dan Berdaya Saing",
    desc: "Membentuk lulusan yang memiliki landasan moral dan keilmuan mendalam, keterampilan profesional, serta kepekaan sosial dalam menyikapi tantangan zaman yang terus berubah.",
  },
  {
    icon: Lightbulb,
    number: "Misi 04",
    title: "Menguatkan Peran Yogyakarta sebagai Kota Pendidikan",
    desc: "Memberikan kontribusi nyata terhadap ekosistem pendidikan Yogyakarta yang edukatif, dinamis, dan inovatif — menjadikan kota ini semakin kuat sebagai pusat intelektual nusantara.",
  },
  {
    icon: Network,
    number: "Misi 05",
    title: "Membangun Jejaring Sosial dan Kemanusiaan",
    desc: "Menjalin kerjasama dengan berbagai lembaga, baik lokal maupun internasional, untuk mendorong terwujudnya gagasan, inovasi, dan solusi nyata bagi masyarakat luas.",
  },
];

const nilaiItems = [
  {
    icon: ShieldCheck,
    title: "Islami",
    desc: "Berasaskan nilai-nilai Islam dan bersumber dari Al-Qur'an.",
  },
  {
    icon: FlaskConical,
    title: "Ilmiah",
    desc: "Berbasis riset dan pengembangan pengetahuan.",
  },
  {
    icon: Heart,
    title: "Inklusif",
    desc: "Terbuka dan menghargai keberagaman latar belakang.",
  },
  {
    icon: Lightbulb,
    title: "Inovatif",
    desc: "Adaptif terhadap perubahan dan kemajuan zaman.",
  },
  {
    icon: Star,
    title: "Integritas",
    desc: "Jujur, amanah, dan bertanggung jawab penuh.",
  },
];

const ctaFeatures = [
  "Kurikulum berbasis nilai pesantren & modern",
  "Tenaga pengajar berpengalaman & tersertifikasi",
  "Lingkungan akademik Islami & kondusif",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <span
    className="self-start text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
    style={{ backgroundColor: "#E6EEE9", color: "#015023" }}
  >
    {children}
  </span>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VisiMisi() {
  return (
    <div style={{ fontFamily: "Urbanist, system-ui, sans-serif" }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
        <Image src="/auth.png" alt="hero visi misi" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-xs font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/profil" className="hover:text-white transition-colors">Profil</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Visi &amp; Misi</span>
          </div>

          <div className="flex flex-col gap-5 max-w-2xl">
            <span
              className="self-start text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(218,188,78,0.2)", color: "#DABC4E", border: "1px solid rgba(218,188,78,0.4)" }}
            >
              Universitas Global Nusantara
            </span>
            <div className="w-10 h-[3px] rounded-full" style={{ backgroundColor: "#DABC4E" }} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Visi &amp; Misi{" "}
              <span style={{ color: "#DABC4E" }}>Universitas Global</span>{" "}
              Nusantara
            </h1>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-lg">
              Arah dan cita-cita utuh kami untuk melahirkan generasi berkarakter, berilmu, dan berdaya saing global.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {heroPills.map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-1.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. VISI ─────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12" style={{ backgroundColor: "#F7FAF8" }}>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <span
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#E6EEE9", color: "#015023" }}
            >
              Visi
            </span>
            <div className="w-8 h-[3px] rounded-full" style={{ backgroundColor: "#DABC4E" }} />
          </div>

          {/* Visi card */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#013d1b", border: "1px solid rgba(218,188,78,0.15)" }}
          >
            {/* Gold top accent bar */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #DABC4E, rgba(218,188,78,0.2))" }} />

            {/* Large decorative background quote mark */}
            <span
              className="absolute right-6 top-4 select-none pointer-events-none font-black leading-none opacity-5"
              style={{ fontSize: "200px", color: "#DABC4E", lineHeight: 1 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div className="relative z-10 p-8 sm:p-10 flex flex-col gap-6">
              {/* Quote icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(218,188,78,0.15)", border: "1px solid rgba(218,188,78,0.25)" }}
              >
                <BookOpen size={18} style={{ color: "#DABC4E" }} />
              </div>

              <p className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium">
                Universitas Global Nusantara hadir untuk{" "}
                <span className="font-bold" style={{ color: "#DABC4E" }}>merajut tradisi keilmuan pesantren</span>{" "}
                yang berpadu dengan sistem pendidikan modern, sehingga mampu{" "}
                <span className="font-bold" style={{ color: "#DABC4E" }}>melahirkan generasi yang berkarakter</span>,
                berilmu serta berperan aktif dalam pembangunan bangsa dan dunia.
              </p>

              {/* Divider */}
              <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

              <div className="flex flex-wrap gap-2">
                {visiTags.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "rgba(218,188,78,0.1)", color: "rgba(218,188,78,0.9)", border: "1px solid rgba(218,188,78,0.2)" }}
                  >
                    <Icon size={12} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. MISI ─────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-4 text-center mb-12">
            <span
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#E6EEE9", color: "#015023" }}
            >
              Misi
            </span>
            <div className="w-8 h-[3px] rounded-full" style={{ backgroundColor: "#DABC4E" }} />
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "#015023" }}>Lima Pilar Misi Kami</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl">
              Yogyakarta dipilih sebagai pusat pengembangan Universitas Global Nusantara karena kota ini dikenal sebagai
              kota pendidikan, budaya, dan pergerakan yang mendukung kehadiran universitas yang mendidik untuk:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {misiItems.map((item, i) => {
              const Icon = item.icon;
              const isLast = i === misiItems.length - 1;
              return (
                <div
                  key={i}
                  className={`group relative flex flex-col gap-4 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 ${isLast ? "md:col-span-2 md:max-w-xl md:mx-auto w-full" : ""}`}
                  style={{ backgroundColor: "#fff", border: "1px solid #E6EEE9" }}
                >
                  {/* Gold left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all group-hover:w-1.5"
                    style={{ backgroundColor: "#DABC4E" }}
                  />

                  <div className="pl-7 pr-6 pt-6 pb-6 flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(218,188,78,0.1)", border: "1px solid rgba(218,188,78,0.2)" }}
                      >
                        <Icon size={20} style={{ color: "#015023" }} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span
                          className="inline-flex items-center text-xs font-black tracking-widest uppercase px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: "#F7FAF8", color: "#DABC4E", border: "1px solid #E6EEE9" }}
                        >
                          {item.number}
                        </span>
                        <h3 className="font-bold text-base sm:text-lg leading-snug mt-0.5" style={{ color: "#015023" }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. NILAI INTI ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12" style={{ backgroundColor: "#F7FAF8" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 mb-10">
            <SectionLabel>Nilai Inti</SectionLabel>
            <div className="w-8 h-[3px] rounded-full" style={{ backgroundColor: "#DABC4E" }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: "#015023" }}>
              Landasan Nilai yang Kami Pegang
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl">
              Lima nilai ini menjadi ruh setiap kegiatan akademik, penelitian, dan pengabdian masyarakat di Universitas Global Nusantara.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {nilaiItems.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group flex flex-col items-center text-center gap-3 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: "#fff", border: "1px solid #E6EEE9" }}
              >
                {/* Gold top bar */}
                <div className="w-full h-1" style={{ background: "linear-gradient(to right, #DABC4E, rgba(218,188,78,0.3))" }} />

                <div className="flex flex-col items-center gap-3 px-4 pb-6 pt-4">
                  <div
                    className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-200"
                    style={{ backgroundColor: "rgba(218,188,78,0.12)", border: "1px solid rgba(218,188,78,0.2)" }}
                  >
                    <Icon size={22} style={{ color: "#015023" }} />
                  </div>
                  <p className="font-bold text-sm" style={{ color: "#015023" }}>{title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. QUOTE ────────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 overflow-hidden" style={{ backgroundColor: "#015023" }}>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #DABC4E 1px, transparent 1px), radial-gradient(circle at 80% 50%, #DABC4E 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          {/* Large decorative quote mark */}
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 select-none pointer-events-none font-black opacity-5"
            style={{ fontSize: "240px", color: "#DABC4E", lineHeight: 1 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <p className="relative text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed">
            &ldquo;Kami tidak hanya mendidik untuk ijazah &mdash; kami mendidik untuk{" "}
            <span style={{ color: "#DABC4E" }}>kehidupan, keimanan, dan kemanusiaan.</span>&rdquo;
          </p>

          {/* Divider + attribution */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px" style={{ backgroundColor: "rgba(218,188,78,0.4)" }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#DABC4E" }} />
              <div className="w-12 h-px" style={{ backgroundColor: "rgba(218,188,78,0.4)" }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: "rgba(218,188,78,0.8)" }}>
              Semangat Universitas Global Nusantara
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="flex flex-col gap-5">
            <SectionLabel>Bergabung Bersama Kami</SectionLabel>
            <div className="w-8 h-[3px] rounded-full" style={{ backgroundColor: "#DABC4E" }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug" style={{ color: "#015023" }}>
              Jadilah Bagian dari Perjalanan Ini
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
              Universitas Global Nusantara membuka pintu selebar-lebarnya untuk calon mahasiswa yang ingin bertumbuh — secara intelektual, spiritual, dan profesional.
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              {ctaFeatures.map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={16} strokeWidth={1.5} className="flex-shrink-0" style={{ color: "#015023" }} />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div
            className="rounded-2xl p-7 sm:p-8 flex flex-col gap-5"
            style={{ backgroundColor: "#F7FAF8", border: "1px solid #E6EEE9" }}
          >
            <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "#DABC4E" }} />
            <p className="text-sm text-gray-500 leading-relaxed">
              Bergabunglah dengan ribuan mahasiswa yang telah memilih UGN sebagai tempat bertumbuh dalam ilmu, iman, dan karakter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/pendaftaran"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:brightness-110"
                style={{ backgroundColor: "#015023", color: "#fff" }}
              >
                Daftar Sekarang <ChevronRight size={16} />
              </Link>
              <Link
                href="/sejarah"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:bg-[#E6EEE9]"
                style={{ border: "1.5px solid #015023", color: "#015023" }}
              >
                Lihat Sejarah <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
