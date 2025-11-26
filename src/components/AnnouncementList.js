"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { AnnouncementTable } from "@/components/AnnouncementTable";
import { useState, useMemo } from "react";

export default function AnnouncementList({ data }) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) {
      return data;
    }

    const searchLower = search.toLowerCase().trim();
    
    return data.filter((item) => {
      return (
        // item.id?.toLowerCase().includes(searchLower) ||
        item.registration_number?.toLowerCase().includes(searchLower) ||
        item.profile?.full_name?.toLowerCase().includes(searchLower)
      );
    });
  }, [data, search]);

  console.log(data);
  console.log("Filtered:", filteredData);

  return (
    <div className="w-full px-0">
      <div className="flex items-center justify-between gap-4 my-6 w-full">
        <div className="flex-1 min-w-0 border-1 border-black rounded-lg">
          <InputGroup className="w-full">
            <InputGroupInput
              placeholder="Cari berdasarkan nama..."
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

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <AnnouncementTable data={filteredData} />
      </div>

      {filteredData.length === 0 && search && (
        <div className="text-center py-8 text-gray-500">
          Tidak ada hasil untuk `{search}`
        </div>
      )}
    </div>
  );
}