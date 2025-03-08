import React, { useState, useEffect } from "react";

const MovieSlider = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover brightness-50"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
            <h1 className="text-5xl font-bold max-w-3xl">{movie.title}</h1>
            <p className="text-lg text-gray-300 mt-4 max-w-2xl">
              {movie.overview.length > 150
                ? `${movie.overview.substring(0, 150)}...`
                : movie.overview}
            </p>
            <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 max-w-fit">
              <span className="material-symbols-outlined">play_circle</span>
              WATCH TRAILER
            </button>
          </div>
        </div>
      ))}

      {/* Slider Indicator - Garis tipis */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, idx) => (
          <span
            key={idx}
            className={`w-8 h-1 ${
              activeIndex === idx ? "bg-red-600" : "bg-gray-500"
            } transition-all`}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
