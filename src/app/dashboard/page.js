"use client";

import { useAdminDashboard, useApplicantStatistics, useProgramStatistics, useApplicants } from "@/hooks/useAdmin";
import { Users, UserCog, DollarSign, TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const statusColors = {
  approved: { bg: "bg-green-100", text: "text-green-700", label: "Disetujui" },
  submitted: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Menunggu" },
  rejected: { bg: "bg-red-100", text: "text-red-700", label: "Ditolak" },
  reviewed: { bg: "bg-blue-100", text: "text-blue-700", label: "Direview" },
  draft: { bg: "bg-gray-100", text: "text-gray-600", label: "Draft" },
};

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-white rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-64 bg-white rounded-2xl" />
        <div className="h-64 bg-white rounded-2xl" />
      </div>
    </div>
  );
}

export default function Page() {
  const { data, isLoading, isError, error } = useAdminDashboard();
  const { data: statsData } = useApplicantStatistics({ per_page: 100 });
  const { data: programData } = useProgramStatistics();
  const { data: applicantsData, isLoading: applicantsLoading } = useApplicants({ per_page: 100 });

  if (isLoading) return <DashboardSkeleton />;

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <div className="text-red-500 text-center">
          Error: {error.response?.data?.message || error.message}
        </div>
      </div>
    );

  const dashboardData = data?.data?.data || {};
  const totalApplicants = dashboardData.total_applicants || 0;
  const totalManagers = dashboardData.total_managers || 0;
  const revenue = dashboardData.total_revenue || 0;
  const growthPercentage = dashboardData.growth_percentage || 0;
  const top_programs = dashboardData.programs || [];

  const statsResponse = statsData?.data?.data || {};
  const byStatus = statsResponse?.by_status || {};
  const approved = byStatus.approved || 0;
  const pending = (byStatus.submitted || 0) + (byStatus.reviewed || 0);
  const rejected = byStatus.rejected || 0;

  const programs = programData?.data?.data || [];
  const programChartData = (Array.isArray(programs) ? programs : []).slice(0, 5).map((p) => ({
    name: p.program_name || p.name || p.program,
    count: p.total_applicants || p.count || p.value || 0,
  }));

  const pieData = [
    { name: "Disetujui", value: approved, color: "#22c55e" },
    { name: "Menunggu", value: pending, color: "#facc15" },
    { name: "Ditolak", value: rejected, color: "#ef4444" },
  ];

  // Recent applicants
  const applicantsList = applicantsData?.data?.data || [];
  const recentList = (Array.isArray(applicantsList) ? applicantsList : []).slice(0, 5);

  const formatCurrency = (num) => `Rp ${Number(num).toLocaleString("id-ID")}`;
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  const statCards = [
    { label: "Total Pendaftar", value: totalApplicants, sub: "Semua pendaftar terdaftar", icon: Users, color: "#015023", borderColor: "#015023" },
    { label: "Total Manager", value: totalManagers, sub: "Manager aktif", icon: UserCog, color: "#015023", borderColor: "#015023" },
    { label: "Total Pendapatan", value: formatCurrency(revenue), sub: "Dari biaya pendaftaran", icon: DollarSign, color: "#d97706", borderColor: "#d97706" },
    { label: "Pertumbuhan", value: `${growthPercentage}%`, sub: "Kenaikan pendaftar", icon: TrendingUp, color: "#22c55e", borderColor: "#22c55e" },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md"
            style={{ borderColor: '#E6EEE9' }}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">{card.label}</p>
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${card.color}12` }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: card.color }}>{card.value}</p>
            <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Distribusi Program Studi */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Distribusi Program Studi</h3>
              <p className="text-xs text-gray-400">Berdasarkan jumlah pendaftar</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#01502312' }}>
              <BarChart3 size={20} style={{ color: '#015023' }} />
            </div>
          </div>
          <div className="h-[220px]">
            {programChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={programChartData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
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

        {/* Status Pendaftar */}
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
                    {pieData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
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
      </div>

      {/* Top Programs Table */}
      {top_programs && top_programs.length > 0 && (
        <div className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold" style={{ color: '#015023' }}>Top Program Studi</h3>
              <p className="text-xs text-gray-400">Berdasarkan jumlah pendaftar</p>
            </div>
            <Link href="/dashboard/statistik/program-studi">
              <Button variant="ghost" size="sm" className="text-sm font-medium" style={{ color: '#015023' }}>
                Lihat Detail →
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <Table className="min-w-[400px]">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs font-semibold text-white">Program Studi</TableHead>
                  <TableHead className="text-xs font-semibold text-white text-right">Jumlah Pendaftar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top_programs.map((p, i) => (
                  <TableRow key={i} className="hover:bg-gray-50/50">
                    <TableCell className="text-sm font-semibold text-gray-800">{p.program_name || p.name || p.program || "-"}</TableCell>
                    <TableCell className="text-sm font-semibold text-gray-800 text-right">{p.total_applicants || p.count || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Recent Applicants Table */}
      <div className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold" style={{ color: '#015023' }}>Pendaftar Terbaru</h3>
            <p className="text-xs text-gray-400">Daftar pendaftar yang baru masuk</p>
          </div>
          <Link href="/dashboard/data">
            <Button variant="ghost" size="sm" className="text-sm font-medium" style={{ color: '#015023' }}>
              Lihat Semua →
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs font-semibold text-white">Nama</TableHead>
                <TableHead className="text-xs font-semibold text-white">Email</TableHead>
                <TableHead className="text-xs font-semibold text-white">Program Studi</TableHead>
                <TableHead className="text-xs font-semibold text-white">Tanggal</TableHead>
                <TableHead className="text-xs font-semibold text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentList.length > 0 ? (
                recentList.map((app, i) => {
                  const st = statusColors[app.registration_status] || statusColors.submitted;
                  return (
                    <TableRow key={app.id_profile || i} className="hover:bg-gray-50/50">
                      <TableCell className="text-sm text-gray-700">{app.full_name || app.name || "-"}</TableCell>
                      <TableCell className="text-sm text-gray-500">{app.email || "-"}</TableCell>
                      <TableCell className="text-sm text-gray-500">{app.program_name || "-"}</TableCell>
                      <TableCell className="text-sm text-gray-500">{formatDate(app.created_at)}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${st.bg} ${st.text}`}>
                          {st.label}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                    {applicantsLoading ? "Memuat data..." : "Tidak ada data pendaftar"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
