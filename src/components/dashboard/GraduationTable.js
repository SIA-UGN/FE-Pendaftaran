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
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GraduationTable({ data, type }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  console.log(data);

  const columns = [
    {
      accessorKey: "user_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
          >
            ID
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("user_id")}</div>
      ),
    },
    {
      accessorKey: "registration_number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
          >
            Nomor Peserta
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("registration_number")}</div>
      ),
    },
    {
      accessorKey: "user.name",
      header: "Nama Peserta",
      cell: ({ row }) => {
        const name = row.original.user?.name || "-";
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "graduation_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("graduation_status");
        const statusLabels = {
          graduated: "Graduated",
          not_graduated: "Not Graduated",
        };
        return (
          <div className="text-center">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                status === "graduated"
                  ? "bg-green-100 text-green-700"
                  : status === "not_graduated"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {statusLabels[status] || status}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="text-center">
          {type === "manager" ? "Verifikasi" : "Lihat"}
        </div>
      ),
      cell: ({ row }) => {
        const applicant = row.original;
        return (
          <div className="text-center">
            <Link
              href={
                type === "manager"
                  ? `/manager/verification?id=${applicant.id}`
                  : `/dashboard/verification?id=${applicant.id}`
              }
            >
              <Button
                variant="yellow"
                size="sm"
                className="text-sm font-medium text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all rounded-md"
              >
                {type === "manager" ? "Verifikasi" : "Lihat"}
              </Button>
            </Link>
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

  return (
    <div className="w-full space-y-4">
      {/* Filters */}

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
          table.getRowModel().rows.map((row) => {
            const applicant = row.original;
            return (
              <div
                key={row.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start pb-2 border-b">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ID Peserta</p>
                      <p className="font-semibold text-sm">
                        {applicant.user_id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">
                        Nomor Peserta
                      </p>
                      <p className="font-medium text-sm">
                        {applicant.registration_number}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nama Peserta</p>
                    <p className="font-medium text-base">
                      {applicant.user?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">
                      Status Kelulusan
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        applicant.graduation_status === "graduated"
                          ? "bg-green-100 text-green-700"
                          : applicant.graduation_status === "not_graduated"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {applicant.graduation_status === "graduated"
                        ? "Graduated"
                        : applicant.graduation_status === "not_graduated"
                          ? "Not Graduated"
                          : applicant.graduation_status}
                    </span>
                  </div>

                  <Link
                    href={
                      type === "manager"
                        ? `/manager/verification?id=${applicant.id}`
                        : `/dashboard/profile?id=${applicant.id}`
                    }
                    className="block"
                  >
                    <Button
                      variant="yellow"
                      className="w-full text-sm font-medium text-[var(--green)] hover:bg-[var(--green)] hover:text-white transition-all rounded-md"
                    >
                      {type === "manager" ? "Verifikasi" : "Lihat"}
                    </Button>
                  </Link>
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
    </div>
  );
}
