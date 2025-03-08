import React, { useState, useContext } from "react";
import { AuthContext } from "../assets/components/context/AuthProvider";

const LoginModal = ({ setShowLogin, setShowRegister }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      setShowLogin(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-white"
          onClick={() => setShowLogin(false)}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none"
            required
          />
          <input
            type="password"
            id="password"
            name="new-password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Belum punya akun?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
