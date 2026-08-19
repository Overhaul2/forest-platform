import { DashboardStats } from "../types/dashboard";
import { api } from "./api";

export async function getDashboardStats() {
  const { data } = await api.get<DashboardStats>("/dashboard");

  return data;
}