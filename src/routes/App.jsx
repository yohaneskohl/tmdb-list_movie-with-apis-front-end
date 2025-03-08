import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../assets/components/Navbar";
import EntertainmentList from "../pages/EntertainmentList";
import Footer from "../assets/components/Footer";
import Profile from "../assets/components/Profile";
import Movies from "../pages/Movies";
import TVShows from "../pages/TVSHows";
import SearchResults from "../pages/SearchResult";
import MovieDetail from "../pages/MovieDetail";
import LoginModal from "../pages/LoginModal";
import RegisterModal from "../pages/RegisterModal";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        {/* Navbar yang bisa membuka modal */}
        <Navbar setShowLogin={setShowLogin} setShowRegister={setShowRegister} />

        <main className="px-2 py-1 min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<EntertainmentList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <Footer />

        {/* Pop-up Login Modal */}
        {showLogin && (
          <LoginModal
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />
        )}

        {/* Pop-up Register Modal */}
        {showRegister && (
          <RegisterModal
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
