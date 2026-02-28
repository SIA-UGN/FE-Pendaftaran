"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    url: "/image1.jpg",
    badge: "Penerimaan Mahasiswa Baru 2026",
    heading: "Universitas\nGlobal Nusantara",
    subheading:
      "Awali langkah besar, saatnya meraih masa depan dengan keyakinan dan kesiapan untuk meraih cita-cita.",
    cta: true,
  },
  {
    url: "/image2.jpg",
    badge: "Kampus Terbaik Jawa Tengah",
    heading: "Raih Impian\nBersama Kami",
    subheading:
      "Program studi berkualitas, tenaga pengajar berpengalaman, dan lingkungan akademik yang mendukung tumbuh kembang mahasiswa.",
    cta: true,
  },
  {
    url: "/image3.jpg",
    badge: "Fasilitas Modern & Lengkap",
    heading: "Wujudkan\nPotensimu",
    subheading:
      "Dengan fasilitas modern dan kurikulum berstandar nasional, kami hadir untuk mendukung perjalanan akademik terbaik Anda.",
    cta: false,
  },
];

export default function HomeCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [plugin.current]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo  = React.useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] w-full h-[88vh] min-h-[520px]">
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.url}
                alt={`Slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Multi-layer gradient: strong on left, subtle on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 max-w-4xl">
                {/* Badge */}
                {slide.badge && (
                  <div className="mb-4 sm:mb-5">
                    <span
                      className="inline-block text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase"
                      style={{ backgroundColor: 'rgba(218,188,78,0.2)', color: '#DABC4E', border: '1px solid rgba(218,188,78,0.4)' }}
                    >
                      {slide.badge}
                    </span>
                  </div>
                )}

                {/* Accent line */}
                <div className="w-12 h-[3px] rounded-full mb-4 sm:mb-5" style={{ backgroundColor: '#DABC4E' }} />

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-4 sm:mb-5 whitespace-pre-line">
                  {slide.heading}
                </h1>

                {/* Subheading */}
                <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-6 sm:mb-8">
                  {slide.subheading}
                </p>

                {/* CTA */}
                {slide.cta && (
                  <div>
                    <Link
                      href="/pendaftaran"
                      className="inline-flex items-center gap-2 font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0"
                      style={{ backgroundColor: '#DABC4E', color: '#015023' }}
                    >
                      Daftar Sekarang
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:bg-white/30 hover:scale-105"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:bg-white/30 hover:scale-105"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: selectedIndex === i ? '28px' : '8px',
              height: '8px',
              backgroundColor: selectedIndex === i ? '#DABC4E' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
