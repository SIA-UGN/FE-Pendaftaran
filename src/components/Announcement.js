'use client'

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { columns } from "./Column";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";

function getData() {
  return [
    {
      id: "PEN-001",
      amount: 250000,
      status: "Lulus",
      email: "budi.santoso@example.com",
      name: "Budi Santoso",
    },
    {
      id: "PEN-002",
      amount: 300000,
      status: "Lulus",
      email: "citra.lestari@example.com",
      name: "Citra Lestari",
    },
    {
      id: "PEN-003",
      amount: 250000,
      status: "Lulus",
      email: "eko.prasetyo@example.com",
      name: "Eko Prasetyo",
    },
    {
      id: "PEN-004",
      amount: 500000,
      status: "Lulus",
      email: "diana.fitriani@example.com",
      name: "Diana Fitriani",
    },
    {
      id: "PEN-005",
      amount: 300000,
      status: "Lulus",
      email: "agung.wijaya@example.com",
      name: "Agung Wijaya",
    },
    {
      id: "PEN-006",
      amount: 250000,
      status: "Lulus",
      email: "rini.susanti@example.com",
      name: "Rini Susanti",
    },
    {
      id: "PEN-007",
      amount: 450000,
      status: "Lulus",
      email: "farhan.maulana@example.com",
      name: "Farhan Maulana",
    },
  ];
}

export default function Announcement() {
  const [data, setData] = useState([]);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);

      if (result.length > 0) setIsOn(true);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center pt-4 pb-16 px-4 sm:px-8 max-w-11/12 mx-auto">

        <h2 className="text-xl sm:text-2xl font-medium mb-4 w-full border-b-2 border-black pb-2">
          Pengumuman
        </h2>
        {
        isOn ? (
          <ScrollArea className="max-h-[500px] rounded-md border border-gray-200 w-full">
          <DataTable columns={columns} data={data} />
          </ScrollArea>
        ) : (
          <div className="w-full p-6 flex flex-col items-center justify-center">
              <p className="text-center text-gray-500">
                Dokumen masih berada dalam proses verifikasi. Silakan cek kembali nanti.
              </p>
              <Button variant="yellow" className="rounded-lg my-6">
                17 November 2025
              </Button>
          </div>
        )
        }
        

    </div>
  );
}
