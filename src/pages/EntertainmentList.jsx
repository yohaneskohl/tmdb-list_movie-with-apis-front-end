import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingMovies } from "../redux/action/movieActions";
import { getOnTheAirTVShows } from "../redux/action/tvShowActions";
import MovieCard from "../assets/components/MovieCard";
import MovieSlider from "../assets/components/MovieSlider";
import Pagination from "../assets/components/Pagination";
import TVShowSection from "../assets/components/TVShowSection";

const EntertainmentList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const {
    nowPlaying,
    totalPages: movieTotalPages,
    isLoading: isLoadingMovies,
  } = useSelector((state) => state.movie);

  const {
    tvOnTheAir,
    tvTotalPages,
    isLoadingTVOnTheAir: isLoadingTVShows,
  } = useSelector((state) => state.tvshow);

  useEffect(() => {
    dispatch(getNowPlayingMovies(page));
    dispatch(getOnTheAirTVShows(page));
  }, [dispatch, page]);

  if (isLoadingMovies || isLoadingTVShows) {
    return <p className="text-center text-gray-400 py-12">Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Slider */}
      <MovieSlider movies={nowPlaying.slice(0, 10)} />

      {/* Content */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10">
        {/* Now Playing Movies */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          🔥 Now Playing Movies
        </h2>

        {/* Grid Responsif untuk Movie */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {nowPlaying.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* TV Show Section */}
        <div className="mt-12">
          <TVShowSection title="📺 On Air TV Shows" items={tvOnTheAir} />
        </div>

        {/* Pagination */}
        <div className="mt-10">
          <Pagination
            page={page}
            totalPages={Math.max(movieTotalPages, tvTotalPages)}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default EntertainmentList;
