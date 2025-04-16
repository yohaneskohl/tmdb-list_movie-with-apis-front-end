// redux/indexRedux
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth/authReducer";
import movieReducer from "../redux/reducer/movie/movieReducer";
import tvShowReducer from "../redux/reducer/tvshow/tvShowReducer";
import searchReducer from "../redux/reducer/search/searchReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  tvshow: tvShowReducer,
  search: searchReducer,
});

export default rootReducer;
