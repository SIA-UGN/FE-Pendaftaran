"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteManager } from "@/hooks/useAdmin";
import { useState } from "react";

export function ManajerTable({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [deleteId, setDeleteId] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const {
    mutate: deleteManager,
    isLoading: deleteLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteManager();

  const columns = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
          >
            No
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
          >
            Nama
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      id: "lihat",
      header: () => <div className="text-center">Lihat</div>,
      cell: ({ row }) => {
        const manager = row.original;
        return (
          <div className="text-center">
            <Link href={`/dashboard/manajer/profile?id=${manager.id}`}>
              <Button
                size="sm"
                variant="yellow"
                className="text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all"
              >
                <Eye className="w-4 h-4 mr-1" />
                Lihat
              </Button>
            </Link>
          </div>
        );
      },
    },
    {
      id: "hapus",
      header: () => <div className="text-center">Hapus</div>,
      cell: ({ row }) => {
        const manager = row.original;
        return (
          <div className="text-center">
            <Button
              size="sm"
              variant="destructive"
              className="hover:opacity-90 transition-all"
              disabled={deleteLoading}
              onClick={() => {
                setDeleteId(manager.id);
                setOpen(true);
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Hapus
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteManager(deleteId, {
        onSuccess: () => {
          setOpen(false);
          setDeleteId(null);
        },
      });
    }
  };

  const selectedManager = data.find((m) => m.id === deleteId);

  return (
    <div className="w-full space-y-4">
      <div className="hidden md:block overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  Tidak ada data yang dapat ditampilkan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => {
            const manager = row.original;
            return (
              <div
                key={row.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <span className="bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nama Manager</p>
                    <p className="font-medium text-base">{manager.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-700">{manager.email}</p>
                  </div>

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

                    <Button
                      variant="destructive"
                      className="flex-1 text-sm hover:opacity-90 transition-all"
                      disabled={deleteLoading}
                      onClick={() => {
                        setDeleteId(manager.id);
                        setOpen(true);
                      }}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-6">
            Tidak ada data yang dapat ditampilkan
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4">
        <div className="text-sm text-gray-500">
          Menampilkan{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          -{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          dari {table.getFilteredRowModel().rows.length} data
        </div>

        <div className="flex items-center gap-2 px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm">
            Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Manager</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus akun{" "}
              <strong>{selectedManager?.name}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setDeleteId(null);
              }}
            >
              Batal
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Menghapus..." : "Hapus"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
