import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../redux/action/authActions"; // sesuaikan path-nya jika beda

const RegisterModal = ({ setActiveModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

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
      await dispatch(registerUserAction(formData));
      setActiveModal("login");
    } catch (err) {
      setError(err.message || "Register gagal");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-gray-900 w-full max-w-sm p-6 sm:p-8 rounded-lg shadow-lg relative border border-gray-700">
        {/* Tombol close */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition duration-300"
          onClick={() => setActiveModal(null)}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-6">
          Register
        </h2>

        {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4" autoComplete="on">
          <div>
            <label htmlFor="name" className="text-gray-300 block mb-1 text-sm sm:text-base">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInput}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-300 block mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInput}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-300 block mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInput}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-gray-300 block mb-1 text-sm sm:text-base">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInput}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 text-sm sm:text-base font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400 text-sm sm:text-base">
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
