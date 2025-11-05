import { Card } from "@/components/ui/card";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { columns, Payment } from "./Column"
import { DataTable } from "./Data-Table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ScrollArea } from "@/components/ui/scroll-area"

async function getData() {
  return [
    {
      id: "728ed52f",
      amount: 100,
      name: 'Lomba Menghayal',
      sertifikat: "sertifikatLomba.pdf",
      lihat: "Lihat",
    },
  ]
}

export default async function Prestasi() {
  const data = await getData()
  return (
    <div className="flex flex-col gap-5 border rounded-xl m-12 bg-[var(--light-cream)]">
        <DataTable columns={columns} data={data} className={"w-full p-4 bg-white"} />
    </div>
  );
}