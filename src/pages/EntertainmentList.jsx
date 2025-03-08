import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNowPlayingMovies, fetchOnTheAirTVShows } from "../utils/http";
import MovieCard from "../assets/components/MovieCard";
import MovieSlider from "../assets/components/MovieSlider";
import Pagination from "../assets/components/Pagination";
import TVShowSection from "../assets/components/TVShowSection";

const EntertainmentList = () => {
  const [page, setPage] = useState(1);

  // Fetch Movies (dapat diakses tanpa login)
  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["nowPlayingMovies", page],
    queryFn: () => fetchNowPlayingMovies(page),
    keepPreviousData: true, // Agar data sebelumnya tetap ada saat fetch baru
  });

  // Fetch TV Shows (dapat diakses tanpa login)
  const { data: tvShowData, isLoading: isLoadingTVShows } = useQuery({
    queryKey: ["onTheAirTVShows", page],
    queryFn: () => fetchOnTheAirTVShows(page),
    keepPreviousData: true, 
  });

  if (isLoadingMovies || isLoadingTVShows) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Movie Slider */}
      <MovieSlider movies={movieData?.movies?.slice(0, 10) || []} />

      {/* Now Playing Movies Section */}
      <div className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6">🔥 Now Playing Movies</h2>
        <div className="grid grid-cols-5 gap-6">
          {movieData?.movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* On Air TV Shows Section */}
        <TVShowSection title="📺 On Air TV Shows" items={tvShowData?.shows || []} />

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={Math.max(movieData?.totalPages || 1, tvShowData?.totalPages || 1)}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default EntertainmentList;
