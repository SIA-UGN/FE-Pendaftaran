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
import { Button } from "@/components/ui/button";
import Link from "next/link"

const students = [
  {
    id: "MHS001",
    name: "Andi Saputra",
    email: "andi.saputra@example.com",
    major: "Teknik Informatika",
    status: "Lulus",
  },
  {
    id: "MHS002",
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    major: "Manajemen",
    status: "Lulus",
  },
  {
    id: "MHS003",
    name: "Citra Lestari",
    email: "citra.lestari@example.com",
    major: "Desain Komunikasi Visual",
    status: "Lulus",
  },
  {
    id: "MHS004",
    name: "Dewi Anggraini",
    email: "dewi.anggraini@example.com",
    major: "Akuntansi",
    status: "Lulus",
  },
  {
    id: "MHS005",
    name: "Eka Pratama",
    email: "eka.pratama@example.com",
    major: "Hukum",
    status: "Lulus",
  },
];

export function ApplicantTable() {
  return (
    <Table>
      <TableCaption>Daftar mahasiswa Universitas Global Nusantara.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Jurusan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.id}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.major}</TableCell>
            <TableCell>{student.status}</TableCell>
            <TableCell className="text-right">
              <Link href="/dashboard/profile">
              <Button size="sm" variant="outline">
                Lihat
              </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Mahasiswa</TableCell>
          <TableCell className="text-right">{students.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
