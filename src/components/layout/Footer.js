import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Youtube,   label: "YouTube" },
  { href: "#", icon: Facebook,  label: "Facebook" },
  { href: "#", icon: Twitter,   label: "X (Twitter)" },
];

const tentangLinks = [
  { href: "/sejarah",              label: "Profil Kampus" },
  { href: "/visi-misi",            label: "Visi & Misi" },
  { href: "/pimpinan-universitas", label: "Pimpinan Kampus" },
  { href: "/fakultas",             label: "Fakultas" },
];

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: '#015023', fontFamily: 'Urbanist, system-ui, sans-serif' }}
      className="text-white"
    >
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Col 1 — Brand + contact */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" width={52} height={52} alt="logo UGN" />
              <div>
                <h3 className="font-bold text-base leading-tight">Universitas Global Nusantara</h3>
                <p className="text-white/70 text-xs mt-0.5">Sistem Pendaftaran Mahasiswa Baru</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Mewujudkan pendidikan tinggi yang berkualitas, inovatif, dan berdaya saing global untuk generasi penerus bangsa.
            </p>

            {/* Contact */}
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-white/50" />
                Jl. Cendekia Utama No. 23, Surakarta, Jawa Tengah 57126
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="flex-shrink-0 text-white/50" />
                Telp: (0271) 88-0023
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="flex-shrink-0 text-white/50" />
                <a
                  href="mailto:info@ugn.ac.id"
                  className="transition-opacity duration-200 hover:opacity-80"
                  style={{ color: '#DABC4E' }}
                >
                  info@ugn.ac.id
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 — Tentang links */}
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-base">Tentang</h4>
              <div className="w-10 h-[2px] mt-2 rounded-full" style={{ backgroundColor: '#DABC4E' }} />
            </div>
            <ul className="flex flex-col gap-2">
              {tentangLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/75 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Universitas Global Nusantara. All rights reserved.
          </p>
          <ul className="flex gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="text-white/60 transition-colors duration-200 hover:text-[#DABC4E]"
                >
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
