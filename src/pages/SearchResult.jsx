import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMoviesAndTVShows } from "../services/tmdb/tmdbService";
import MovieCard from "../assets/components/MovieCard";
import TVShowCard from "../assets/components/TVShowCard";
import { API_ENDPOINT } from "../utils/tmdbClient";

// Helper untuk ambil query param
const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const queryParams = useQueryParams();
  const searchQuery = queryParams.get("q");


  const { data: searchResults, isLoading, isError } = useQuery({
    queryKey: [[API_ENDPOINT.SEARCH_MOVIE, API_ENDPOINT.SEARCH_TV], { query: searchQuery }],
    queryFn: searchMoviesAndTVShows,
    enabled: !!searchQuery,
  });
  

  if (!searchQuery) {
    return (
      <div className="text-center text-gray-400 pt-20">
        Please enter a search term.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 pt-20">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 pt-20">
        Something went wrong while fetching data.
      </div>
    );
  }

  const hasMovies = searchResults?.movies?.length > 0;
  const hasTVShows = searchResults?.tvShows?.length > 0;

  return (
    <div className="bg-black min-h-screen text-white px-4 pt-20 pb-32">
      <h2 className="text-3xl font-bold mb-4">
        Search Results for &quot;{searchQuery}&quot;
      </h2>

      {hasMovies && (
        <div>
          <h3 className="text-2xl mb-2">🎬 Movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {searchResults.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {hasTVShows && (
        <div className="mt-8">
          <h3 className="text-2xl mb-2">📺 TV Shows</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {searchResults.tvShows.map((show) => (
              <TVShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      )}

      {!hasMovies && !hasTVShows && (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
