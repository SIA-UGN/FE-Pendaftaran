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
import { useDeleteManager } from "@/hooks/useAdmin";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

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

export function ManajerTable({ data }) {
  const {
    mutate: deleteManager,
    isLoading: deleteLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteManager();

  const [open, setOpen] = useState(false);

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
        {data.map((manager, index) => (
          <TableRow key={index}>
            <TableCell className="text-center font-medium">
              {index + 1}
            </TableCell>
            <TableCell>{manager.name}</TableCell>
            <TableCell>{manager.email}</TableCell>
            <TableCell className="text-center">
              <Link href={`/dashboard/manajer/profile?id=${manager.id}`}>
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
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="hover:opacity-90 transition-all"
                    disabled={deleteLoading}
                  >
                    Hapus
                  </Button>
                </AlertDialogTrigger>

                {/* Confirmation dialog */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Manager</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah Anda yakin ingin menghapus akun {manager.name}?
                      Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Batal
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={deleteManager}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? "Menghapus..." : "Hapus"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Manajer</TableCell>
          <TableCell className="text-center font-semibold">
            {data.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
