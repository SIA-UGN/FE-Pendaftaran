"use client";

import { useManagerApplicants } from "@/hooks/useManager";
import { useApplicantStatistics } from "@/hooks/useAdmin";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  SearchIcon, ChevronDown, RefreshCw, Download, MoreVertical, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig = {
  approved: { bg: "bg-green-100", text: "text-green-700", label: "Disetujui" },
  submitted: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Menunggu" },
  rejected: { bg: "bg-red-100", text: "text-red-700", label: "Ditolak" },
  reviewed: { bg: "bg-blue-100", text: "text-blue-700", label: "Direview" },
};

export default function Pendaftar() {
  const {
    data: applicantsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useManagerApplicants({ per_page: 100 });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const applicantsList = applicantsData?.data?.data || [];

  const mappedApplicants = useMemo(() =>
    applicantsList.map((app, i) => ({
      id_profile: app.id_profile,
      user_id: app.id_user,
      registration_number: app.registration_number || `00${i + 1}`,
      name: app.full_name,
      email: app.email,
      phone: app.phone_number || "-",
      program: app.program_name || "-",
      date: app.created_at,
      status: app.registration_status,
      documents: app.documents || [],
    })),
    [applicantsList]
  );

  const programs = useMemo(() => {
    const unique = [...new Set(mappedApplicants.map((a) => a.program).filter(Boolean))];
    return unique.sort();
  }, [mappedApplicants]);

  const filtered = useMemo(() => {
    return mappedApplicants.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        a.name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.phone?.toLowerCase().includes(q) ||
        a.program?.toLowerCase().includes(q) ||
        a.registration_number?.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      const matchProgram = programFilter === "all" || a.program === programFilter;
      return matchSearch && matchStatus && matchProgram;
    });
  }, [mappedApplicants, search, statusFilter, programFilter]);

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <div className="text-red-500 text-center">
          Error: {error?.response?.data?.message || error?.message}
        </div>
      </div>
    );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const handleExport = () => {
    const headers = ["ID,Nama,Email,Telepon,Program Studi,Tanggal,Status"];
    const rows = filtered.map((a) =>
      `${a.registration_number},${a.name},${a.email},${a.phone},${a.program},${formatDate(a.date)},${statusConfig[a.status]?.label || a.status}`
    );
    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data-pendaftar.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#015023' }}>
            Data Pendaftar
          </h1>
          <p className="text-sm text-gray-400">
            Kelola dan tinjau semua data pendaftar mahasiswa baru
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-sm"
            onClick={handleExport}
          >
            <Download size={14} />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border p-4 sm:p-5" style={{ borderColor: '#E6EEE9' }}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 min-w-0 border border-gray-200 rounded-lg">
            <InputGroup className="w-full">
              <InputGroupAddon><SearchIcon className="text-gray-400 w-4 h-4" /></InputGroupAddon>
              <InputGroupInput
                placeholder="Cari nama, email, telepon, atau program studi..."
                className="text-sm"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </InputGroup>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 text-sm whitespace-nowrap min-w-[120px]">
                  {statusFilter === "all" ? "Semua Status" : statusConfig[statusFilter]?.label || statusFilter}
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { setStatusFilter("all"); setPage(1); }} className="cursor-pointer text-sm">Semua Status</DropdownMenuItem>
                {Object.entries(statusConfig).map(([k, v]) => (
                  <DropdownMenuItem key={k} onClick={() => { setStatusFilter(k); setPage(1); }} className="cursor-pointer text-sm">{v.label}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 text-sm whitespace-nowrap min-w-[140px]">
                  <span className="truncate max-w-[100px]">{programFilter === "all" ? "Semua Program Studi" : programFilter}</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
                <DropdownMenuItem onClick={() => { setProgramFilter("all"); setPage(1); }} className="cursor-pointer text-sm">Semua Program Studi</DropdownMenuItem>
                {programs.map((p) => (
                  <DropdownMenuItem key={p} onClick={() => { setProgramFilter(p); setPage(1); }} className="cursor-pointer text-sm">{p}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-100 mt-4">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow style={{ backgroundColor: '#015023' }}>
                <TableHead className="!text-white text-xs font-semibold w-16">ID</TableHead>
                <TableHead className="!text-white text-xs font-semibold">Nama</TableHead>
                <TableHead className="!text-white text-xs font-semibold">Email</TableHead>
                <TableHead className="!text-white text-xs font-semibold">Telepon</TableHead>
                <TableHead className="!text-white text-xs font-semibold">Program Studi</TableHead>
                <TableHead className="!text-white text-xs font-semibold">Tanggal</TableHead>
                <TableHead className="!text-white text-xs font-semibold">Status</TableHead>
                <TableHead className="!text-white text-xs font-semibold w-12">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(8)].map((_, j) => (
                      <TableCell key={j}><div className="h-4 bg-gray-100 rounded animate-pulse" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedData.length > 0 ? (
                paginatedData.map((app, i) => {
                  const st = statusConfig[app.status] || statusConfig.submitted;
                  return (
                    <TableRow key={app.id_profile || i} className="hover:bg-gray-50/50">
                      <TableCell className="text-sm font-medium text-gray-700">{app.registration_number}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-800">{app.name}</TableCell>
                      <TableCell className="text-sm text-gray-500">{app.email}</TableCell>
                      <TableCell className="text-sm text-gray-500">{app.phone}</TableCell>
                      <TableCell className="text-sm text-gray-500">{app.program}</TableCell>
                      <TableCell className="text-sm text-gray-500 whitespace-nowrap">{formatDate(app.date)}</TableCell>
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
                  <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                    Tidak ada data pendaftar
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-1">
          <p className="text-xs sm:text-sm text-gray-400">
            Menampilkan {filtered.length > 0 ? (page - 1) * pageSize + 1 : 0} - {Math.min(page * pageSize, filtered.length)} dari {filtered.length} data
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="text-sm flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Sebelumnya
            </Button>
            {totalPages > 0 && (
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: '#015023' }}
              >
                {page}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="text-sm flex items-center gap-1"
            >
              Selanjutnya <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
