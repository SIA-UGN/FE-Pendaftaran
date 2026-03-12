"use client";

import { useManagerDashboard, useManagerApplicants } from "@/hooks/useManager";
import { useApplicantStatistics, useProgramStatistics } from "@/hooks/useAdmin";
import { Users, UserCheck, Clock, UserX, DollarSign, CalendarDays, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line,
} from "recharts";
import { useState, useMemo } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon, ChevronDown, MoreVertical } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors = {
  approved: { bg: "bg-green-100", text: "text-green-700", label: "Disetujui" },
  submitted: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Menunggu" },
  rejected: { bg: "bg-red-100", text: "text-red-700", label: "Ditolak" },
  reviewed: { bg: "bg-blue-100", text: "text-blue-700", label: "Direview" },
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
        <div className="h-40 bg-white rounded-2xl" />
        <div className="h-40 bg-white rounded-2xl" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data, isLoading, isError, error } = useManagerDashboard();
  const { data: statsData, isLoading: statsLoading } = useApplicantStatistics({ per_page: 100 });
  const { data: programData } = useProgramStatistics();
  const { data: applicantsData, isLoading: applicantsLoading } = useManagerApplicants({ per_page: 5 });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  if (isLoading || statsLoading) return <DashboardSkeleton />;

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <div className="text-red-500 text-center">
          Error: {error.response?.data?.message || error.message}
        </div>
      </div>
    );

  const dashboardData = data?.data?.data || {};
  const total = dashboardData.total_applicants || 0;
  const approved = dashboardData.approved_applicants || 0;
  const pending = dashboardData.pending_applicants || 0;
  const rejected = dashboardData.rejected_applicants || 0;
  const revenue = dashboardData.total_revenue || 0;
  const growthPercentage = dashboardData.growth_percentage || 0;

  const statsResponse = statsData?.data?.data || {};
  const programs = programData?.data?.data || [];

  // Build program bar chart data
  const programChartData = programs.slice(0, 5).map((p) => ({
    name: p.name || p.program,
    count: p.count || p.value || 0,
  }));

  // Pie chart data for status
  const pieData = [
    { name: "Disetujui", value: approved, color: "#22c55e" },
    { name: "Menunggu", value: pending, color: "#facc15" },
    { name: "Ditolak", value: rejected, color: "#ef4444" },
  ];

  // Trend data (mock months based on growth)
  const trendData = [
    { name: "Jan", value: Math.round(total * 0.3) },
    { name: "Feb", value: Math.round(total * 0.6) },
    { name: "Mar", value: total },
  ];

  // Recent applicants
  const applicantsList = applicantsData?.data?.data || [];
  const recentApplicants = applicantsList.slice(0, 5).map((app) => ({
    id_profile: app.id_profile,
    registration_number: app.registration_number,
    name: app.full_name,
    email: app.email,
    program: app.program_name,
    date: app.created_at,
    status: app.registration_status,
    phone: app.phone_number,
  }));

  const filteredApplicants = recentApplicants.filter((a) => {
    const matchSearch =
      !search ||
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.registration_number?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatCurrency = (num) =>
    `Rp ${Number(num).toLocaleString("id-ID")}`;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const statCards = [
    { label: "Total Pendaftar", value: total, sub: `Periode Maret 2026`, icon: Users, color: "#015023", borderColor: "#015023" },
    { label: "Disetujui", value: approved, sub: `${total ? Math.round((approved / total) * 100) : 0}% dari total`, icon: UserCheck, color: "#015023", borderColor: "#015023" },
    { label: "Menunggu", value: pending, sub: "Perlu ditindaklanjuti", icon: Clock, color: "#d97706", borderColor: "#d97706" },
    { label: "Ditolak", value: rejected, sub: `${total ? Math.round((rejected / total) * 100) : 0}% dari total`, icon: UserX, color: "#dc2626", borderColor: "#dc2626" },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards Row */}
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

      {/* Revenue + Trend Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Total Pendapatan */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Total Pendapatan</h3>
              <p className="text-xs text-gray-400">Dari biaya pendaftaran yang disetujui</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#DABC4E20' }}>
              <DollarSign size={20} style={{ color: '#DABC4E' }} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#015023' }}>
            {formatCurrency(revenue)}
          </p>
          <p className="text-xs text-gray-400">
            {approved} pendaftar × Rp {total > 0 ? Number(Math.round(revenue / (approved || 1))).toLocaleString("id-ID") : 0} (biaya registrasi)
          </p>
        </div>

        {/* Tren Pendaftaran */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: '#E6EEE9' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-semibold" style={{ color: '#015023' }}>Tren Pendaftaran</h3>
              <p className="text-xs text-gray-400">3 bulan terakhir</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#01502312' }}>
              <CalendarDays size={20} style={{ color: '#015023' }} />
            </div>
          </div>
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={(v) => [`${v} pendaftar`]} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                <Line type="monotone" dataKey="value" stroke="#015023" strokeWidth={2.5} dot={{ fill: '#015023', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
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

        {/* Status Pendaftar Pie Chart */}
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
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="85%"
                    animationDuration={800}
                  >
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

      {/* Pendaftar Terbaru */}
      <div className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold" style={{ color: '#015023' }}>Pendaftar Terbaru</h3>
            <p className="text-xs text-gray-400">Daftar pendaftar yang baru masuk</p>
          </div>
          <Link href="/manager/pendaftar">
            <Button variant="ghost" size="sm" className="text-sm font-medium" style={{ color: '#015023' }}>
              Lihat Semua →
            </Button>
          </Link>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <div className="flex-1 min-w-0 border border-gray-200 rounded-lg">
            <InputGroup className="w-full">
              <InputGroupAddon><SearchIcon className="text-gray-400 w-4 h-4" /></InputGroupAddon>
              <InputGroupInput
                placeholder="Cari nama, email, atau program studi..."
                className="text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 text-sm whitespace-nowrap">
                {statusFilter === "all" ? "Semua Status" : statusColors[statusFilter]?.label || statusFilter}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[{ value: "all", label: "Semua Status" }, ...Object.entries(statusColors).map(([k, v]) => ({ value: k, label: v.label }))].map((opt) => (
                <DropdownMenuItem key={opt.value} onClick={() => setStatusFilter(opt.value)} className="cursor-pointer text-sm">
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 w-16">ID</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Nama</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Email</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Program Studi</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Tanggal</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500">Status</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 w-12">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((app, i) => {
                  const st = statusColors[app.status] || statusColors.submitted;
                  return (
                    <TableRow key={app.id_profile || i} className="hover:bg-gray-50/50">
                      <TableCell className="text-sm font-medium text-gray-700">{app.registration_number || `00${i + 1}`}</TableCell>
                      <TableCell className="text-sm text-gray-700">{app.name || "-"}</TableCell>
                      <TableCell className="text-sm text-gray-500">{app.email || "-"}</TableCell>
                      <TableCell className="text-sm text-gray-500">{app.program || "-"}</TableCell>
                      <TableCell className="text-sm text-gray-500">{formatDate(app.date)}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${st.bg} ${st.text}`}>
                          {st.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link href={`/manager/verification?id=${app.id_profile}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" style={{ backgroundColor: '#015023' }}>
                            <MoreVertical size={14} className="text-white" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400 py-8">
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
