"use client";

import { useState, useMemo } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SearchIcon, ChevronDown } from "lucide-react";
import { PaymentMethodTable } from "@/components/dashboard/PaymentMethodTable";
import Link from "next/link";

export default function PaymentMethodList({ data, type }) {
  const paymentMethodData = data?.data?.data?.data || [];

  // State untuk search query dan filter bank
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState("all");

  // Fungsi untuk filter dan search data
  const filteredData = useMemo(() => {
    let filtered = paymentMethodData;

    // Filter berdasarkan bank yang dipilih
    if (selectedBank !== "all") {
      filtered = filtered.filter((item) => item.bank_name === selectedBank);
    }

    // Search berdasarkan query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        // Sesuaikan field-field ini dengan struktur data Anda
        const searchableFields = [
          item.bank_name,
          item.nama,
          item.nomor,
          item.jenis,
          item.pembayaran,
        ];

        return searchableFields.some((field) =>
          field?.toString().toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [paymentMethodData, searchQuery, selectedBank]);

  // Handler untuk search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handler untuk filter bank
  const handleBankSelect = (bankName) => {
    setSelectedBank(bankName);
  };

  // Reset filter
  const handleResetFilter = () => {
    setSelectedBank("all");
    setSearchQuery("");
  };

  return (
    <>
      {/* Bagian Pencarian & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 my-6 w-full">
        {/* Input Pencarian */}
        <div className="flex-1 border-1 border-[var(--green)] rounded-lg">
          <InputGroup className="w-full">
            <InputGroupInput
              placeholder="Cari berdasarkan nama, nomor, bank, dsb..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
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
              <span>
                {selectedBank === "all" ? "Semua Bank" : selectedBank}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => handleBankSelect("all")}
              className="cursor-pointer"
            >
              Semua Bank
            </DropdownMenuItem>
            {paymentMethodData.map((data, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleBankSelect(data.bank_name)}
                className="cursor-pointer"
              >
                {data.bank_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabel Pendaftar */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        {filteredData.length > 0 ? (
          <PaymentMethodTable data={filteredData} />
        ) : (
          <div className="p-8 text-center text-gray-500">
            Tidak ada data yang ditemukan
          </div>
        )}
      </div>

      <div className="flex flex-end w-full mt-6">
        <Link href={"/dashboard/edit/pembayaran/tambah"} className="ms-auto">
          <Button variant={"green"}>Tambah</Button>
        </Link>
      </div>
    </>
  );
}
