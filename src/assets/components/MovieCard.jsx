import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="w-full h-[300px] object-cover rounded-lg"
        />
        <h3 className="text-lg font-semibold mt-4">{movie.title || movie.name}</h3>
        <p className="text-gray-400">⭐ {movie.vote_average}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
