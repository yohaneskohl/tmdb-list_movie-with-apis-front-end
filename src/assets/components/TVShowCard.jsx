import React from "react";

const TVShowCard = ({ show }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer flex flex-col justify-between">
      <img
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        className="w-full h-[180px] sm:h-[220px] object-cover rounded-lg mb-4" // ✅ Ukuran gambar dikurangi
      />
      <div className="flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold truncate">{show.name}</h3>
        <p className="text-gray-400 text-sm mt-2">⭐ {show.vote_average}</p>
      </div>
    </div>
  );
};

export default TVShowCard;
