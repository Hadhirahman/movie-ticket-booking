"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await api.get(`/movies/${id}`);
        setMovie(data);
      } catch (err) {
        alert("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading movie...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
     <section
           className="relative mx-auto flex max-w-[1440px] items-center
             min-h-[480px] w-[92%] py-10 rounded-xl
             bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `
      linear-gradient(90deg,
        rgba(26,26,26,0.95) 25%,
        rgba(26,26,26,0.85) 40%,
        rgba(26,26,26,0.2) 100%
      ),
      url(${movie.poster})
    `,
         }}
       >
         <div className="flex flex-col md:flex-row items-center gap-10 px-10 w-full">
   
         
           <div className="rounded-2xl overflow-hidden shadow-lg">
             <Image
               src={movie.poster}
               alt={movie.title}
               width={220}
               height={330}
               className="object-cover"
             />
           </div>
   
       
           <div className="text-white flex-1">
             <h1 className="text-3xl md:text-4xl font-bold">
               {movie.title}
             </h1>
   
                    <BookingForm movie={movie} />
   
           
             <div className="mt-3 text-sm text-gray-300">
              Duration in minutes: {movie.duration}
             </div>
           </div>
         </div>
       </section>
  );
}