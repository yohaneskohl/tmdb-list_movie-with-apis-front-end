import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetail } from "../redux/action/movieActions";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { movieDetail, isLoadingDetail } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovieDetail(id));
  }, [dispatch, id]);

  if (isLoadingDetail || !movieDetail) {
    return <p className="text-center text-gray-400 pt-20">Loading...</p>;
  }

  const movie = movieDetail;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero / Banner */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-20 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-2 text-sm sm:text-base flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-yellow-400">star</span>
              {movie.vote_average}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined">calendar_today</span>
              {movie.release_date}
            </span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />

          {/* Overview + Buttons */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-300 text-sm sm:text-base">{movie.overview}</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                WATCH TRAILER
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">playlist_add</span>
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
