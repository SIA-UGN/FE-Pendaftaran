"use client";

import { useApplicantStatistics } from "@/hooks/useAdmin";
import { UserCheck, UserX, Clock, GraduationCap, PieChart as PieChartIcon } from "lucide-react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
} from "recharts";

export default function Page() {
  const { data, isLoading, isError, error } = useApplicantStatistics();

  if (isLoading)
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-white rounded-2xl" />)}
        </div>
        <div className="h-64 bg-white rounded-2xl" />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 text-center">
          Error: {error?.response?.data?.message || error?.message}
        </div>
      </div>
    );

  const responseData = data?.data?.data || {};
  const byStatus = responseData?.by_status || {};
  const byGraduation = responseData?.by_graduation_status || {};

  const approved = byStatus?.approved || 0;
  const rejected = byStatus?.rejected || 0;
  const pending = (byStatus?.submitted || 0) + (byStatus?.reviewed || 0) + (byStatus?.draft || 0);
  const lulus = byGraduation?.["Sudah Lulus"] || 0;
  const tidakLulus = byGraduation?.["Belum Lulus"] || 0;

  const pieData = [
    { name: "Disetujui", value: approved, color: "#22c55e" },
    { name: "Menunggu", value: pending, color: "#facc15" },
    { name: "Ditolak", value: rejected, color: "#ef4444" },
  ];

  const verificationCards = [
    { label: "Disetujui", value: approved, icon: UserCheck, color: "#22c55e" },
    { label: "Menunggu", value: pending, icon: Clock, color: "#d97706" },
    { label: "Ditolak", value: rejected, icon: UserX, color: "#dc2626" },
  ];

  const graduationCards = [
    { label: "Lulus", value: lulus, icon: GraduationCap, color: "#22c55e" },
    { label: "Belum Lulus", value: tidakLulus, icon: GraduationCap, color: "#dc2626" },
  ];

  return (
    <div className="space-y-6">
      {/* Verifikasi Status */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-1" style={{ color: '#015023' }}>Rincian Verifikasi</h2>
        <p className="text-xs text-gray-400 mb-4">Status verifikasi pendaftar</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {verificationCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md" style={{ borderColor: '#E6EEE9' }}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">{card.label}</p>
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${card.color}12` }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart + Kelulusan Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Status Pie */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Status Pendaftar</h3>
              <p className="text-xs text-gray-400">Visualisasi proporsi</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#01502312' }}>
              <PieChartIcon size={20} style={{ color: '#015023' }} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius="55%" outerRadius="85%" animationDuration={800}>
                    {pieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} orang`, n]} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-800 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kelulusan */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Rincian Kelulusan</h3>
            <p className="text-xs text-gray-400">Data kelulusan pendaftar</p>
          </div>
          <div className="space-y-4">
            {graduationCards.map((card, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${card.color}12` }}>
                    <card.icon size={20} style={{ color: card.color }} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{card.label}</span>
                </div>
                <span className="text-xl font-bold" style={{ color: card.color }}>{card.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
      </div>
    </div>
  );
}
