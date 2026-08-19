import Link from "next/link";

interface Props {
  current: number;
  total: number;
}

export default function Pagination({
  current,
  total,
}: Props) {
  return (
    <div className="mt-10 flex justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <Link
          key={index}
          href={`/species?page=${index + 1}`}
          className={`rounded px-4 py-2 ${
            current === index + 1
              ? "bg-green-700 text-white"
              : "border"
          }`}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
}