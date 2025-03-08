import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMoviesAndTVShows } from "../utils/http";
import MovieCard from "../assets/components/MovieCard";
import TVShowCard from "../assets/components/TVShowCard";

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const queryParams = useQueryParams();
  const searchQuery = queryParams.get("q");

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchResults", searchQuery],
    queryFn: () => searchMoviesAndTVShows(searchQuery),
    enabled: !!searchQuery,
  });

  if (isLoading) return <p className="text-center text-gray-400 pt-20">Loading...</p>;

  return (
    <div className="bg-black min-h-screen text-white px-4 pt-20 pb-32">
  
      <h2 className="text-3xl font-bold mb-4"> Search Results for "{searchQuery}"</h2>

      {searchResults?.movies?.length > 0 && (
        <div>
          <h3 className="text-2xl mb-2">🎬 Movies</h3>
          <div className="grid grid-cols-5 gap-6">
            {searchResults.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {searchResults?.tvShows?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl mb-2">📺 TV Shows</h3>
          <div className="grid grid-cols-5 gap-6">
            {searchResults.tvShows.map((show) => (
              <TVShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      )}

      {searchResults?.movies?.length === 0 && searchResults?.tvShows?.length === 0 && (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;




