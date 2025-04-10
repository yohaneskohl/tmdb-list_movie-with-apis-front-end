// redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../indexRedux";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
