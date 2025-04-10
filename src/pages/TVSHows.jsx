import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnTheAirTVShows } from "../redux/action/tvShowActions";
import TVShowCard from "../assets/components/TVShowCard";
import Pagination from "../assets/components/Pagination";

const TVShows = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    tvOnTheAir,
    isLoadingTVOnTheAir,
    tvTotalPages,
  } = useSelector((state) => state.tvshow);

  useEffect(() => {
    dispatch(getOnTheAirTVShows(page));
  }, [dispatch, page]);

  if (isLoadingTVOnTheAir) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white px-4 pt-20 pb-10">
      <h2 className="text-3xl font-bold mb-6">📺 On Air TV Shows</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {tvOnTheAir?.map((show) => (
          <TVShowCard key={show.id} show={show} />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          page={page}
          totalPages={tvTotalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default TVShows;
