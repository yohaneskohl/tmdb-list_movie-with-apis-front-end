import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNowPlayingMovies } from "../services/tmdb/tmdbService";
import MovieCard from "../assets/components/MovieCard";
import Pagination from "../assets/components/Pagination";

const Movies = () => {
  const [page, setPage] = useState(1);

  const { data: movieData, isLoading } = useQuery({
    queryKey: ["nowPlayingMovies", page],
    queryFn: () => fetchNowPlayingMovies(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="bg-black min-h-screen text-white px-4 pt-20 pb-10">
      <h2 className="text-3xl font-bold mb-6">🔥 Now Playing Movies</h2>
      <div className="grid grid-cols-5 gap-6">
        {movieData?.movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="mt-8">
        <Pagination page={page} totalPages={movieData?.totalPages || 1} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Movies;
