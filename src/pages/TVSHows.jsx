import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOnTheAirTVShows } from "../utils/http";
import TVShowCard from "../assets/components/TVShowCard"; // Sesuaikan dengan komponen TV Show
import Pagination from "../assets/components/Pagination";

const TVShows = () => {
  const [page, setPage] = useState(1);

  const { data: tvShowData, isLoading } = useQuery({
    queryKey: ["onTheAirTVShows", page],
    queryFn: () => fetchOnTheAirTVShows(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="bg-black min-h-screen text-white px-4 pt-20">
      <h2 className="text-3xl font-bold mb-6">📺 On Air TV Shows</h2>
      <div className="grid grid-cols-5 gap-6">
        {tvShowData?.shows?.map((show) => (
          <TVShowCard key={show.id} show={show} />
        ))}
      </div>

      <div className="mt-8">
        <Pagination page={page} totalPages={tvShowData?.totalPages || 1} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default TVShows;
