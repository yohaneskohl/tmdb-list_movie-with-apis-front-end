import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTimes, FaSearch, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const MobileSidebar = ({
  menuOpen,
  setMenuOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  user,
  handleLogout,
  setActiveModal,
  setActiveButton,
}) => {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      setShouldRender(true);
      setTimeout(() => setIsMounted(true), 10); // next tick
    } else {
      setIsMounted(false);
      const timeout = setTimeout(() => setShouldRender(false), 300); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ease-in-out ${
        isMounted ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40"
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`relative w-3/4 max-w-xs bg-gray-900 p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMounted ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <FaTimes size={20} />
        </button>

        {/* Logo */}
        <div className="text-indigo-500 text-2xl font-bold mb-6">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Movie<span className="text-red-500">list</span>
          </Link>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-4"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded-full"
          >
            <FaSearch className="text-white" />
          </button>
        </form>

        {/* Menu Links */}
        <div className="flex flex-col space-y-3">
          <Link
            to="/"
            className={`${
              isActive("/") ? "text-blue-500 font-bold" : "text-white"
            } hover:text-blue-500 py-2 rounded-md text-lg transition-all duration-300`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className={`${
              isActive("/movies") ? "text-blue-500 font-bold" : "text-white"
            } hover:text-blue-500 py-2 rounded-md text-lg transition-all duration-300`}
            onClick={() => setMenuOpen(false)}
          >
            Movies
          </Link>
          <Link
            to="/tv-shows"
            className={`${
              isActive("/tv-shows") ? "text-blue-500 font-bold" : "text-white"
            } hover:text-blue-500 py-2 rounded-md text-lg transition-all duration-300`}
            onClick={() => setMenuOpen(false)}
          >
            TV Shows
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className={`${
                  isActive("/profile") ? "text-blue-500 font-bold" : "text-white"
                } hover:text-blue-500 py-2 rounded-md text-lg transition-all duration-300`}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-left text-white hover:text-blue-500 py-2 rounded-md text-lg transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setActiveModal("login");
                  setActiveButton("login");
                  setMenuOpen(false);
                }}
                className="text-white hover:text-blue-500 text-left py-2 rounded-md text-lg flex items-center gap-2 transition-all duration-300"
              >
                <FaSignInAlt /> Login
              </button>
              <button
                onClick={() => {
                  setActiveModal("register");
                  setActiveButton("register");
                  setMenuOpen(false);
                }}
                className="text-white hover:text-blue-500 text-left py-2 rounded-md text-lg flex items-center gap-2 transition-all duration-300"
              >
                <FaUserPlus /> Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
