// src/routes/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/reducer/auth/authReducer";
import { CookieKeys, CookieStorage } from "../utils/Cookies";
import { apiClient } from "../utils/apiClient";

// Komponen
import Navbar from "../assets/components/Navbar";
import EntertainmentList from "../pages/EntertainmentList";
import Footer from "../assets/components/Footer";
import Profile from "../assets/components/Profile";
import Movies from "../pages/Movies";
import TVShows from "../pages/TVShows";
import SearchResults from "../pages/SearchResult";
import MovieDetail from "../pages/MovieDetail";
import LoginModal from "../pages/LoginModal";
import RegisterModal from "../pages/RegisterModal";
import GoogleCallback from "../pages/GoogleCallback";
import PrivateRoute from "../assets/components/private/PrivateRoute";

// 
const syncAuthFromCookies = (dispatch) => {
  const token = CookieStorage.get(CookieKeys.AuthToken);
  const user = CookieStorage.get(CookieKeys.User);

  console.log("🔄 Sync from cookies:", { token, user });

  if (token && user) {
    dispatch(setToken(token));
    dispatch(setUser(user));
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    dispatch(setToken(null));
    dispatch(setUser(null));
    delete apiClient.defaults.headers.common["Authorization"];
  }
};


const App = () => {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(null);

  // ✅ Cuma dengarkan event "authChange"
  useEffect(() => {
    syncAuthFromCookies(dispatch); // pertama kali load
  
    const handleAuthChange = () => {
      syncAuthFromCookies(dispatch); // setiap kali event terjadi
    };
  
    window.addEventListener("authChange", handleAuthChange);
  
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [dispatch]);
  

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar setActiveModal={setActiveModal} />

        <main className="px-2 py-1 min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<EntertainmentList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/google-callback" element={<GoogleCallback />} />

            {/* Private Route */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>

        <Footer />

        {/* Modal Login & Register */}
        {activeModal === "login" && <LoginModal setActiveModal={setActiveModal} />}
        {activeModal === "register" && <RegisterModal setActiveModal={setActiveModal} />}
      </div>
    </Router>
  );
};

export default App;
