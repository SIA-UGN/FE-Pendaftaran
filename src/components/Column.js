"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    id: "rowNumber",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "id",
    header: "Nomor Peserta",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
