import Image from "next/image";
import Link from "next/link";
import { CircleCheck, ChevronRight, Users, BookOpen, Building2, Award } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { icon: Building2, value: "1950-an", label: "Tahun Berdiri" },
  { icon: BookOpen,  value: "5+",      label: "Program S1" },
  { icon: Award,     value: "1",       label: "Kampus BAN-PT" },
  { icon: Users,     value: "100%",    label: "Akreditasi Lulus" },
];

const timeline = [
  {
    era: "Era Awal",
    year: "Abad 19",
    title: "Kiai Abdussalam — Pendiri Pesantren",
    body: "Kiai Abdussalam mendirikan pesantren yang kemudian dikenal dengan nama Matholi'ul Huda, yang bermakna sumber petunjuk. Pesantren ini menjadi cikal bakal lembaga pendidikan yang berkembang kemudian.",
    points: ["Tradisi Pesantren Berbasis Agama", "Pembelajaran Kitab Kuning", "Kaderisasi Ulama Lokal"],
    image: "/auth.png",
  },
  {
    era: "1910-an",
    year: "Awal 1900",
    title: "Kiai Mahfudh — Melanjutkan Estafet",
    body: "Putra Kiai Abdussalam melanjutkan perjuangan dengan merintis pesantren. Beliau adalah ulama yang pernah menimba ilmu di Makkah serta berguru kepada Kiai Hasyim Asy'ari di Tebuireng.",
    points: ["Belajar di Makkah & Tebuireng", "Perluas jaringan ulama nusantara", "Perkuat kurikulum pesantren"],
    image: "/auth.png",
  },
  {
    era: "1963",
    year: "Era Modern",
    title: "Kiai Sahal Mahfudh — Era Transformasi",
    body: "Tahun 1963 Kepemimpinan pesantren dilanjutkan oleh Kiai Sahal Mahfudh, mengganti nama menjadi Pesantren Maslakul Huda (PMH), bermakna jalannya petunjuk.",
    points: ["Transformasi menjadi PMH", "Kolaborasi Nasional & Internasional", "Fondasi Universitas Formal"],
    image: "/auth.png",
  },
  {
    era: "Modern",
    year: "2000-an",
    title: "Universitas Global Nusantara Resmi Berdiri",
    body: "Seiring kebutuhan masyarakat akan pendidikan tinggi formal, lahirlah Universitas Global Nusantara di bawah naungan Yayasan Matholi'ul Huda, melanjutkan cita-cita para pendirinya.",
    points: ["Perguruan Tinggi Resmi Terdaftar", "Fakultas Multidisiplin Ilmu", "Beasiswa & Program Unggulan"],
    image: "/auth.png",
  },
];

const figures = [
  {
    badge: "Pendiri",
    name: "Kiai Abdussalam",
    role: "Pendiri Pesantren",
    desc: "Tokoh ulama yang meletakkan fondasi pesantren dan tradisi keilmuan di lingkungan Kajen, Pati.",
    image: "/auth.png",
  },
  {
    badge: "Penerus",
    name: "Kiai Mahfudh",
    role: "Generasi Kedua",
    desc: "Melanjutkan perjuangan ayahanda dan memperluas jaringan pendidikan pesantren ke tingkat nasional.",
    image: "/auth.png",
  },
  {
    badge: "Transformator",
    name: "Kiai Sahal Mahfudh",
    role: "Tokoh Reformasi",
    desc: "Pemimpin visioner yang membawa pesantren ke era modern dan menjadi pondasi berdirinya UGN.",
    image: "/auth.png",
  },
];

const roles = [
  "Pesantren Maslakul Huda berkembang menjadi salah satu pesantren terbesar dan tertua di Kajen, serta berperan penting dalam perjuangan kemerdekaan Indonesia.",
  "Di bawah kepemimpinan Kiai Sahal Mahfudh, pesantren menjalin komunikasi luas dan memperluas kiprahnya melalui berbagai lembaga pendidikan formal maupun non-formal.",
  "Lembaga pendidikan yang lahir dari rahim pesantren ini antara lain SMK Cordova serta penerapan sistem Pendidikan Diniyah Formal (PDF).",
  "Peranannya tidak hanya dalam pendidikan, tetapi juga sosial, budaya, dan pengembangan intelektual santri.",
  "Lahirnya UGN menjadi bukti nyata bahwa pesantren mampu bertransformasi menghadirkan pendidikan tinggi berkualitas.",
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <div className="flex flex-col items-center gap-2 mb-2">
    <span
      className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
      style={{ backgroundColor: '#E6EEE9', color: '#015023' }}
    >
      {children}
    </span>
  </div>
);

