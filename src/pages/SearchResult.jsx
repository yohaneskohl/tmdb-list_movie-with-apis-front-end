import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchContent } from "../redux/action/searchActions";
import MovieCard from "../assets/components/MovieCard";
import TVShowCard from "../assets/components/TVShowCard";

// Helper ambil query dari URL
const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const queryParams = useQueryParams();
  const searchQuery = queryParams.get("q");

  const dispatch = useDispatch();

  const { searchResults } = useSelector((state) => state.search);
  const { movies, tvShows } = searchResults;

  useEffect(() => {
    dispatch(searchContent({ query: searchQuery }));
  }, [dispatch, searchQuery]);

  const hasMovies = movies?.length > 0;
  const hasTVShows = tvShows?.length > 0;

  if (!searchQuery) {
    return (
      <div className="text-center text-gray-400 pt-20">
        Please enter a search term.
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-4 pt-20 pb-32">
      <h2 className="text-3xl font-bold mb-4">
        Search Results for &quot;{searchQuery}&quot;
      </h2>

      {hasMovies && (
        <section>
          <h3 className="text-2xl mb-2">🎬 Movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {hasTVShows && (
        <section className="mt-8">
          <h3 className="text-2xl mb-2">📺 TV Shows</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {tvShows.map((show) => (
              <TVShowCard key={show.id} show={show} />
            ))}
          </div>
        </section>
      )}

      {!hasMovies && !hasTVShows && (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
