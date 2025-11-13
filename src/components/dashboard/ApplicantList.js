"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SearchIcon, ChevronDown } from "lucide-react";
import { ApplicantTable } from "@/components/dashboard/ApplicantTable";

export default function ApplicantList({data}) {
  return (
    <>
      {/* Bagian Pencarian & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 my-6 w-full">
        {/* Input Pencarian */}
        <div className="flex-1 border-1 border-[var(--green)] rounded-lg">
          <InputGroup className="w-full">
            <InputGroupInput placeholder="Cari berdasarkan nama, nomor peserta, dsb..." />
            <InputGroupAddon>
              <SearchIcon className="text-gray-500" />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Dropdown Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 font-medium px-4 py-2 border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <span>Cari Akun Berdasarkan Data</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {
              data.map((applicant) => (
                <DropdownMenuItem key={applicant.id} className="cursor-pointer">{applicant.name}</DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabel Pendaftar */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <ApplicantTable Data={data} />
      </div>
    </>
  );
}
