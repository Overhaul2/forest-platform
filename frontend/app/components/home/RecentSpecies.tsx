"use client";

import Image from "next/image";
import { useRecentSpecies } from "@/app/hooks/useRecentSpecies";
import { Loader2, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecentSpecies() {
  const router = useRouter();

  const {
    data: species,
    isLoading,
    isError,
  } = useRecentSpecies(6);

  return (
    <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-900 py-28 text-white">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">
            Espèces récentes
          </h2>

          <p className="mx-auto max-w-2xl text-lg font-light text-emerald-100/90 md:text-xl">
            Découvrez les dernières espèces forestières ajoutées
            à notre base de données.
          </p>
        </div>

        {/* Chargement */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          </div>
        )}

        {/* Erreur */}
        {isError && (
          <div className="py-10 text-center text-red-300">
            Impossible de charger les espèces récentes.
          </div>
        )}

        {/* Aucun résultat */}
        {!isLoading &&
          !isError &&
          (!species || species.length === 0) && (
            <div className="py-10 text-center text-emerald-200">
              Aucune espèce récente.
            </div>
          )}

        {/* Liste */}
        {!isLoading &&
          !isError &&
          species?.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {species.map((item: any) => {
                const image = item.images?.[0]?.url;

                return (
                  <article
                    key={item.id}
                    onClick={() =>
                      router.push(`/species/${item.id}`)
                    }
                    className="
                      group
                      cursor-pointer
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/10
                      shadow-xl
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-emerald-400/50
                      hover:bg-white/15
                    "
                  >

                    {/* Image */}
                    <div className="relative h-52 w-full overflow-hidden bg-emerald-950">

                      {image ? (
                        <Image
                          src={image}
                          alt={item.canonicalName}
                          fill
                          className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Leaf className="h-16 w-16 text-emerald-400/50" />
                        </div>
                      )}

                    </div>

                    {/* Informations */}
                    <div className="p-6">

                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-emerald-400">
                        {item.genus?.family?.name || "Famille inconnue"}
                      </p>

                      <h3 className="text-xl font-bold">
                        {item.canonicalName}
                      </h3>

                      <p className="mt-1 text-sm italic text-emerald-300">
                        {item.scientificName}
                      </p>

                      {item.genus && (
                        <p className="mt-3 text-sm text-emerald-100/60">
                          Genre : {item.genus.name}
                        </p>
                      )}

                      {item.vernacularNames?.length > 0 && (
                        <p className="mt-2 text-sm text-emerald-100/70">
                          {item.vernacularNames[0].name}
                        </p>
                      )}

                      <p className="mt-4 text-xs text-emerald-200/40">
                        Ajoutée récemment
                      </p>

                    </div>
                  </article>
                );
              })}

            </div>
          )}

      </div>
    </section>
  );
}