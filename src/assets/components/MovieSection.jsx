import React from "react";
import MovieCard from "./MovieCard";

const MovieSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section>
      {/* Judul section */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>

      {/* Grid untuk Movie Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {items.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
