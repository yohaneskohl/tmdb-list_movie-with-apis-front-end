import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAction,
  syncAuthFromCookies,
} from "../../redux/action/authActions";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import MobileDrawer from "./Mobile/MobileSidebar";

const Navbar = ({ setActiveModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setActiveButton("");
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      setActiveModal(null);
      setActiveButton("");
    }
  }, [user, setActiveModal]);

  useEffect(() => {
    const handleAuthChange = () => {
      dispatch(syncAuthFromCookies());
    };
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setMenuOpen(false);
    }
  };

  // Function to check if current location is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full py-4 px-6 z-50">
      <div className="max-w-full mx-auto flex justify-between items-center">
        {/* Logo and Hamburger (Mobile) */}
        <div className="flex items-center justify-between w-full md:hidden">
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition duration-300"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <Link
              to="/"
              className="text-2xl font-bold font-spotify text-red-500 ml-3"
            >
              <span className="font-extrabold">Movie</span>list
            </Link>
          </div>
        </div>

        {/* Logo (Desktop) */}
        <div className="hidden md:block">
          <Link to="/" className="text-3xl font-bold font-spotify text-red-500">
            <span className="font-extrabold">Movie</span>list
          </Link>
        </div>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:block w-1/3">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-900 border border-gray-700 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-red-500"
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
              className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-full"
            >
              <FaSearch className="text-white" />
            </button>
          </form>
        </div>

        {/* Menu (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className={`${
              isActive("/") ? "text-blue-500" : "text-white"
            } hover:text-blue-500`}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className={`${
              isActive("/movies") ? "text-blue-500" : "text-white"
            } hover:text-blue-500`}
          >
            Movies
          </Link>
          <Link
            to="/tv-shows"
            className={`${
              isActive("/tv-shows") ? "text-blue-500" : "text-white"
            } hover:text-blue-500`}
          >
            TV Shows
          </Link>

          {user ? (
            <div className="flex space-x-3 items-center">
              <Link
                to="/profile"
                className={`${
                  isActive("/profile") ? "text-red-500" : "text-white"
                } hover:text-red-500`}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-white"
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
                className={`px-5 py-2 rounded-full border ${
                  activeButton === "login"
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-red-500 text-white hover:bg-red-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setActiveModal("register");
                  setActiveButton("register");
                }}
                className={`px-5 py-2 rounded-full ${
                  activeButton === "register"
                    ? "bg-red-600 text-white"
                    : "border border-red-500 text-white hover:bg-red-600"
                }`}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        user={user}
        handleLogout={handleLogout}
        setActiveModal={setActiveModal}
        setActiveButton={setActiveButton}
      />
    </nav>
  );
};

export default Navbar;
