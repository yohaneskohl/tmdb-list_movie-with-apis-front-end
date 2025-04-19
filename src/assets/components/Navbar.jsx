import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, syncAuthFromCookies } from "../../redux/action/authActions";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ setActiveModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Reset active button saat route berubah
  useEffect(() => {
    setActiveButton(""); // Reset active button saat route berubah
  }, [location.pathname]);

  // Tutup modal otomatis jika user berhasil login
  useEffect(() => {
    if (user) {
      setActiveModal(null); // Menutup modal login/register jika user sudah login
      setActiveButton(""); // Reset active button setelah login
    }
  }, [user, setActiveModal]); // Dependency hanya pada user dan setActiveModal

  // Cek perubahan pada cookie atau status login/logout
  useEffect(() => {
    const handleAuthChange = () => {
      // Force re-render atau dispatch untuk update state user
      dispatch(syncAuthFromCookies());
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/"); // Redirect ke home setelah logout
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

        {/* Search Bar */}
        <div className="w-1/3">
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

        {/* Navigation */}
        <div className="flex space-x-4 items-center">
          <Link to="/" className="text-white hover:text-red-500">Home</Link>
          <Link to="/movies" className="text-white hover:text-red-500">Movies</Link>
          <Link to="/tv-shows" className="text-white hover:text-red-500">TV Shows</Link>

          {user ? (
            <div className="flex space-x-3 items-center">
              <Link to="/profile" className="text-white hover:text-red-500">Profile</Link>
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
    </nav>
  );
};

export default Navbar;
