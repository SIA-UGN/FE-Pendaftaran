"use client";

import { useFinancialStatistics, useYearlyRevenue } from "@/hooks/useAdmin";
import { DollarSign, CheckCircle, Clock, XCircle, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const COLORS_BAR = ['#015023', '#DABC4E'];

export default function Page() {
  const { data, isLoading, isError, error } = useFinancialStatistics();
  const { data: yearlyData } = useYearlyRevenue(5);

  if (isLoading)
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-white rounded-2xl" />)}
        </div>
        <div className="h-72 bg-white rounded-2xl" />
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
  const totalRevenue = responseData?.total_revenue || 0;
  const verifiedPayments = responseData?.verified_payments || 0;
  const pendingPayments = responseData?.pending_payments || 0;
  const rejectedPayments = 0;

  const pieData = [
    { name: "Terverifikasi", value: verifiedPayments, color: "#22c55e" },
    { name: "Menunggu", value: pendingPayments, color: "#facc15" },
    { name: "Ditolak", value: rejectedPayments, color: "#ef4444" },
  ];

  // Yearly bar chart
  const yearlyRevenue = yearlyData?.data?.data?.monthly_revenue || {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = monthNames.map((month, idx) => ({
    month,
    revenue: Number(yearlyRevenue[idx + 1] || 0),
  }));
  const year = yearlyData?.data?.data?.year || new Date().getFullYear();

  const formatCurrency = (num) => `Rp ${Number(num).toLocaleString("id-ID")}`;

  const statCards = [
    { label: "Total Pendapatan", value: formatCurrency(totalRevenue), icon: DollarSign, color: "#015023" },
    { label: "Terverifikasi", value: verifiedPayments, icon: CheckCircle, color: "#22c55e" },
    { label: "Menunggu", value: pendingPayments, icon: Clock, color: "#d97706" },
    { label: "Ditolak", value: rejectedPayments, icon: XCircle, color: "#dc2626" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#015023' }}>Keuangan</h2>
        <p className="text-xs text-gray-400">Ringkasan statistik pembayaran</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md" style={{ borderColor: '#E6EEE9' }}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">{card.label}</p>
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${card.color}12` }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Payment Status Pie */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Status Pembayaran</h3>
              <p className="text-xs text-gray-400">Proporsi verifikasi</p>
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
                  <Tooltip formatter={(v, n) => [`${v} pembayaran`, n]} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
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

        {/* Monthly Revenue Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Pendapatan Bulanan</h3>
              <p className="text-xs text-gray-400">Tahun {year}</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#01502312' }}>
              <BarChart3 size={20} style={{ color: '#015023' }} />
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={55} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`} />
                <Tooltip formatter={(v) => [formatCurrency(v)]} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                  {monthlyData.map((_, idx) => <Cell key={idx} fill={COLORS_BAR[idx % COLORS_BAR.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
