// src/services/tmdb/tmdbServices.js

import { tmdbClient, endpoints } from "../../utils/tmdbClient";

// Now Playing Movies
export const fetchNowPlayingMovies = async (page = 1) => {
  const { data } = await tmdbClient.get(`${endpoints.movies}/now_playing`, {
    params: { language: "en-US", page },
  });
  return {
    movies: data.results || [],
    totalPages: data.total_pages || 1,
  };
};

// On The Air TV Shows
export const fetchOnTheAirTVShows = async (page = 1) => {
  const { data } = await tmdbClient.get(`${endpoints.tv}/on_the_air`, {
    params: { language: "en-US", page },
  });
  return {
    shows: data.results || [],
    totalPages: data.total_pages || 1,
  };
};

// Movie & TV Search
export const searchMoviesAndTVShows = async (query, page = 1) => {
  const [movies, tvShows] = await Promise.all([
    tmdbClient.get(`${endpoints.search}/movie`, {
      params: { query, language: "en-US", page },
    }),
    tmdbClient.get(`${endpoints.search}/tv`, {
      params: { query, language: "en-US", page },
    }),
  ]);

  return {
    movies: movies.data.results || [],
    tvShows: tvShows.data.results || [],
  };
};

// Movie Detail by ID
export const fetchMovieDetails = async (id) => {
  const { data } = await tmdbClient.get(`${endpoints.movies}/${id}`, {
    params: { language: "en-US" },
  });
  return data;
};
