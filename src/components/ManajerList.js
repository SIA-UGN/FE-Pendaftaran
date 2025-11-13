"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SearchIcon, ChevronDown } from "lucide-react";
import { ManajerTable } from "@/components/ManajerTable";
import { useManagers } from "@/hooks/useAdmin";

export default function ManajerList() {
  const { data, isLoading, isError, error } = useManagers();

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Error fetching managers: {error.response?.data?.message || error.message}
      </div>
    );

  const dataManager = data.data.data.managers;
  console.log(dataManager);

  return (
    <>
      {/* Bagian Pencarian & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 my-6 w-full">
        {/* Input Pencarian */}
        <div className="flex-1 border-1 border-black rounded-md">
          <InputGroup className="w-full">
            <InputGroupInput placeholder="Cari berdasarkan nama, email, dsb..." />
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
              className="flex items-center justify-center gap-2 font-medium px-4 py-2 border-gray-300 hover:bg-gray-100 transition-colors rounded-lg"
            >
              <span>Cari Akun Berdasarkan Data</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {
              dataManager.map((manager) => (
                <DropdownMenuItem key={manager.id} className="cursor-pointer">{manager.name}</DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabel Manajer */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <ManajerTable data={dataManager} />
      </div>
    </>
  );
}
