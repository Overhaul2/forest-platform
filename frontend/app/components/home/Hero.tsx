"use client";

import { useDebounce } from "@/app/hooks/useDebounce";
import { useSearchSpecies } from "@/app/hooks/useShearch";
import { useSpeciesSuggestions } from "@/app/hooks/useSpeciesSuggestions";

import {
  Trees,
  Search,
  ArrowRight,
  Leaf,
  Loader2,
} from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const canSearch = query.trim().length > 0;

  const search = useSearchSpecies((data) => {
    const species = data?.species;

    if (!species?.id) {
      console.error("Espèce invalide :", data);
      return;
    }

    setIsFocused(false);
    router.push(`/species/${species.id}`);
  });

  const debouncedQuery = useDebounce(query, 400);

  const suggestions = useSpeciesSuggestions(debouncedQuery);

  const showDropdown =
    isFocused &&
    query.trim().length >= 3;

  const handleSearch = () => {
    const value = query.trim();

    if (!value) return;
    search.mutate(value);
  };
const isSearching = search.isPending === true;

  const handleSuggestionClick = (id: string) => {
    setIsFocused(false);
    router.push(`/species/${id}`);
  };

  const handlePopularSearch = (value: string) => {
    setQuery(value);
    setIsFocused(true);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-900 py-28 text-white">

      {/* Motif arrière-plan */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-10
          bg-[radial-gradient(#10b981_1px,transparent_1px)]
          [background-size:16px_16px]
        "
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center">

        {/* Badge */}
        <div
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-700/50
            bg-emerald-800/60
            px-4
            py-1.5
            text-sm
            font-medium
            text-emerald-200
            backdrop-blur-md
          "
        >
          <Trees className="h-4 w-4 text-emerald-400" />

          <span>
            Biodiversité & Forêts
          </span>
        </div>

        {/* Titre */}
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Explorer les{" "}

          <span
            className="
              bg-gradient-to-r
              from-emerald-400
              to-teal-300
              bg-clip-text
              text-transparent
            "
          >
            arbres forestiers
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-lg
            font-light
            text-emerald-100/90
            md:text-xl
          "
        >
          Une plateforme moderne et interactive dédiée à
          l&apos;identification et à la découverte des
          espèces forestières.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">

          <div className="relative">

            {/* Barre */}
            <div
              className="
                flex
                items-center
                rounded-2xl
                border
                border-white/20
                bg-white/10
                p-2
                shadow-2xl
                backdrop-blur-md
                transition-all
                focus-within:border-emerald-400
                focus-within:bg-white/20
              "
            >

              <Search
                className="
                  ml-3
                  h-5
                  w-5
                  shrink-0
                  text-emerald-300
                "
              />

              {/* Input */}
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }

                  if (e.key === "Escape") {
                    setIsFocused(false);
                  }
                }}
                type="text"
                placeholder="Rechercher une espèce..."
                className="
                  w-full
                  bg-transparent
                  px-4
                  py-2
                  text-base
                  text-white
                  outline-none
                  placeholder:text-emerald-200/60
                "
              />

              {/* Loader suggestions */}
              {suggestions.isFetching && (
                <Loader2
                  className="
                    mr-3
                    h-5
                    w-5
                    shrink-0
                    animate-spin
                    text-emerald-300
                  "
                />
              )}

              {/* Bouton */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={!canSearch || isSearching}
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-xl
                  bg-emerald-500
                  px-5
                  py-2.5
                  font-semibold
                  text-emerald-950
                  shadow-lg
                  transition-all
                  hover:bg-emerald-400
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isSearching ? "Recherche..." : "Explorer"}

                {!isSearching && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>

            {showDropdown && (
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-full
                  z-50
                  mt-2
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-emerald-950/95
                  text-left
                  shadow-2xl
                  backdrop-blur-xl
                "
              >

                {/* Chargement */}
                {suggestions.isLoading && (
                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      p-6
                      text-center
                      text-emerald-200
                    "
                  >
                    <Loader2
                      className="
                        mb-2
                        h-5
                        w-5
                        animate-spin
                      "
                    />
                    Recherche en cours...
                  </div>
                )}

                {/* Erreur */}
                {suggestions.isError && (
                  <div className="p-5 text-center text-red-300">
                    Une erreur est survenue lors de la
                    recherche. Veuillez réessayer.
                  </div>
                )}

                {/* Résultats */}
                {!suggestions.isLoading &&
                  !suggestions.isError &&
                  suggestions.data?.length > 0 && (
                    <div className="py-2">

                      {suggestions.data?.map((species) => {

                        const image =
                          species.images?.[0]?.url;

                        return (
                          <button
                            key={species.id}
                            type="button"
                            onMouseDown={(event) => {
                              event.preventDefault();

                              handleSuggestionClick(
                                species.id,
                              );
                            }}
                            className="
                              flex
                              w-full
                              items-center
                              gap-4
                              px-4
                              py-3
                              text-left
                              transition
                              hover:bg-white/10
                            "
                          >

                            {/* Image */}
                            <div
                              className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-lg
                                bg-emerald-900
                              "
                            >
                              {image ? (
                                <Image
                                  src={image}
                                  alt={
                                    species.canonicalName
                                  }
                                  width={48}
                                  height={48}
                                  className="
                                    h-full
                                    w-full
                                    object-cover
                                  "
                                />
                              ) : (
                                <Leaf
                                  className="
                                    h-5
                                    w-5
                                    text-emerald-400
                                  "
                                />
                              )}
                            </div>

                            {/* Informations */}
                            <div className="min-w-0">

                              <p
                                className="
                                  truncate
                                  font-semibold
                                  text-white
                                "
                              >
                                {species.canonicalName}
                              </p>

                              <p
                                className="
                                  truncate
                                  text-sm
                                  italic
                                  text-emerald-300
                                "
                              >
                                {species.scientificName}
                              </p>

                              {species.genus && (
                                <p
                                  className="
                                    text-xs
                                    text-emerald-200/60
                                  "
                                >
                                  Genre :{" "}
                                  {species.genus.name}
                                </p>
                              )}

                            </div>

                          </button>
                        );
                      })}

                    </div>
                  )}

                {/* Aucun résultat */}
                {/* {!suggestions.isLoading &&
                  !suggestions.isError &&
                  suggestions.data?.length === 0 && (
                    <div className="p-5">
                      <p
                        className="
                          mt-1
                          text-sm
                          text-emerald-300
                        "
                      >
                        Cliquez sur « Explorer » pour
                        rechercher cette espèce dans GBIF.
                      </p>

                    </div>
                  )} */}

              </div>
            )}

          </div>

          {/* ========================= */}
          {/* SUGGESTIONS POPULAIRES */}
          {/* ========================= */}

          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              text-xs
              text-emerald-200/80
            "
          >
            <span className="font-medium">
              Populaires :
            </span>

            {[
              "Khaya senegalensis",
              "Vitellaria paradoxa",
              "Adansonia digitata",
            ].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handlePopularSearch(name)}
                className="
                  cursor-pointer
                  rounded-full
                  bg-emerald-900/60
                  px-3
                  py-1
                  transition
                  hover:bg-emerald-800
                "
              >
                {name}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}