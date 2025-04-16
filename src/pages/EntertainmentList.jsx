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
    tvOnTheAir, // ✅ ambil state ini, bukan `setTVOnTheAir`
    tvTotalPages,
    isLoadingTVOnTheAir: isLoadingTVShows,
  } = useSelector((state) => state.tvshow); // pastikan `tvshow` sesuai dengan key di `combineReducers`

  useEffect(() => {
    dispatch(getNowPlayingMovies(page));
    dispatch(getOnTheAirTVShows(page));
  }, [dispatch, page]);

  if (isLoadingMovies || isLoadingTVShows) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <MovieSlider movies={nowPlaying.slice(0, 10)} />

      <div className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6">🔥 Now Playing Movies</h2>
        <div className="grid grid-cols-5 gap-6">
          {nowPlaying.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <TVShowSection title="📺 On Air TV Shows" items={tvOnTheAir} />

        <Pagination
          page={page}
          totalPages={Math.max(movieTotalPages, tvTotalPages)}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default EntertainmentList;
