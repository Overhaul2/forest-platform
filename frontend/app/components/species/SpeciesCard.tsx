import Link from "next/link";
import Image from "next/image";
import { Trees } from "lucide-react";
import { Species } from "@/app/types/species";

interface Props {
  species: Species;
}

export default function SpeciesCard({ species }: Props) {
  const image =
    species.images.length > 0
      ? species.images[0].url
      : "/images/no-image.jpg";

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow transition hover:shadow-lg">
      <div className="relative h-52 w-full">
        <Image
          src={image}
          alt={species.scientificName}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-lg font-bold italic">
          {species.scientificName}
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Trees size={18} />
          {species.genus.family.name}
        </div>

        {species.vernacularNames.length > 0 && (
          <p className="text-sm text-gray-500">
            {species.vernacularNames[0].name}
          </p>
        )}

        <Link
          href={`/species/${species.id}`}
          className="inline-block rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
}