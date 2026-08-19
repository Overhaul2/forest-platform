"use client";

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Globe2,
  Leaf,
  Ruler,
  Trees,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useSpecies } from "@/app/hooks/useSpecies";

interface SpeciesDetailProps {
  id: string;
}

export default function SpeciesDetail({
  id,
}: SpeciesDetailProps) {
  const {
    data: species,
    isLoading,
    isError,
  } = useSpecies(id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-44 rounded-full bg-slate-200" />

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="h-[380px] rounded-3xl bg-slate-200" />

              <div className="space-y-5">
                <div className="h-8 w-1/3 rounded-full bg-slate-200" />
                <div className="h-12 w-3/4 rounded bg-slate-200" />
                <div className="h-6 w-1/2 rounded bg-slate-200" />
                <div className="h-32 rounded-2xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !species) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center p-8 rounded-3xl bg-white shadow-xl border border-slate-100 max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Trees className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Espèce introuvable
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Cette espèce n&apos;existe pas dans notre base de données.
          </p>

          <Link
            href="/"
            className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-700/30"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux espèces
          </Link>
        </div>
      </main>
    );
  }

  const mainImage =
    species.images?.[0]?.url ??
    "/images/species-placeholder.jpg";

  const vernacularNames =
    species.vernacularNames ?? [];

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20">

      {/* Header moderne & Bouton Retour stylisé */}
      <section className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/species"
            className="group inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-x-0.5 hover:bg-emerald-100 hover:shadow"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-emerald-600" />
            <span>Retour aux espèces</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-emerald-700 font-semibold">{species.canonicalName}</span>
          </div>
        </div>
      </section>

      {/* Présentation principale avec cadre image soigné */}
      <section className="bg-gradient-to-b from-white to-slate-50/50 pt-10 pb-16 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Image dans un joli cadre moderne (ni trop grand ni trop lourd) */}
            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative rounded-3xl bg-white p-3.5 shadow-xl shadow-slate-200/50 border border-slate-100/80 transition-transform duration-300 hover:shadow-2xl">
                <div className="relative h-[360px] sm:h-[400px] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={mainImage}
                    alt={species.scientificName}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Badge flottant sur l'image */}
                  <div className="absolute bottom-4 left-4 rounded-xl bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white border border-white/10">
                    Photo principale
                  </div>
                </div>
              </div>
            </div>

            {/* Informations principales */}
            <div className="flex flex-col justify-center space-y-4">

              <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200/50">
                <Leaf className="h-3.5 w-3.5" />
                {species.rank}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {species.canonicalName}
              </h1>

              <p className="text-lg italic text-slate-500 font-medium">
                {species.scientificName}
              </p>

              {species.scientificAuthor && (
                <p className="text-xs text-slate-400 font-light">
                  Auteur : {species.scientificAuthor}
                </p>
              )}

              <div className="mt-4 rounded-2xl border border-emerald-100/80 bg-emerald-50/60 p-5 shadow-sm backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700">
                    <Leaf className="h-5 w-5 shrink-0" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900 text-base">
                      Classification botanique
                    </h2>
                    <div className="mt-2 space-y-1 text-sm text-slate-600">
                      <p>
                        Famille :{" "}
                        <strong className="text-slate-900">
                          {species.genus?.family?.name ?? "—"}
                        </strong>
                      </p>
                      <p>
                        Genre :{" "}
                        <strong className="text-slate-900">
                          {species.genus?.name ?? "—"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Contenu secondaire (Noms, Caractéristiques, Phénologie, Description, Galerie, Sources) */}
      <div className="mx-auto max-w-7xl px-6 space-y-12 mt-12">

        {/* Noms vernaculaires */}
        <section className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
              <Globe2 className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Noms vernaculaires
            </h2>
          </div>

          {vernacularNames.length === 0 ? (
            <p className="text-sm text-slate-500 italic">
              Aucun nom vernaculaire enregistré pour cette espèce.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2.5">
              {vernacularNames.map((name: any) => (
                <div
                  key={name.id}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-2 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  <span className="font-semibold text-slate-800 text-sm">
                    {name.name}
                  </span>
                  {name.language && (
                    <span className="ml-2 rounded-md bg-slate-200/60 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                      {name.language}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Caractéristiques */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Caractéristiques morphologiques
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            <InfoCard
              icon={<Ruler className="h-6 w-6" />}
              title="Hauteur"
              value={
                species.heightMin || species.heightMax
                  ? `${species.heightMin ?? "—"} – ${species.heightMax ?? "—"} m`
                  : "Non renseignée"
              }
            />
            <InfoCard
              icon={<Ruler className="h-6 w-6" />}
              title="Diamètre"
              value={
                species.diameterMin || species.diameterMax
                  ? `${species.diameterMin ?? "—"} – ${species.diameterMax ?? "—"} cm`
                  : "Non renseigné"
              }
            />
            <InfoCard
              icon={<Trees className="h-6 w-6" />}
              title="Densité du bois"
              value={
                species.woodDensity
                  ? `${species.woodDensity} kg/m³`
                  : "Non renseignée"
              }
            />
          </div>
        </section>

        {/* Phénologie */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Phénologie
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <InfoCard
              icon={<Calendar className="h-6 w-6" />}
              title="Floraison"
              value={
                species.floweringPeriod ?? "Non renseignée"
              }
            />
            <InfoCard
              icon={<Calendar className="h-6 w-6" />}
              title="Fructification"
              value={
                species.fruitingPeriod ?? "Non renseignée"
              }
            />
          </div>
        </section>

        {/* Description */}
        {species.description && (
          <section className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Description
              </h2>
            </div>
            <p className="leading-relaxed text-slate-600 text-base">
              {species.description}
            </p>
          </section>
        )}

        {/* Galerie */}
        {species.images?.length > 1 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Galerie photos
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {species.images.map((image: any) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100 transition duration-300 hover:shadow-md"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={image.url}
                      alt={image.title ?? species.scientificName}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  {image.creator && (
                    <div className="p-4 text-xs font-medium text-slate-500 bg-slate-50/50">
                      © {image.creator}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        <section className="rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 p-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Sources et Références
          </h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              Données taxonomiques :
              <strong className="ml-1 text-slate-900">GBIF</strong>
            </p>
            <p>
              Identifiant GBIF :
              <strong className="ml-1 text-slate-900">
                {species.gbifId ?? "—"}
              </strong>
            </p>
            {species.images?.map((image: any) =>
              image.references ? (
                <p key={image.id}>
                  <a
                    href={image.references}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Voir la source de l'image
                  </a>
                </p>
              ) : null
            )}
          </div>
        </section>

      </div>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 transition duration-300 hover:shadow-md">
      <div className="mb-4 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-600">
        {icon}
      </div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-lg font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}