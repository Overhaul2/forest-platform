interface Props {
  searchParams: {
    search?: string;
    family?: string;
    genus?: string;
  };
}

export default function FilterSidebar({ searchParams }: Props) {
  return (
    <aside className="rounded-xl border bg-white p-5 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        Filtres
      </h2>

      <div className="space-y-4">
        <input
          defaultValue={searchParams.search}
          placeholder="Nom scientifique"
          className="w-full rounded border p-2"
        />

        <input
          defaultValue={searchParams.family}
          placeholder="Famille"
          className="w-full rounded border p-2"
        />

        <input
          defaultValue={searchParams.genus}
          placeholder="Genre"
          className="w-full rounded border p-2"
        />

        <button className="w-full rounded bg-green-700 py-2 text-white">
          Filtrer
        </button>
      </div>
    </aside>
  );
}