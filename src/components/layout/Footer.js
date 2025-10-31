import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Music4 as Tiktok,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-12 bg-[var(--green)] text-[var(--cream)] border-t border-t-[var(--border)] flex flex-col items-center relative overflow-hidden">
      <Image
        className="absolute -bottom-48 -right-0 opacity-20 select-none pointer-events-none"
        src="/logo.svg"
        width={600}
        height={550}
        alt="logo"
      />

      <div className="flex flex-col items-center text-center gap-8 z-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-2xl font-bold">
          <Image src="/logo.svg" width={90} height={90} alt="logo" />
          <p className="max-w-[300px] sm:max-w-none text-2xl sm:text-xl leading-tight font-bold">
            UNIVERSITAS GLOBAL NUSANTARA
          </p>
        </div>

        <ul className="flex gap-6">
          <li>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-[var(--yellow)] transition-colors"
            >
              <Facebook size={26} />
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-[var(--yellow)] transition-colors"
            >
              <Instagram size={26} />
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-[var(--yellow)] transition-colors"
            >
              <Youtube size={26} />
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-label="X (Twitter)"
              className="hover:text-[var(--yellow)] transition-colors"
            >
              <Twitter size={26} />
            </a>
          </li>
        </ul>

        <div className="flex flex-col gap-3 text-[var(--light-cream)] text-sm sm:text-base items-center max-w-lg leading-relaxed">
          <div className="text-center">
            Jl. Cendekia Utama No. 123, Surakarta, Jawa Tengah, Indonesia 57126
          </div>
          <div className="flex flex-col md:flex-row gap-2 sm:gap-6 text-center">
            <p>Telp: (0271) 555-0123</p>
            <p>Email: info@ugn.ac.id</p>
          </div>
        </div>

        <div className="text-xs sm:text-sm mt-4 opacity-70">
          © {new Date().getFullYear()} Universitas Global Nusantara. All rights reserved.
        </div>
      </div>
    </footer>
  );
}