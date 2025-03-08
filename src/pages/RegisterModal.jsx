import React, { useState, useContext } from "react";
import { AuthContext } from "../assets/components/context/AuthProvider";

const RegisterModal = ({ setShowLogin, setShowRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password harus sama!");
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      setShowRegister(false);
      setShowLogin(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-white"
          onClick={() => setShowRegister(false)}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            id="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none"
            required
          />
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

          <input
            type="password"
            id="confirmPassword"
            placeholder="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
