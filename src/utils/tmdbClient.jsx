import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_MOVIE_URL = process.env.REACT_APP_BASE_MOVIE_URL;
const BASE_TV_URL = process.env.REACT_APP_BASE_TV_URL;
const BASE_SEARCH_URL = process.env.REACT_APP_BASE_SEARCH_URL;

export const tmdbClient = axios.create({
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const endpoints = {
  movies: BASE_MOVIE_URL,
  tv: BASE_TV_URL,
  search: BASE_SEARCH_URL,
};
