import React, { useState, useContext } from "react";
import { AuthContext } from "../assets/components/context/AuthProvider";
import { FaGoogle, FaTimes } from "react-icons/fa";

const LoginModal = ({ setActiveModal }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      setActiveModal(null);
      window.dispatchEvent(new Event("authChange"));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BASE_BACKEND_URL}/auth/google/callback`;
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 relative border border-gray-700">
        {/* Tombol Close */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition duration-300"
          onClick={() => setActiveModal(null)}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
          <div>
            <label htmlFor="email" className="text-gray-300 block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              autoComplete="email"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-300 block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          type="button"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition duration-300"
          onClick={handleGoogleLogin}
        >
          <FaGoogle />
          Login dengan Google
        </button>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-400">
          Belum punya akun?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setActiveModal("register")}
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
