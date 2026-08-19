"use client";

import { useStatistics } from "@/app/hooks/useStatistic";
import {
  Trees,
  Leaf,
  ImageIcon,
  Globe2,
  Languages,
  BookOpen,
} from "lucide-react";

export default function Statistics() {
  const { data, isLoading } = useStatistics();

  const stats = [
    {
      title: "Espèces recensées",
      icon: Trees,
      value: data?.species,
    },
    {
      title: "Genres botaniques",
      icon: Leaf,
      value: data?.genera,
    },
    {
      title: "Familles botaniques",
      icon: Leaf,
      value: data?.families,
    },
    {
      title: "Images disponibles",
      icon: ImageIcon,
      value: data?.images,
    },
    {
      title: "Pays de distribution",
      icon: Globe2,
      value: data?.countries,
    },
    {
      title: "Noms vernaculaires",
      icon: Languages,
      value: data?.vernacularNames,
    },
    {
      title: "Sources bibliographiques",
      icon: BookOpen,
      value: data?.bibliography,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Statistiques de la plateforme
          </h2>

          <p className="text-emerald-100 mt-4">
            Données calculées en temps réel à partir de la base taxonomique.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-6 hover:border-emerald-400 transition"
              >
                <Icon className="w-8 h-8 text-emerald-400 mb-5" />

                <h3 className="text-lg font-medium">
                  {item.title}
                </h3>

                <p className="mt-4 text-4xl font-bold">
                  {isLoading ? "..." : item.value?.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}