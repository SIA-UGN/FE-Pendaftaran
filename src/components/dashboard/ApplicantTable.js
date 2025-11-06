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
import Link from "next/link";

const students = [
  {
    id: "MHS001",
    name: "Andi Saputra",
    email: "andi.saputra@example.com",
    major: "Teknik Informatika",
    status: "Approved",
  },
  {
    id: "MHS002",
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    major: "Manajemen",
    status: "Rejected",
  },
  {
    id: "MHS003",
    name: "Citra Lestari",
    email: "citra.lestari@example.com",
    major: "Desain Komunikasi Visual",
    status: "Approved",
  },
  {
    id: "MHS004",
    name: "Dewi Anggraini",
    email: "dewi.anggraini@example.com",
    major: "Akuntansi",
    status: "Rejected",
  },
  {
    id: "MHS005",
    name: "Eka Pratama",
    email: "eka.pratama@example.com",
    major: "Hukum",
    status: "Approved",
  },
];

export function ApplicantTable() {
  return (
    <Table>
      <TableCaption>
        Daftar mahasiswa Universitas Global Nusantara.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Jurusan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Verifikasi</TableHead>
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
              <Link href="/manager/verification">
                <Button size="sm" variant="yellow">
                  Verifikasi
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
