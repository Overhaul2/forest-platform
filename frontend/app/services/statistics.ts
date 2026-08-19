import { api } from "./api";


export interface Statistics {
  species: number;
  genera: number;
  families: number;
  images: number;
  countries: number;
  vernacularNames: number;
  bibliography: number;
}

export async function getStatistics() {
  const { data } = await api.get<Statistics>("/statistics");
  return data;
}