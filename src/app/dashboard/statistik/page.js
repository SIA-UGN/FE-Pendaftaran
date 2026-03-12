"use client";

import Link from "next/link";
import { BarChart3, Users, DollarSign, GraduationCap } from "lucide-react";

const statLinks = [
  { label: "Statistik Pendaftar", desc: "Data verifikasi & kelulusan pendaftar", href: "/dashboard/statistik/pendaftar", icon: Users, color: "#015023" },
  { label: "Statistik Program Studi", desc: "Distribusi pendaftar per program", href: "/dashboard/statistik/program-studi", icon: GraduationCap, color: "#d97706" },
  { label: "Statistik Keuangan", desc: "Pendapatan & pembayaran", href: "/dashboard/statistik/keuangan", icon: DollarSign, color: "#22c55e" },
];

export default function Statistika() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#015023' }}>Statistik</h2>
        <p className="text-xs text-gray-400">Pilih kategori statistik untuk melihat detail</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statLinks.map((item, i) => (
          <Link key={i} href={item.href}>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border transition-all hover:shadow-md cursor-pointer group" style={{ borderColor: '#E6EEE9' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${item.color}12` }}>
                  <item.icon size={24} style={{ color: item.color }} />
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 group-hover:underline" style={{ color: '#015023' }}>{item.label}</h3>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
