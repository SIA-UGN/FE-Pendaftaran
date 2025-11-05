"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const majors = [
  {
    code: "TI-001",
    name: "Teknik Informatika",
    faculty: "Fakultas Teknik",
    applicants: 145,
  },
  {
    code: "SI-002",
    name: "Sistem Informasi",
    faculty: "Fakultas Teknik",
    applicants: 98,
  },
  {
    code: "AK-003",
    name: "Akuntansi",
    faculty: "Fakultas Ekonomi",
    applicants: 127,
  },
  {
    code: "MN-004",
    name: "Manajemen",
    faculty: "Fakultas Ekonomi",
    applicants: 156,
  },
  {
    code: "HK-005",
    name: "Ilmu Hukum",
    faculty: "Fakultas Hukum",
    applicants: 89,
  },
];

export function MajorTable() {
  const totalApplicants = majors.reduce((sum, major) => sum + major.applicants, 0);

  return (
    <Table>
      <TableCaption>Daftar jurusan Universitas Global Nusantara.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Kode Jurusan</TableHead>
          <TableHead>Nama Jurusan</TableHead>
          <TableHead>Fakultas</TableHead>
          <TableHead>Jumlah Pendaftar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {majors.map((major, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{major.code}</TableCell>
            <TableCell>{major.name}</TableCell>
            <TableCell>{major.faculty}</TableCell>
            <TableCell>{major.applicants}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Pendaftar</TableCell>
          <TableCell>{totalApplicants}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}