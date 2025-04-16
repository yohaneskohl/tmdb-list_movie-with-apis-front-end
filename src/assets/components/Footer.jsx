import React from "react";
import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-sm mb-10">
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
            <Link to="/corporate" className="block hover:text-white transition">Corporate Information</Link>
            <Link to="/exclusive" className="block hover:text-white transition">Exclusive Content</Link>
          </div>
          <div className="space-y-3">
            <Link to="/media" className="block hover:text-white transition">Media Center</Link>
            <Link to="/terms" className="block hover:text-white transition">Terms of Use</Link>
            <Link to="/contact" className="block hover:text-white transition">Contact Us</Link>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-8 flex items-center space-x-2 bg-gray-800 text-gray-400 p-3 rounded w-max cursor-pointer hover:bg-gray-700 transition">
          <FaGlobe className="text-lg" />
          <select className="bg-transparent text-gray-400 focus:outline-none cursor-pointer">
            <option className="text-black">English</option>
            <option className="text-black">Bahasa Indonesia</option>
          </select>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center">© 2025 MovieList. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
