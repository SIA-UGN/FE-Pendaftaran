"use client";

import { useCallback, useMemo } from "react";
import { useAnnouncementsWithSearch } from "@/hooks/useAnnouncementsWithSearch";
import { Heading } from "@/components/Heading";
import AnnouncementList from "@/components/AnnouncementList";

export default function Announcement() {
  const { announcements, isLoading, error, search, handleSearch, pagination } =
    useAnnouncementsWithSearch();

  // Memoize data untuk prevent unnecessary processing
  const memoizedAnnouncements = useMemo(() => announcements, [announcements]);

  const isError = !!error;

  const handleSearchChange = useCallback(
    (newSearch) => {
      handleSearch(newSearch);
    },
    [handleSearch]
  );

  if (isLoading && !announcements.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        <div className="text-center">
          <div className="relative h-16 w-16 mx-auto mb-4">
            <div
              className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-green-500 animate-spin"
              style={{
                borderRadius: "50%",
                borderTopColor: "#22c55e",
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                borderLeftColor: "transparent",
              }}
            ></div>
          </div>
          <p className="text-gray-600">Memuat pengumuman...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg max-w-md">
          <div className="mx-auto bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h3 className="text-red-800 font-semibold text-lg">
            Gagal Memuat Data
          </h3>
          <p className="text-red-600 mt-1">Error: {error.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
      <Heading title={"Pengumuman"} />

      {/* Info: Total data loaded */}
      {pagination?.total > 0 && (
        <div className="w-full max-w-7xl mb-4 px-4">
          <p className="text-sm text-gray-600">
            Menampilkan {memoizedAnnouncements.length} dari {pagination.total}{" "}
            pengumuman kelulusan
          </p>
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <AnnouncementList
          data={memoizedAnnouncements}
          onSearchChange={handleSearchChange}
          searchValue={search}
        />
      </div>
    </div>
  );
}
