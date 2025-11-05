"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export const columns = [
  {
    id: "rowNumber",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Nama Prestasi",
  },
  {
    accessorKey: "sertifikat",
    header: "Sertifikat",
  },
  {
    id: "lihat",
    header: "Lihat",
    cell: ({ row }) => {
      const data = row.original
      return (
        <Button
          variant="yellow"
          size="sm"
          onClick={() => alert(`Lihat sertifikat: ${data.sertifikat}`)}
        >
          Lihat
        </Button>
      )
    },
  },
]
