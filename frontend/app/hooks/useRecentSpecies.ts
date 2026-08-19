import { useQuery } from "@tanstack/react-query";
import { getRecentSpecies } from "../services/species.service";

export function useRecentSpecies(limit = 6) {
  return useQuery({
    queryKey: ["recent-species", limit],
    queryFn: () => getRecentSpecies(limit),
    staleTime: 1000 * 60 * 5,
  });
}