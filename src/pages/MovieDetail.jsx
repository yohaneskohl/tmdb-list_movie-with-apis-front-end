// src/pages/MovieDetail.jsx

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../services/tmdb/tmdbService"; // sesuaikan path-nya

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movieDetail", id],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) return <p className="text-center text-gray-400 pt-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500 pt-20">Error loading movie details.</p>;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Background Image */}
      <div className="relative w-full h-[550px] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover brightness-50"
        />
        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-2 text-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-400">star</span> {movie.vote_average} 
            <span className="material-symbols-outlined">calendar_today</span> {movie.release_date}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Movie Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />

          {/* Movie Info */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300">{movie.overview}</p>
            
            {/* Buttons */}
            <div className="mt-6 flex space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                WATCH TRAILER
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2">
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
