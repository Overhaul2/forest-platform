import { useQuery } from "@tanstack/react-query";
import { getSpeciesSuggestions } from "../services/species.service";

export function useSpeciesSuggestions(query: string) {
  return useQuery({
    queryKey: ["species-suggestions", query],

    queryFn: () => getSpeciesSuggestions(query),

    enabled: query.trim().length >= 3,

    staleTime: 30_000,
  });
}