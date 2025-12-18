"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { ManajerTable } from "@/components/ManajerTable";
import { useManagers } from "@/hooks/useAdmin";
import { useState } from "react";

export default function ManajerList() {
  const { data, isLoading, isError, error } = useManagers();
  const [search, setSearch] = useState("");

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        Error fetching managers:{" "}
        {error.response?.data?.message || error.message}
      </div>
    );

  const responseData = data?.data?.data || {};
  // Backend returns array directly in data, not nested in data.managers
  // Response: { success: true, data: [...] } where data is UserResource::collection
  const dataManager = Array.isArray(responseData) ? responseData : [];

  // Filter sederhana (nama atau email)
  const filteredManager = dataManager.filter((manager) => {
    const query = search.toLowerCase();
    return (
      manager.name.toLowerCase().includes(query) ||
      manager.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full px-0">
      {/* Search Only (dropdown removed) */}
      <div className="flex items-center justify-between gap-4 my-6 w-full">
        <div className="flex-1 min-w-0 border-1 border-black rounded-lg">
          <InputGroup className="w-full">
            <InputGroupInput
              placeholder="Cari berdasarkan nama atau email..."
              className="text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon className="text-gray-500 w-5 h-5" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <ManajerTable data={filteredManager} />
      </div>
    </div>
  );
}
