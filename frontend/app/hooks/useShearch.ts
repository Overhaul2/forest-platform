import { useMutation } from "@tanstack/react-query";
import { searchSpecies } from "../services/species.service";

export function useSearchSpecies(
  onSuccess?: (species: any) => void,
) {
  return useMutation({
    mutationFn: searchSpecies,

    onSuccess(data, variables) {
      console.log("Recherche terminée");
      console.log("Recherche :", variables);
      console.log("Réponse :", data);

      if (onSuccess) {
        onSuccess(data);
      }
    },

    onError(error) {
      console.error("Erreur recherche :", error);
    },
  });
}