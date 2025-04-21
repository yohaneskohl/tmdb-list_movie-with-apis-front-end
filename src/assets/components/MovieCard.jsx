import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer flex flex-col justify-between">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="w-full h-[180px] sm:h-[220px] object-cover rounded-lg mb-4" // ✅ Ukuran gambar dikurangi
        />
        <div className="flex flex-col h-full">
          <h3 className="text-base sm:text-lg font-semibold truncate">{movie.title || movie.name}</h3>
          <p className="text-gray-400 text-sm mt-2">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
