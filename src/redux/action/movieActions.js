// redux/actions/movieActions.js
import { tmdbClient, API_ENDPOINT } from "../../utils/tmdbClient";
import {
  setMovieNowPlaying,
  setMovieDetail,
  setMovieTotalPages,
  setLoadingMovieNowPlaying,
} from "../reducer/movie/movieReducer";

export const getNowPlayingMovies = (page = 1) => async (dispatch) => {
  dispatch(setLoadingMovieNowPlaying(true));
  try {
    const res = await tmdbClient.get(API_ENDPOINT.NOW_PLAYING, {
      params: { language: "en-US", page },
    });

    dispatch(setMovieNowPlaying(res.data.results || []));
    dispatch(setMovieTotalPages(res.data.total_pages || 1));
  } catch (err) {
    console.error("Failed to fetch now playing movies:", err);
  } finally {
    dispatch(setLoadingMovieNowPlaying(false));
  }
};

export const getMovieDetail = (id) => async (dispatch) => {
  try {
    const res = await tmdbClient.get(API_ENDPOINT.MOVIE_DETAIL(id), {
      params: { language: "en-US" },
    });

    dispatch(setMovieDetail(res.data));
  } catch (err) {
    console.error("Failed to fetch movie detail:", err);
  }
};
