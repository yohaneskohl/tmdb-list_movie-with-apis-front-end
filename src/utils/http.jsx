import axios from "axios";
import { GET_DATA_MOVIES } from "../services/tmdb/movies/get-data-movies";
import { GET_DATA_TVSHOWS } from "../services/tmdb/tvshows/get-data-tvshows";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_MOVIE_URL = process.env.REACT_APP_BASE_MOVIE_URL;
const BASE_TV_URL = process.env.REACT_APP_BASE_TV_URL;
const BASE_SEARCH_URL = process.env.REACT_APP_BASE_SEARCH_URL;

/**
 * Fetch Now Playing Movies
 */
export const fetchNowPlayingMovies = async (page = 1) => {
  try {
    const { data } = await axios.get(
      `${BASE_MOVIE_URL}${GET_DATA_MOVIES.NOW_PLAYING}?language=en-US&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return {
      movies: data.results || [],
      totalPages: data.total_pages || 1,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { movies: [], totalPages: 1 };
  }
};

/**
 * Fetch On The Air TV Shows
 */
export const fetchOnTheAirTVShows = async (page = 1) => {
  try {
    const { data } = await axios.get(
      `${BASE_TV_URL}${GET_DATA_TVSHOWS.ON_THE_AIR}?language=en-US&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return {
      shows: data.results || [],
      totalPages: data.total_pages || 1,
    };
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return { shows: [], totalPages: 1 };
  }
};

/**
 * Search Movies and TV Shows
 */
export const searchMoviesAndTVShows = async (query, page = 1) => {
  try {
    const [movieResponse, tvResponse] = await Promise.all([
      axios.get(`${BASE_SEARCH_URL}/movie?query=${query}&language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
      axios.get(`${BASE_SEARCH_URL}/tv?query=${query}&language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }),
    ]);

    return {
      movies: movieResponse.data.results || [],
      tvShows: tvResponse.data.results || [],
    };
  } catch (error) {
    console.error("Error searching movies and TV shows:", error);
    return { movies: [], tvShows: [] };
  }
};
