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
import { ArrowUpDown, Eye, Trash2 } from "lucide-react";
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
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeletePaymentMethod } from "@/hooks/usePaymentMethod";

export function PaymentMethodTable({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [deleteId, setDeleteId] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { mutate: deletePayment, isLoading } = useDeletePaymentMethod();

  const columns = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full"
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "account_holder",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Penerima
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("account_holder")}</div>,
    },
    {
      accessorKey: "account_number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nomor Rekening
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("account_number")}</div>,
    },
    {
      accessorKey: "bank_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Bank
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("bank_name")}</div>,
    },
    {
      id: "lihat",
      header: () => <div className="text-center">Lihat</div>,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <div className="text-center">
            <Link href={`/dashboard/edit/pembayaran/detail?id=${payment.id}`}>
              <Button variant="yellow" size="sm">
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
        const payment = row.original;
        return (
          <div className="text-center">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setDeleteId(payment.id);
                setOpen(true);
              }}
              disabled={isLoading}
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
      deletePayment(deleteId, {
        onSuccess: () => {
          setOpen(false);
          setDeleteId(null);
        },
      });
    }
  };

  const selectedPayment = data.find((p) => p.id === deleteId);

  return (
    <div className="w-full space-y-4">

      {/* Desktop Table */}
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => {
            const payment = row.original;
            return (
              <div
                key={row.id}
                className="border rounded-lg p-4 space-y-3 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-semibold text-gray-500">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-bold">{payment.bank_name}</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">Nama Penerima</span>
                    <p className="text-sm font-medium">
                      {payment.account_holder}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500">
                      Nomor Rekening
                    </span>
                    <p className="text-sm font-medium">
                      {payment.account_number}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/dashboard/edit/pembayaran/detail?id=${payment.id}`}
                    className="flex-1"
                  >
                    <Button variant="yellow" className="w-full" size="sm">
                      Lihat
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setDeleteId(payment.id);
                      setOpen(true);
                    }}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Hapus
                  </Button>
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

        <div className="flex items-center gap-2">
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Metode Pembayaran</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus metode pembayaran{" "}
              <strong>{selectedPayment?.bank_name}</strong> atas nama{" "}
              <strong>{selectedPayment?.account_holder}</strong>? Tindakan ini
              tidak dapat dibatalkan.
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
              disabled={isLoading}
            >
              {isLoading ? "Menghapus..." : "Hapus"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
