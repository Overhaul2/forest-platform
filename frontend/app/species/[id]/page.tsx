import SpeciesDetail from "@/app/components/species/espece.detail";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function SpeciesPage({ params }: Props) {
  const { id } = await params;

  return <SpeciesDetail id={id} />;
}