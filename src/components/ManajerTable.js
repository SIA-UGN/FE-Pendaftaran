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
  { name: "Ahmad Fauzi" },
  { name: "Bella Pratiwi" },
  { name: "Cahyo Nugroho" },
  { name: "Dian Lestari" },
  { name: "Eko Prasetyo" },
];

export function ManajerTable() {
  return (
    <Table className="w-full text-sm">

      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[80px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead className="text-center w-[120px]">Lihat</TableHead>
          <TableHead className="text-center w-[120px]">Hapus</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {managers.map((manager, index) => (
          <TableRow key={index}>
            <TableCell className="text-center font-medium">{index + 1}</TableCell>
            <TableCell>{manager.name}</TableCell>
            <TableCell className="text-center">
              <Link href={`/dashboard/manajer/profile/${index + 1}`}>
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
