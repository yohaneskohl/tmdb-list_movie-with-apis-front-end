import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-72 px-4">
      <h1 className="text-4xl font-bold mb-4 text-white">404 - Page Not Found</h1>
      <p className="text-gray-400 mb-6">Halaman yang kamu cari tidak tersedia atau belum dibuat.</p>
      <Link to="/" className="text-blue-400 hover:underline">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
