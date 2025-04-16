import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_TMDB_URL = process.env.REACT_APP_BASE_TMDB_URL;

export const tmdbClient = axios.create({
  baseURL: BASE_TMDB_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const API_ENDPOINT = {
  NOW_PLAYING: "/movie/now_playing",
  ON_THE_AIR: "/tv/on_the_air",
  SEARCH_MOVIE: "/search/movie",
  SEARCH_TV: "/search/tv",
  MOVIE_DETAIL: (id) => `/movie/${id}`,
};
