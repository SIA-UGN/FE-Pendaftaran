"use client";

import { useProgramStatistics } from "@/hooks/useAdmin";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const COLORS = ["#015023", "#DABC4E", "#22c55e", "#3b82f6", "#ef4444", "#8b5cf6", "#f97316"];

export default function Page() {
  const { data, isLoading, isError, error } = useProgramStatistics();

  if (isLoading)
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-72 bg-white rounded-2xl" />
          <div className="h-72 bg-white rounded-2xl" />
        </div>
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

  const responseData = data?.data?.data || [];
  const programs = Array.isArray(responseData) ? responseData : [];

  const pieData = programs.map((p, i) => ({
    name: p.program_name,
    value: p.total_applicants,
    color: COLORS[i % COLORS.length],
  }));

  const barData = programs.map((p) => ({
    name: p.program_name,
    count: p.total_applicants,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#015023' }}>Program Studi</h2>
        <p className="text-xs text-gray-400">Distribusi pendaftar per program studi</p>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Distribusi Pendaftar</h3>
              <p className="text-xs text-gray-400">Berdasarkan jumlah</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#01502312' }}>
              <BarChart3 size={20} style={{ color: '#015023' }} />
            </div>
          </div>
          <div className="h-[240px]">
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={55} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [`${v} pendaftar`]} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                  <Bar dataKey="count" fill="#015023" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">Belum ada data</div>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Proporsi Program</h3>
              <p className="text-xs text-gray-400">Visualisasi donut chart</p>
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
                  <Tooltip formatter={(v, n) => [`${v} pendaftar`, n]} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px]">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs sm:text-sm text-gray-600 truncate">{item.name}</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Cards */}
      <div className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: '#E6EEE9' }}>
        <h3 className="text-base sm:text-lg font-semibold mb-4" style={{ color: '#015023' }}>Rincian per Program</h3>
        <div className="space-y-3">
          {programs.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{p.program_name}</h4>
                  <p className="text-xs text-gray-400">
                    Approved: {p.approved || 0} · Pending: {p.pending || 0} · Rejected: {p.rejected || 0}
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold" style={{ color: '#015023' }}>{p.total_applicants}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
