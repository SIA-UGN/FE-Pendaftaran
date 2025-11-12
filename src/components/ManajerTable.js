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

const managers = [
  {
    name: "Ahmad Fauzi",
    email: "ahmadfauzi@gmail.com",
   },
  {
    name: "Bella Pratiwi",
    email: "ahmadfauzi@gmail.com",
   },
  {
    name: "Cahyo Nugroho",
    email: "ahmadfauzi@gmail.com",
   },
  {
    name: "Dian Lestari",
    email: "ahmadfauzi@gmail.com", 
   },
  {
    name: "Eko Prasetyo",
    email: "ahmadfauzi@gmail.com",
   },
];

export function ManajerTable() {
  return (
    <Table className="w-full text-sm">

      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[80px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center w-[120px]">Lihat</TableHead>
          <TableHead className="text-center w-[120px]">Hapus</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {managers.map((manager, index) => (
          <TableRow key={index}>
            <TableCell className="text-center font-medium">{index + 1}</TableCell>
            <TableCell>{manager.name}</TableCell>
            <TableCell>{manager.email}</TableCell>
            <TableCell className="text-center">
              <Link href={`/dashboard/manajer/profile`}>
                <Button
                  size="sm"
                  variant="yellow"
                  className="text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all"
                >
                  Lihat
                </Button>
              </Link>
            </TableCell>
            <TableCell className="text-center">
              <Button
                size="sm"
                variant="destructive"
                className="hover:opacity-90 transition-all"
              >
                Hapus
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Manajer</TableCell>
          <TableCell className="text-center font-semibold">
            {managers.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
