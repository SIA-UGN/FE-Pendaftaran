import { useState, useEffect } from "react";
import { useAnnouncements } from "./useAnnouncement";
import { useDebounce } from "./useDebounce";

export const useAnnouncementsWithSearch = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const params = {
    ...filters,
    search: debouncedSearch || undefined,
    per_page: 1000, // Load max 1000 items, backend akan handle pagination
    page,
  };

  const { data, isLoading, error, refetch } = useAnnouncements(params);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      refetch();
    }
  }, [debouncedSearch, refetch]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearch("");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return {
    announcements: data?.data?.data?.data || [],
    pagination: data?.data?.data?.meta || {},
    isLoading,
    error,
    search,
    filters,
    page,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    clearFilters,
    refetch,
  };
};
