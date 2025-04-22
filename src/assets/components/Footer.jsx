import React from "react";
import { Link } from "react-router-dom";
import { FaGlobe, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm mb-8 text-left">
          <div className="space-y-3">
            <Link to="/faq" className="block hover:text-white transition">FAQ</Link>
            <Link to="/investors" className="block hover:text-white transition">Investor Relations</Link>
            <Link to="/privacy" className="block hover:text-white transition">Privacy</Link>
            <Link to="/speed-test" className="block hover:text-white transition">Speed Test</Link>
          </div>
          <div className="space-y-3">
            <Link to="/help" className="block hover:text-white transition">Help Center</Link>
            <Link to="/jobs" className="block hover:text-white transition">Jobs</Link>
            <Link to="/cookies" className="block hover:text-white transition">Cookie Preferences</Link>
            <Link to="/legal" className="block hover:text-white transition">Legal Notices</Link>
          </div>
          <div className="space-y-3">
            <Link to="/account" className="block hover:text-white transition">Account</Link>
            <Link to="/watch" className="block hover:text-white transition">Ways to Watch</Link>
            <Link to="/corporate" className="block hover:text-white transition">Corporate Info</Link>
            <Link to="/exclusive" className="block hover:text-white transition">Exclusive Content</Link>
          </div>
          <div className="space-y-3">
            <Link to="/media" className="block hover:text-white transition">Media Center</Link>
            <Link to="/terms" className="block hover:text-white transition">Terms of Use</Link>
            <Link to="/contact" className="block hover:text-white transition">Contact Us</Link>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-6 flex items-center space-x-2 bg-gray-800 text-gray-400 p-2 sm:p-3 rounded w-max cursor-pointer hover:bg-gray-700 transition text-xs sm:text-sm">
          <FaGlobe className="text-base sm:text-lg" />
          <select className="bg-transparent text-gray-400 focus:outline-none cursor-pointer">
            <option className="text-black">English</option>
            <option className="text-black">Bahasa Indonesia</option>
          </select>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-4 text-lg text-gray-400">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition"><FaInstagram /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition"><FaYoutube /></a>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-gray-500 text-center">© 2025 MovieList. Made by kevindev.</p>
      </div>
    </footer>
  );
};

export default Footer;
