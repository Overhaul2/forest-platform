import Image from "next/image";
import { Species } from "@/app/types/species";

export default function SpeciesGrid({ species }: { species: Species[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {species.map((s) => (
        <div key={s.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            src={s.images[0]?.url || "/placeholder.png"}
            alt={s.scientificName}
            width={400}
            height={192}
            unoptimized
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{s.scientificName}</h3>
            <p className="text-gray-600">{s.canonicalName}</p>
            <p className="text-gray-600">
              {s.genus.name} ({s.genus.family.name})
            </p>
            <ul className="mt-2">
              {s.vernacularNames.map((vn, index) => (
                <li key={index} className="text-gray-500">
                  {vn.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}