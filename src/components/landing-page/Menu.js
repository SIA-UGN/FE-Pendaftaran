import { GraduationCap, School, NotepadText } from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    href: "/sejarah",
    icon: GraduationCap,
    title: "Profil",
    desc: "Temukan informasi lengkap mengenai sejarah, visi dan misi, serta nilai-nilai yang menjadi dasar kampus kami.",
  },
  {
    href: "/fakultas",
    icon: School,
    title: "Fakultas",
    desc: "Jelajahi berbagai fakultas dan program studi yang tersedia.",
  },
  {
    href: "/pendaftaran",
    icon: NotepadText,
    title: "Pendaftaran",
    desc: "Dapatkan informasi seputar persyaratan, alur pendaftaran, serta jadwal penting penerimaan mahasiswa baru.",
    colSpan: true,
  },
];

export default function Menu() {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto py-10 sm:py-14"
      style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
    >
      {menuItems.map(({ href, icon: Icon, title, desc, colSpan }) => (
        <Link
          key={href}
          href={href}
          className={`group focus:outline-none ${colSpan ? 'sm:col-span-2 lg:col-span-1' : ''}`}
        >
          <div
            className="flex flex-col items-center justify-center p-7 sm:p-8 w-full h-full gap-3 rounded-2xl border bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 border-[#E6EEE9] hover:border-[#DABC4E] hover:bg-[#E6EEE9]"
          >
            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: '#E6EEE9' }}
            >
              <Icon size={44} className="stroke-1" style={{ color: '#015023' }} />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-center" style={{ color: '#015023' }}>
              {title}
            </span>
            <p className="text-gray-500 text-center text-sm leading-relaxed">
              {desc}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
