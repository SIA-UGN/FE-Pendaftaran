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

export function ManajerTable({ data }) {
  const {
    mutate: deleteManager,
    isLoading: deleteLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteManager();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden md:block">
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
                        <Button
                          variant="outline"
                          onClick={() => setOpen(false)}
                        >
                          Batal
                        </Button>
                        <Button
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            deleteManager(manager.id, {
                              onSuccess: () => {
                                setOpen(false);
                              },
                            });
                          }}
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
              <TableCell className="text-center font-semibold" colSpan={2}>
                {data.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4 p-4">
        {data.map((manager, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="space-y-3">
              {/* Number */}
              <div className="flex items-center gap-2">
                <span className="bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-1 rounded-full">
                  #{index + 1}
                </span>
              </div>

              {/* Name */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Nama Manager</p>
                <p className="font-medium text-base">{manager.name}</p>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm text-gray-700">{manager.email}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/dashboard/manajer/profile?id=${manager.id}`}
                  className="flex-1"
                >
                  <Button
                    variant="yellow"
                    className="w-full text-sm font-medium text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all"
                  >
                    Lihat
                  </Button>
                </Link>

                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex-1 text-sm hover:opacity-90 transition-all"
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
                        onClick={() => {
                          deleteManager(manager.id, {
                            onSuccess: () => {
                              setOpen(false);
                            },
                          });
                        }}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? "Menghapus..." : "Hapus"}
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}

        {/* Total Footer for Mobile */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Total Manajer
            </span>
            <span className="text-base font-semibold text-gray-900">
              {data.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
