import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { columns } from "./Column";
import { DataTable } from "./DataTable";

async function getData() {
  return [
    {
      id: "PEN-001",
      amount: 250000,
      status: "success",
      email: "budi.santoso@example.com",
      name: "Budi Santoso",
    },
    {
      id: "PEN-002",
      amount: 300000,
      status: "pending",
      email: "citra.lestari@example.com",
      name: "Citra Lestari",
    },
    {
      id: "PEN-003",
      amount: 250000,
      status: "failed",
      email: "eko.prasetyo@example.com",
      name: "Eko Prasetyo",
    },
    {
      id: "PEN-004",
      amount: 500000,
      status: "success",
      email: "diana.fitriani@example.com",
      name: "Diana Fitriani",
    },
    {
      id: "PEN-005",
      amount: 300000,
      status: "processing",
      email: "agung.wijaya@example.com",
      name: "Agung Wijaya",
    },
    {
      id: "PEN-006",
      amount: 250000,
      status: "success",
      email: "rini.susanti@example.com",
      name: "Rini Susanti",
    },
    {
      id: "PEN-007",
      amount: 450000,
      status: "pending",
      email: "farhan.maulana@example.com",
      name: "Farhan Maulana",
    },
  ];
}

export default async function Announcement() {
  const data = await getData();

  return (
    <div className="flex flex-col items-center bg-[var(--light-cream)] min-h-screen pt-28 pb-16 px-4 sm:px-8">
      <div className="w-full bg-[var(--green)] text-[var(--cream)] text-center py-10 px-4 rounded-xl shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          🎉 Selamat kepada Calon Mahasiswa Baru!
        </h1>
        <p className="text-base sm:text-lg mt-2 font-light">
          Universitas Global Nusantara — Tahun Akademik 2025/2026
        </p>
      </div>

      <Card className="w-full max-w-6xl mt-10 p-6 sm:p-8 rounded-xl shadow-md bg-white">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-[var(--green)]">
          Daftar Pendaftar yang Diterima
        </h2>

        <ScrollArea className="max-h-[500px] rounded-md border border-gray-200">
          <DataTable columns={columns} data={data} />
        </ScrollArea>
      </Card>

      <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
        Jika nama Anda belum tercantum, silakan cek kembali pada pengumuman berikutnya.
      </p>
    </div>
  );
}
