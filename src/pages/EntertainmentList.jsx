import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchNowPlayingMovies,
  fetchOnTheAirTVShows,
} from "../services/tmdb/tmdbService";
import MovieCard from "../assets/components/MovieCard";
import MovieSlider from "../assets/components/MovieSlider";
import Pagination from "../assets/components/Pagination";
import TVShowSection from "../assets/components/TVShowSection";
import { API_ENDPOINT } from "../utils/tmdbClient";

const EntertainmentList = () => {
  const [page, setPage] = useState(1);

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: [API_ENDPOINT.NOW_PLAYING, { page }],
    queryFn: fetchNowPlayingMovies,
    keepPreviousData: true,
  });

  const { data: tvShowData, isLoading: isLoadingTVShows } = useQuery({
    queryKey: [API_ENDPOINT.ON_THE_AIR, { page }],
    queryFn: fetchOnTheAirTVShows,
    keepPreviousData: true,
  });

  if (isLoadingMovies || isLoadingTVShows) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <MovieSlider movies={movieData?.movies?.slice(0, 10) || []} />

      <div className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6">🔥 Now Playing Movies</h2>
        <div className="grid grid-cols-5 gap-6">
          {movieData?.movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <TVShowSection
          title="📺 On Air TV Shows"
          items={tvShowData?.shows || []}
        />

        <Pagination
          page={page}
          totalPages={Math.max(
            movieData?.totalPages || 1,
            tvShowData?.totalPages || 1
          )}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default EntertainmentList;
