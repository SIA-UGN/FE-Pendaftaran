import { useState, useEffect } from "react";
import { useAnnouncements } from "./useAnnouncement";
import { useDebounce } from "./useDebounce";

/**
 * Hook untuk announcements dengan search functionality
 * @returns {Object} Announcements with search utilities
 */
export const useAnnouncementsWithSearch = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const debouncedSearch = useDebounce(search, 500);

  const params = {
    ...filters,
    search: debouncedSearch || undefined,
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
  };

  return {
    announcements: data?.data || [],
    pagination: data?.meta || {},
    isLoading,
    error,
    search,
    filters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    refetch,
  };
};
