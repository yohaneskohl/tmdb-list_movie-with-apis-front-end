import { createSlice } from "@reduxjs/toolkit";
import { CookieKeys, CookieStorage } from "../../../utils/Cookies";

const initialState = {
  user: CookieStorage.get(CookieKeys.User) || null,
  token: CookieStorage.get(CookieKeys.AuthToken) || null,
  isLoading: false, // ✅ ini harus 'isLoading' biar konsisten
};


const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  
});

export const { setToken, setUser, setLoading } = authReducer.actions;
export default authReducer.reducer;