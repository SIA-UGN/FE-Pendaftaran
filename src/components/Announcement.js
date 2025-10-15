import { Card } from "@/components/ui/card";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { columns, Payment } from "./Column"
import { DataTable } from "./DataTable"

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
      status: "pending",
      email: "m@example.com",
      name: "Faradis Yuianto"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      name: "Faradis Yuianto"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      name: "Faradis Yuianto"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      name: "Faradis Yuianto"
    },
  ]
}

export default async function Announcement() {
  const data = await getData()
  return (
    <div className="w-full flex flex-col items-center gap-6 py-8 bg-[var(--light-cream)]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 max-w-7/10 w-full">Selamat kepada</h2>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight max-w-7/10 w-full">Calon Mahasiswa Baru Universitas Global Nusantara!</h4>
      <ScrollArea className="h-[200px] w-6/10 rounded-md border p-4 bg-white">
        <DataTable columns={columns} data={data} className={"w-full p-4 m-4 bg-white"} />
      </ScrollArea>
    </div>
  );
}