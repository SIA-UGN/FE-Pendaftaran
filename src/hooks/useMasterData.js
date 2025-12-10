import { useQuery } from "@tanstack/react-query";
import { masterDataService } from "@/services/masterDataService";

export const usePrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: masterDataService.getPrograms,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: masterDataService.getProvinces,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useCitiesByProvince = (provinceId) => {
  return useQuery({
    queryKey: ["cities", provinceId],
    queryFn: () => masterDataService.getCitiesByProvince(provinceId),
    enabled: !!provinceId,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
