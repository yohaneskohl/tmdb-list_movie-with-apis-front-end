import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import AuthProvider, { AuthContext } from "../assets/components/context/AuthProvider";
import GoogleCallback from "../pages/GoogleCallback";

// Private Route Component
const PrivateRoute = ({ element }) => {
  const { user } = React.useContext(AuthContext);
  return user ? element : <Navigate to="/" replace />;
};

const App = () => {
  const [activeModal, setActiveModal] = useState(null); // null, 'login', 'register'

  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-900 min-h-screen text-white">
          {/* Navbar */}
          <Navbar setActiveModal={setActiveModal} />

          <main className="px-2 py-1 min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<EntertainmentList />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              <Route path="/google-callback" element={<GoogleCallback />} />
            </Routes>
          </main>

          <Footer />

          {/* Modal Login & Register */}
          {activeModal === "login" && <LoginModal setActiveModal={setActiveModal} />}
          {activeModal === "register" && <RegisterModal setActiveModal={setActiveModal} />}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
