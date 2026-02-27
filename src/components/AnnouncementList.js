"use client";

import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { AnnouncementTable } from "@/components/AnnouncementTable";

const AnnouncementList = React.memo(function AnnouncementList({
  data,
  onSearchChange,
  searchValue,
}) {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="w-full px-0">
      <div className="flex items-center justify-between gap-4 my-6 w-full">
        <div className="flex-1 min-w-0 border-1 border-black rounded-lg">
          <InputGroup className="w-full">
            <InputGroupInput
              placeholder="Cari berdasarkan nama atau nomor registrasi..."
              className="text-sm sm:text-base"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <InputGroupAddon>
              <SearchIcon className="text-gray-500 w-5 h-5" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <AnnouncementTable data={data} searchValue={searchValue} />
      </div>

      {data.length === 0 && searchValue && (
        <div className="text-center py-8 text-gray-500">
          Tidak ada hasil untuk &quot;{searchValue}&quot;
        </div>
      )}
    </div>
  );
});

export default AnnouncementList;