const SectionHeading = ({ label, title, subtitle, center = true }) => (
  <div className={`flex flex-col gap-3 ${center ? 'items-center text-center' : 'items-start'}`}>
    {label && <SectionLabel>{label}</SectionLabel>}
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
      <span className="w-8 h-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: '#DABC4E' }} />
    </div>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: '#015023' }}>
      {title}
    </h2>
    {subtitle && <p className="text-gray-500 text-sm sm:text-base max-w-xl">{subtitle}</p>}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function History() {
  return (
    <div style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
        <Image src="/auth.png" alt="hero" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20">
          {/* Headline */}
          <div className="flex flex-col gap-5 max-w-2xl">
            <span
              className="self-start text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(218,188,78,0.2)', color: '#DABC4E', border: '1px solid rgba(218,188,78,0.4)' }}
            >
              Kampus Bersejarah
            </span>
            <div className="w-10 h-[3px] rounded-full" style={{ backgroundColor: '#DABC4E' }} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Sejarah Panjang{" "}
              <span style={{ color: '#DABC4E' }}>&amp; Penuh</span>
              <br />Dedikasi
            </h1>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-md">
              Dari pesantren yang berakar dalam tradisi, lahirlah universitas yang menatap masa depan dengan ilmu, akhlak, dan pengabdian.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="#timeline"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110"
                style={{ backgroundColor: '#DABC4E', color: '#015023' }}
              >
                Telusuri Sejarah <ChevronRight size={16} />
              </Link>
              <Link
                href="/pendaftaran"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/30 text-white transition-all hover:bg-white/10"
              >
                Kenalan ke Sejarah
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS STRIP ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#015023' }} className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <div className="hidden lg:block w-px h-10 flex-shrink-0" style={{ backgroundColor: 'rgba(218,188,78,0.2)' }} />}
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(218,188,78,0.15)' }}>
                  <Icon size={20} style={{ color: '#DABC4E' }} />
                </div>
                <div>
                  <p className="text-lg font-bold leading-tight" style={{ color: '#DABC4E' }}>{value}</p>
                  <p className="text-xs text-white/60">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TIMELINE ────────────────────────────────────────────────────── */}
      <section id="timeline" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <SectionHeading
              label="Latar Belakang Sejarah"
              title="Perjalanan Waktu"
              subtitle="Simak bagaimana jejak panjang yang membentuk identitas Universitas."
            />
          </div>

          {/* Timeline wrapper */}
          <div className="relative">
            {/* Center vertical line */}
            <div
              className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: '#D9E5DE' }}
            />

            <div className="flex flex-col gap-0">
              {timeline.map((item, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <div key={i} className="relative flex items-start lg:items-center gap-0 mb-12">

                    {/* Dot on the line */}
                    <div
                      className="absolute left-4 lg:left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full border-4 flex-shrink-0"
                      style={{ backgroundColor: '#DABC4E', borderColor: '#015023', top: '24px' }}
                    />

                    {/* Mobile: single column (always right of line) */}
                    <div className="lg:hidden pl-12 w-full">
                      <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span
                          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                          style={{ backgroundColor: '#DABC4E', color: '#015023' }}
                        >
                          {item.era}
                        </span>
                      </div>
                      <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ backgroundColor: '#fff', border: '1px solid #E6EEE9' }}>
                        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#DABC4E' }}>{item.year}</span>
                        <h3 className="text-lg font-bold leading-snug" style={{ color: '#015023' }}>{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                        <ul className="flex flex-col gap-1.5 mt-1">
                          {item.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2 text-sm text-gray-700">
                              <CircleCheck size={15} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" style={{ color: '#015023' }} />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Desktop: alternating left / right */}
                    <div className="hidden lg:grid w-full" style={{ gridTemplateColumns: '1fr 48px 1fr' }}>
                      {/* Left slot */}
                      <div className={`pr-6 ${isRight ? 'flex flex-col gap-4' : 'flex items-center justify-end'}`}>
                        {isRight ? (
                          /* image on the left for odd */
                          <div className="relative w-full h-52 rounded-2xl overflow-hidden">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <span
                              className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                              style={{ backgroundColor: '#DABC4E', color: '#015023' }}
                            >
                              {item.era}
                            </span>
                          </div>
                        ) : (
                          /* card on the left for even */
                          <div className="rounded-2xl p-6 flex flex-col gap-3 w-full" style={{ backgroundColor: '#fff', border: '1px solid #E6EEE9' }}>
                            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#DABC4E' }}>{item.year}</span>
                            <h3 className="text-xl font-bold leading-snug" style={{ color: '#015023' }}>{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                            <ul className="flex flex-col gap-2 mt-1">
                              {item.points.map((pt) => (
                                <li key={pt} className="flex items-start gap-2 text-sm text-gray-700">
                                  <CircleCheck size={15} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" style={{ color: '#015023' }} />
                                  {pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Center dot spacer */}
                      <div />

                      {/* Right slot */}
                      <div className={`pl-6 ${isRight ? 'flex items-center' : 'flex flex-col gap-4'}`}>
                        {isRight ? (
                          /* card on the right for odd */
                          <div className="rounded-2xl p-6 flex flex-col gap-3 w-full" style={{ backgroundColor: '#fff', border: '1px solid #E6EEE9' }}>
                            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#DABC4E' }}>{item.year}</span>
                            <h3 className="text-xl font-bold leading-snug" style={{ color: '#015023' }}>{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                            <ul className="flex flex-col gap-2 mt-1">
                              {item.points.map((pt) => (
                                <li key={pt} className="flex items-start gap-2 text-sm text-gray-700">
                                  <CircleCheck size={15} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" style={{ color: '#015023' }} />
                                  {pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          /* image on the right for even */
                          <div className="relative w-full h-52 rounded-2xl overflow-hidden">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <span
                              className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                              style={{ backgroundColor: '#DABC4E', color: '#015023' }}
                            >
                              {item.era}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FIGURES ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12" style={{ backgroundColor: '#F7FAF8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionHeading
              label="Para Tokoh"
              title="Tokoh-Tokoh Bersejarah"
              subtitle="Mereka yang mendedikasikan hidup untuk ilmu dan pendidikan demi anak cucu."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {figures.map((fig, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#fff', border: '1px solid #E6EEE9' }}
              >
                <div className="relative h-48 w-full">
                  <Image src={fig.image} alt={fig.name} fill className="object-cover" />
                  <span
                    className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#DABC4E', color: '#015023' }}
                  >
                    {fig.badge}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="font-bold text-lg" style={{ color: '#015023' }}>{fig.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#DABC4E' }}>{fig.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{fig.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ROLES ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12" style={{ backgroundColor: '#F7FAF8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionHeading
              label="Kiprah Kampus"
              title="Peran dan Perkembangan"
              subtitle="Kontribusi nyata pesantren dan universitas dalam membangun peradaban dan generasi penerus bangsa."
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden">
            <Image src="/auth.png" alt="peran" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          {/* Content */}
          <div className="flex flex-col gap-6">
            <ul className="flex flex-col gap-3">
              {roles.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CircleCheck size={20} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" style={{ color: '#015023' }} />
                  <span className="text-sm sm:text-base text-gray-600 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING CTA ─────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 overflow-hidden" style={{ backgroundColor: '#015023' }}>
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #DABC4E 1px, transparent 1px), radial-gradient(circle at 80% 50%, #DABC4E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(218,188,78,0.15)' }}>
            <BookOpen size={28} style={{ color: '#DABC4E' }} />
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed">
            "Pendidikan adalah warisan terbaik yang bisa diberikan kepada generasi penerus bangsa. Bukan harta, bukan tahta — melainkan ilmu yang bermanfaat dan akhlak yang mulia."
          </p>
          <p className="text-sm font-semibold" style={{ color: '#DABC4E' }}>— Kiai Sahal Mahfudh, Tokoh Pendiri UGN</p>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link
              href="/pendaftaran"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110"
              style={{ backgroundColor: '#DABC4E', color: '#015023' }}
            >
              Daftar Sekarang <ChevronRight size={16} />
            </Link>
            <Link
              href="/visi-misi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/30 text-white transition-all hover:bg-white/10"
            >
              Kenali Visi Misi
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

