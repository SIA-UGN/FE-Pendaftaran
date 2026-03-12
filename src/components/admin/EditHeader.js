"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Form Data Diri", href: "/dashboard/edit/pendaftaran/data-diri" },
  { label: "Form Data Alamat", href: "/dashboard/edit/pendaftaran/data-alamat" },
  { label: "Form Data Orang Tua/Wali", href: "/dashboard/edit/pendaftaran/data-orangtua" },
  { label: "Form Data Akademik", href: "/dashboard/edit/pendaftaran/data-akademik" },
];

export default function EditHeader() {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-2xl border p-4 sm:p-6 mb-6" style={{ borderColor: '#E6EEE9' }}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href}>
              <div
                className="flex text-center justify-center p-3 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                style={{
                  backgroundColor: isActive ? '#015023' : '#f0f4f1',
                  color: isActive ? '#ffffff' : '#015023',
                }}
              >
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
