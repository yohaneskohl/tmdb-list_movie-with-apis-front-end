import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

const Navbar = ({ setShowLogin, setShowRegister }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [authUser, setAuthUser] = useState(user);

  useEffect(() => {
    setAuthUser(user); // Update state lokal ketika user berubah
  }, [user]); // Dependensi user dari context

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthUser(user); // Update navbar ketika event "authChange" terjadi
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full py-4 px-6 z-50">
      <div className="max-w-full mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-red-500">
          <span className="font-extrabold">Movie</span>list
        </Link>

        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="What do you want to watch?"
            className="w-full bg-transparent border border-red-400 rounded-full px-4 py-2 text-white focus:outline-none focus:ring focus:ring-red-500 placeholder-white placeholder-opacity-75"
          />
        </div>

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
                onClick={() => setShowLogin(true)}
                className="border border-red-500 px-5 py-2 rounded-full text-white transition duration-300 hover:bg-red-600 hover:border-red-600"
              >
                Login
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="bg-red-600 px-5 py-2 rounded-full text-white transition duration-300 hover:bg-red-700"
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
