import { useQuery } from "@tanstack/react-query";
import { getSpeciesById } from "../services/species.service";

export function useSpecies(id: string) {
  return useQuery({
    queryKey: ["species", id],
    queryFn: () => getSpeciesById(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}