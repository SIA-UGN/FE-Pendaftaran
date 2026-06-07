"use client";

import { useState, useMemo } from "react";
import ManajerList from "@/components/ManajerList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useApplicantStatistics, useApplicants } from "@/hooks/useAdmin";
import { Users, UserCheck, Clock, UserX, GraduationCap, SearchIcon, Plus, RefreshCw, Download } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreVertical } from "lucide-react";

const statusColors = {
  approved: { bg: "bg-green-100", text: "text-green-700", label: "Disetujui" },
  submitted: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Menunggu" },
  rejected: { bg: "bg-red-100", text: "text-red-700", label: "Ditolak" },
  reviewed: { bg: "bg-blue-100", text: "text-blue-700", label: "Direview" },
  draft: { bg: "bg-gray-100", text: "text-gray-600", label: "Draft" },
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("pendaftar");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrorMsg,
  } = useApplicantStatistics({ per_page: 100 });

  const {
    data: applicantsData,
    isLoading: applicantsLoading,
    refetch,
  } = useApplicants({ per_page: 100 });

  const isLoading = statsLoading || applicantsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-white rounded-2xl" />)}
        </div>
        <div className="h-96 bg-white rounded-2xl" />
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 text-center">
          Error: {statsErrorMsg?.response?.data?.message || statsErrorMsg?.message}
        </div>
      </div>
    );
  }

  const responseData = statsData?.data?.data || {};
  const Approved = responseData?.by_status?.approved || 0;
  const Pending = (responseData?.by_status?.submitted || 0) + (responseData?.by_status?.reviewed || 0);
  const Rejected = responseData?.by_status?.rejected || 0;
  const Lulus = responseData?.by_graduation_status?.["Sudah Lulus"] || 0;
  const TidakLulus = responseData?.by_graduation_status?.["Belum Lulus"] || 0;
  const totalApplicants = Approved + Pending + Rejected;

  const applicantsList = applicantsData?.data?.data || [];
  const mappedApplicants = (Array.isArray(applicantsList) ? applicantsList : []).map((app) => ({
    id_profile: app.id_profile,
    registration_number: app.registration_number,
    name: app.full_name,
    email: app.email,
    phone: app.phone_number,
    program: app.program_name,
    status: app.registration_status,
    graduation_status: app.graduation_status,
    date: app.created_at,
  }));

  const filteredApplicants = mappedApplicants.filter((a) => {
    const matchSearch = !search || a.name?.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase()) || a.registration_number?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredApplicants.length / pageSize);
  const paginatedApplicants = filteredApplicants.slice((page - 1) * pageSize, page * pageSize);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  const handleExportCSV = () => {
    const headers = ["No Registrasi", "Nama", "Email", "Program Studi", "Status", "Tanggal"];
    const rows = filteredApplicants.map((a) => [a.registration_number || "-", a.name || "-", a.email || "-", a.program || "-", a.status || "-", formatDate(a.date)]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data_pendaftar.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    { label: "Total Pendaftar", value: totalApplicants, icon: Users, color: "#015023" },
    { label: "Disetujui", value: Approved, icon: UserCheck, color: "#22c55e" },
    { label: "Menunggu", value: Pending, icon: Clock, color: "#d97706" },
    { label: "Ditolak", value: Rejected, icon: UserX, color: "#dc2626" },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        <button
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === "pendaftar" ? "text-[#015023]" : "text-gray-400 hover:text-gray-600"}`}
          onClick={() => setActiveTab("pendaftar")}
        >
          Data Pendaftar
          {activeTab === "pendaftar" && <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#015023' }} />}
        </button>
        <button
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === "manajer" ? "text-[#015023]" : "text-gray-400 hover:text-gray-600"}`}
          onClick={() => setActiveTab("manajer")}
        >
          Data Manajer
          {activeTab === "manajer" && <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#015023' }} />}
        </button>
      </div>

      {/* Pendaftar Tab */}
      {activeTab === "pendaftar" && (
        <>
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
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: card.color }}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* Graduation Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md" style={{ borderColor: '#E6EEE9' }}>
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Lulus</p>
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: '#22c55e12' }}>
                  <GraduationCap size={18} style={{ color: '#22c55e' }} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#22c55e' }}>{Lulus}</p>
              <p className="text-xs text-gray-400 mt-1">Sudah dinyatakan lulus</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md" style={{ borderColor: '#E6EEE9' }}>
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Belum Lulus</p>
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: '#dc262612' }}>
                  <GraduationCap size={18} style={{ color: '#dc2626' }} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#dc2626' }}>{TidakLulus}</p>
              <p className="text-xs text-gray-400 mt-1">Belum dinyatakan lulus</p>
            </div>
          </div>

          {/* Data Table Card */}
          <div className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: '#E6EEE9' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#015023' }}>Daftar Pendaftar</h2>
                <p className="text-xs text-gray-400">Kelola data pendaftar universitas</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2 text-sm" onClick={() => refetch()}>
                  <RefreshCw size={14} /> Refresh
                </Button>
                <Button size="sm" className="flex items-center gap-2 text-sm text-white" style={{ backgroundColor: '#015023' }} onClick={handleExportCSV}>
                  <Download size={14} /> Export CSV
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <div className="flex-1 min-w-0 border border-gray-200 rounded-lg">
                <InputGroup className="w-full">
                  <InputGroupAddon><SearchIcon className="text-gray-400 w-4 h-4" /></InputGroupAddon>
                  <InputGroupInput placeholder="Cari nama, email, atau no. registrasi..." className="text-sm" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
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
                    <DropdownMenuItem key={opt.value} onClick={() => { setStatusFilter(opt.value); setPage(1); }} className="cursor-pointer text-sm">
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-semibold text-white w-16">ID</TableHead>
                    <TableHead className="text-xs font-semibold text-white">Nama</TableHead>
                    <TableHead className="text-xs font-semibold text-white">Email</TableHead>
                    <TableHead className="text-xs font-semibold text-white">Program Studi</TableHead>
                    <TableHead className="text-xs font-semibold text-white">Tanggal</TableHead>
                    <TableHead className="text-xs font-semibold text-white">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-white w-12">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedApplicants.length > 0 ? (
                    paginatedApplicants.map((app, i) => {
                      const st = statusColors[app.status] || statusColors.submitted;
                      return (
                        <TableRow key={app.id_profile || i} className="hover:bg-gray-50/50">
                          <TableCell className="text-sm font-medium text-gray-700">{app.registration_number || `-`}</TableCell>
                          <TableCell className="text-sm text-gray-700">{app.name || "-"}</TableCell>
                          <TableCell className="text-sm text-gray-500">{app.email || "-"}</TableCell>
                          <TableCell className="text-sm text-gray-500">{app.program || "-"}</TableCell>
                          <TableCell className="text-sm text-gray-500">{formatDate(app.date)}</TableCell>
                          <TableCell>
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${st.bg} ${st.text}`}>{st.label}</span>
                          </TableCell>
                          <TableCell>
                            <Link href={`/dashboard/profile?id=${app.id_profile}`}>
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
                        {search || statusFilter !== "all" ? "Tidak ada hasil ditemukan" : "Tidak ada data pendaftar"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 text-sm">
                <p className="text-gray-500">
                  Menampilkan {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filteredApplicants.length)} dari {filteredApplicants.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
                  <span className="text-gray-600 font-medium px-2">{page} / {totalPages}</span>
                  <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Manajer Tab */}
      {activeTab === "manajer" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#015023' }}>Data Manajer</h2>
              <p className="text-xs text-gray-400">Kelola data manajer universitas</p>
            </div>
            <Link href="/dashboard/manajer/tambah">
              <Button size="sm" className="flex items-center gap-2 text-sm text-white" style={{ backgroundColor: '#015023' }}>
                <Plus size={14} /> Tambah Manajer
              </Button>
            </Link>
          </div>
          <div className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: '#E6EEE9' }}>
            <ManajerList />
          </div>
        </div>
      )}
    </div>
  );
}
