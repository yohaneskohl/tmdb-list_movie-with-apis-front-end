import { tmdbClient, endpoints } from "../../utils/tmdbClient";

export const fetchNowPlayingMovies = async (page = 1) => {
  const { data } = await tmdbClient.get(`${endpoints.movies}/now_playing?language=en-US&page=${page}`);
  return {
    movies: data.results || [],
    totalPages: data.total_pages || 1,
  };
};

export const fetchOnTheAirTVShows = async (page = 1) => {
  const { data } = await tmdbClient.get(`${endpoints.tv}/on_the_air?language=en-US&page=${page}`);
  return {
    shows: data.results || [],
    totalPages: data.total_pages || 1,
  };
};

export const searchMoviesAndTVShows = async (query, page = 1) => {
  const [movies, tvShows] = await Promise.all([
    tmdbClient.get(`${endpoints.search}/movie?query=${query}&language=en-US&page=${page}`),
    tmdbClient.get(`${endpoints.search}/tv?query=${query}&language=en-US&page=${page}`),
  ]);

  return {
    movies: movies.data.results || [],
    tvShows: tvShows.data.results || [],
  };
};
