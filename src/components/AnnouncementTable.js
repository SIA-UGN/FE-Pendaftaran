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

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AnnouncementTable({ data }) {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const columns = [
    {
      accessorKey: "no",
      header: () => <span className="w-full block text-center">No</span>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "registration_number",
      header: () => <span>Nomor Registrasi</span>,
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.registration_number || "-"}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <span>Nama</span>,
      cell: ({ row }) => <div>{row.original.name || "-"}</div>,
    },
    {
      accessorKey: "program",
      header: () => <span>Program Studi</span>,
      cell: ({ row }) => {
        const program = row.original.program;
        return (
          <div className="text-sm">
            {program?.name ? (
              <div>
                <div className="font-medium">{program.name}</div>
                {program.code && (
                  <div className="text-gray-500 text-xs">{program.code}</div>
                )}
              </div>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <span>Status</span>,
      cell: ({ row }) => {
        const status = row.original.status || "Lulus";
        const statusLower = status?.toLowerCase();

        const statusColors = {
          approved: "bg-green-100 text-green-800 border-green-200",
          pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
          rejected: "bg-red-100 text-red-800 border-red-200",
          verified: "bg-blue-100 text-blue-800 border-blue-200",
          lulus: "bg-green-100 text-green-800 border-green-200",
          "tidak lulus": "bg-red-100 text-red-800 border-red-200",
          disetujui: "bg-green-100 text-green-800 border-green-200",
          menunggu: "bg-yellow-100 text-yellow-800 border-yellow-200",
          ditolak: "bg-red-100 text-red-800 border-red-200",
        };

        const statusText = {
          approved: "Disetujui",
          pending: "Menunggu",
          rejected: "Ditolak",
          verified: "Terverifikasi",
          lulus: "Lulus",
          "tidak lulus": "Tidak Lulus",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border inline-block ${
              statusColors[statusLower] ||
              "bg-gray-100 text-gray-800 border-gray-200"
            }`}
          >
            {statusText[statusLower] || status}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
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
    <div className="w-full space-y-2">
      {/* Table with horizontal scroll on mobile */}
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[640px]">
          <TableHeader style={{ backgroundColor: '#015023' }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="!text-white">
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-4 py-2">
        <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
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

        <div className="flex items-center gap-2 px-2 sm:px-6 py-2 sm:py-4">
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
