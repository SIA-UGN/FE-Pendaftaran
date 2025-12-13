"use client";

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
import { ApplicantTable } from "@/components/dashboard/ApplicantTable";

import { useState } from "react";

export default function ApplicantList({ data, type }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const applicants = data.data;

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "submitted", label: "Submitted" },
  ];

  const getStatusLabel = () => {
    const selected = statusOptions.find((opt) => opt.value === statusFilter);
    return selected ? selected.label : "Semua Status";
  };

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 my-4 sm:my-6 w-full">
        <div className="flex-1 min-w-0 border-1 border-[var(--green)] rounded-lg">
          <InputGroup className="w-full">
            <InputGroupInput
              placeholder="Cari berdasarkan nama..."
              className="text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 font-medium px-3 sm:px-4 py-2 border-gray-300 hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              <span className="hidden sm:inline">{getStatusLabel()}</span>
              <span className="sm:hidden">Status</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 sm:w-56">
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className="cursor-pointer text-sm"
                onClick={() => setStatusFilter(option.value)}
              >
                <span
                  className={`${
                    statusFilter === option.value
                      ? "font-semibold text-[var(--green)]"
                      : ""
                  }`}
                >
                  {option.label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <ApplicantTable data={filteredApplicants} type={type} />
      </div>
    </div>
  );
}