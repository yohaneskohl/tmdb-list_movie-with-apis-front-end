import React from "react";
import MovieCard from "./MovieCard";

const MovieSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="px-8 py-12">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-5 gap-6">
        {items.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
