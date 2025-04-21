import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingMovies } from "../redux/action/movieActions";
import MovieCard from "../assets/components/MovieCard";
import Pagination from "../assets/components/Pagination";

const Movies = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { nowPlaying, isLoading, totalPages } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(getNowPlayingMovies(page));
  }, [dispatch, page]);

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white px-4 pt-20 pb-10">
      <h2 className="text-3xl font-bold mb-6">🔥 Now Playing Movies</h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {nowPlaying?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="mt-8">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Movies;
