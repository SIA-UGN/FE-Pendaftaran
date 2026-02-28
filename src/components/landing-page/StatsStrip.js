import { Users, BookOpen, Award, Building2 } from "lucide-react";

const stats = [
  { icon: Users,    value: "12.000+", label: "Mahasiswa Aktif" },
  { icon: BookOpen, value: "24",      label: "Program Studi" },
  { icon: Building2,value: "6",       label: "Fakultas" },
  { icon: Award,    value: "Terakreditasi", label: "BAN-PT" },
];

export default function StatsStrip() {
  return (
    <div
      className="w-full py-5 sm:py-6"
      style={{ backgroundColor: '#015023', fontFamily: 'Urbanist, system-ui, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4"
            >
              {/* Divider line except first on each row */}
              <div className="flex items-center gap-3 sm:gap-4 w-full">
                {i > 0 && (
                  <div className="hidden lg:block w-px h-10 flex-shrink-0" style={{ backgroundColor: 'rgba(218,188,78,0.25)' }} />
                )}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(218,188,78,0.15)' }}
                >
                  <Icon size={20} style={{ color: '#DABC4E' }} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold leading-tight" style={{ color: '#DABC4E' }}>
                    {value}
                  </p>
                  <p className="text-xs sm:text-sm text-white/65 leading-tight">
                    {label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
