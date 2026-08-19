import FilterSidebar from "../components/species/FilterSidebar";
import Pagination from "../components/species/paginate";
import SpeciesGrid from "../components/species/SpeciesGrid";
import { getSpecies } from "../services/species.service";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    family?: string;
    genus?: string;
  }>;
}

export default async function SpeciesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const result = await getSpecies({
    page,
    limit: 12,
    search: params.search,
    family: params.family,
    genus: params.genus,
  });

  return (
    <main className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-10">
      <div className="col-span-3">
        <FilterSidebar searchParams={params} />
      </div>

      <div className="col-span-9">
        <h1 className="mb-6 text-3xl font-bold">
          Espèces forestières
        </h1>

        <SpeciesGrid species={result.data} />

        <Pagination
          current={result.page}
          total={result.totalPages}
        />
      </div>
    </main>
  );
}