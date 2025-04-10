// redux/reducer/tvshow/tvShowReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tvOnTheAir: [],
  tvTotalPages: 1,
  isLoadingTVOnTheAir: false,
};

const tvShowSlice = createSlice({
  name: "tvshow",
  initialState,
  reducers: {
    setTVOnTheAir: (state, action) => {
      state.tvOnTheAir = action.payload;
    },
    setTVTotalPages: (state, action) => {
      state.tvTotalPages = action.payload;
    },
    setLoadingTVOnTheAir: (state, action) => {
      state.isLoadingTVOnTheAir = action.payload;
    },
  },
});

export const {
  setTVOnTheAir,
  setTVTotalPages,
  setLoadingTVOnTheAir,
} = tvShowSlice.actions;

export default tvShowSlice.reducer;
