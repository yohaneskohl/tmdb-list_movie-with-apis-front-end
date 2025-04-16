// redux/reducer/movie/movieReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: [],
  totalPages: 1,
  isLoading: false,
  movieDetail: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setMovieTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
    setLoadingMovieNowPlaying: (state, action) => {
      state.isLoading = action.payload;
    },

    setLoadingMovieDetail: (state, action) => {
      state.isLoadingDetail = action.payload;
    },
  },
});

export const {
  setMovieNowPlaying,
  setMovieTotalPages,
  setMovieDetail,
  setLoadingMovieNowPlaying,
  setLoadingMovieDetail,
} = movieSlice.actions;

export default movieSlice.reducer;
