// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google"; 
import App from "./routes/App";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import "./assets/css/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { CookieKeys, CookieStorage } from "./utils/Cookies";
import { apiClient } from "./utils/apiClient";
import { setToken, setUser } from "./redux/reducer/auth/authReducer";

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// ✅ Sinkronisasi awal auth dari cookies
const token = CookieStorage.get(CookieKeys.AuthToken);
const user = CookieStorage.get(CookieKeys.User);

if (token && user) {
  store.dispatch(setToken(token));
  store.dispatch(setUser(user));
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  store.dispatch(setToken(null));
  store.dispatch(setUser(null));
  delete apiClient.defaults.headers.common["Authorization"];
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
          <ToastContainer />
        </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
