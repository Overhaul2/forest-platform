import { Species } from "../types/species";
import { api } from "./api";

export interface SpeciesResponse {
  data: Species[];
  total: number;
  page: number;
  totalPages: number;
}
// récupération de la liste des espèces avec pagination et filtres
export async function getSpecies(params?: {
  page?: number;
  limit?: number;
  search?: string;
  family?: string;
  genus?: string;
}) {
  const { data } = await api.get<SpeciesResponse>("/espece", {
    params,
  });
  console.log("liste::::::::::::",data)

  return data;
}
//recherche d'espèces par nom scientifique, 
export async function searchSpecies(query: string) {
  const { data } = await api.get("/gbif/search", {
    params: {
      q: query,
    },
  });
  return data;
}

//suggestions lors de la saisie du nom de l'espèce pour la recherche
export interface SpeciesSuggestion {
  id: string;
  scientificName: string;
  canonicalName: string;
  rank: string;

  genus?: {
    name: string;
  };

  images?: {
    url: string;
  }[];

  vernacularNames?: {
    name: string;
    language: string;
  }[];
}

//importation d'espèces depuis la base de données GBIF
export async function importSpecies(
  scientificName: string,
) {
  const { data } = await api.post(
    "/gbif/import",
    {
      scientificName,
    },
  );
  console.log("impor data!::::::::::::",data)

  return data;
}

// récupération d'une espèce par son ID
export async function getSpeciesById(id: string) {
  const { data } = await api.get(`/espece/${id}`);

  return data;
}

export async function getSpeciesSuggestions(query: string) {
  const { data } = await api.get<SpeciesSuggestion[]>(
    "/espece/suggestions",
    {
      params: {
        q: query,
      },
    },
  );

  return data;
}

export async function getRecentSpecies(limit = 6) {
  const { data } = await api.get("/espece/recent", {
    params: { limit },
  });

  return data;
}