import React from "react";
import TVShowCard from "./TVShowCard";

const TVShowSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section>
      {/* Judul section */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>

      {/* Grid untuk TV Show Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {items.map((show) => (
          <TVShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  );
};

export default TVShowSection;
