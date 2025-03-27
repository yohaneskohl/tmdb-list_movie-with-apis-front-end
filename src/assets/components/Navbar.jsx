import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { FaSearch } from "react-icons/fa"; 

const Navbar = ({ setActiveModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [authUser, setAuthUser] = useState(user);
  const [activeButton, setActiveButton] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setAuthUser(user);
  }, [user]);

  useEffect(() => {
    setActiveButton(null);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setActiveButton(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full py-4 px-6 z-50">
      <div className="max-w-full mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold font-spotify text-red-500">
          <span className="font-extrabold">Movie</span>list
        </Link>

        {/* Modern Search Bar */}
        <div className="w-1/3">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-900 border border-gray-700 rounded-full px-4 py-2 transition duration-300 focus-within:ring-2 focus-within:ring-red-500"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows..."
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-full transition duration-300"
            >
              <FaSearch className="text-white" />
            </button>
          </form>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 items-center">
          <Link to="/" className="text-white hover:text-red-500 transition duration-300">Home</Link>
          <Link to="/movies" className="text-white hover:text-red-500 transition duration-300">Movies</Link>
          <Link to="/tv-shows" className="text-white hover:text-red-500 transition duration-300">TV Shows</Link>

          {authUser ? (
            <div className="flex space-x-3 items-center">
              <Link to="/profile" className="text-white hover:text-red-500 transition duration-300">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-white transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-3 items-center">
              <button
                onClick={() => {
                  setActiveModal("login");
                  setActiveButton("login");
                }}
                className={`px-5 py-2 rounded-full transition duration-300 border ${
                  activeButton === "login"
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-red-500 text-white hover:bg-red-600 hover:border-red-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setActiveModal("register");
                  setActiveButton("register");
                }}
                className={`px-5 py-2 rounded-full transition duration-300 ${
                  activeButton === "register"
                    ? "bg-red-600 text-white"
                    : "bg-transparent border border-red-500 text-white hover:bg-red-600 hover:border-red-600"
                }`}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
