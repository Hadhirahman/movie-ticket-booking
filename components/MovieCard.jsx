import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <Link
      href={`/movies/${movie._id}`}
      className="block w-[180px] select-none"
    >
      <div className="relative overflow-hidden rounded-lg shadow-sm">
        <Image
          src={movie.poster}            
          alt={movie.title}
          width={400}
          height={600}
          sizes="180px"
          className="h-[270px] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-2">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {movie.title}
        </h3>
        <p className="truncate text-xs text-gray-500">
          {movie.description} 
        </p>
      </div>
    </Link>
  );
}