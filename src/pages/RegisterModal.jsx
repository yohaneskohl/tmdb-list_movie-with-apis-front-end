import React, { useState, useContext } from "react";
import { AuthContext } from "../assets/components/context/AuthProvider";
import { FaTimes } from "react-icons/fa";

const RegisterModal = ({ setActiveModal }) => {
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
      setActiveModal("login"); // Pindah ke modal login setelah registrasi sukses
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 relative border border-gray-700">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition duration-300"
          onClick={() => setActiveModal(null)}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Register
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-gray-300 block mb-1">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInput}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-300 block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInput}
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
              value={formData.password}
              onChange={handleInput}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-gray-300 block mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInput}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-400">
          Sudah punya akun?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setActiveModal("login")}
          >
            Login di sini
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
