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

const managers = [
  {
    name: "Ahmad Fauzi",
    username: "ahmadf",
    email: "ahmad.fauzi@example.com",
    verifications: 25,
  },
  {
    name: "Bella Pratiwi",
    username: "bellap",
    email: "bella.pratiwi@example.com",
    verifications: 18,
  },
  {
    name: "Cahyo Nugroho",
    username: "cahyo_n",
    email: "cahyo.nugroho@example.com",
    verifications: 32,
  },
  {
    name: "Dian Lestari",
    username: "dianl",
    email: "dian.lestari@example.com",
    verifications: 27,
  },
  {
    name: "Eko Prasetyo",
    username: "eko_p",
    email: "eko.prasetyo@example.com",
    verifications: 12,
  },
];

export function ManajerTable() {
  return (
    <Table>
      <TableCaption>Daftar manajer Universitas Global Nusantara.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Jumlah Verifikasi</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {managers.map((manager, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{manager.name}</TableCell>
            <TableCell>{manager.username}</TableCell>
            <TableCell>{manager.email}</TableCell>
            <TableCell>{manager.verifications}</TableCell>
            <TableCell className="text-right">
              <Link href="/dashboard/manajer/profile">
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
          <TableCell colSpan={4}>Total Manajer</TableCell>
          <TableCell className="text-right">{managers.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}