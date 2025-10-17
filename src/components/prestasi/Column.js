"use client"

import { ColumnDef } from "@tanstack/react-table"
// import { header } from "express/lib/request"

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
        accessorKey: "edit",
        header: "Edit",
    },
    {
        accessorKey: "hapus",
        header: "Hapus",
    },
]