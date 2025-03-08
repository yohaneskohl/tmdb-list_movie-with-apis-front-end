import React from "react";

const TVShowCard = ({ show }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        className="w-full h-[300px] object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-4">{show.name}</h3>
      <p className="text-gray-400">⭐ {show.vote_average}</p>
    </div>
  );
};

export default TVShowCard;
