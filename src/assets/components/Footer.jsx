/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Link Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
          <div className="space-y-2">
            <a href="#" className="hover:underline block">FAQ</a>
            <a href="#" className="hover:underline block">Investor Relations</a>
            <a href="#" className="hover:underline block">Privacy</a>
            <a href="#" className="hover:underline block">Speed Test</a>
          </div>
          <div className="space-y-2">
            <a href="#" className="hover:underline block">Help Center</a>
            <a href="#" className="hover:underline block">Jobs</a>
            <a href="#" className="hover:underline block">Cookie Preferences</a>
            <a href="#" className="hover:underline block">Legal Notices</a>
          </div>
          <div className="space-y-2">
            <a href="#" className="hover:underline block">Account</a>
            <a href="#" className="hover:underline block">Ways to Watch</a>
            <a href="#" className="hover:underline block">Corporate Information</a>
            <a href="#" className="hover:underline block">Only on Netflix</a>
          </div>
          <div className="space-y-2">
            <a href="#" className="hover:underline block">Media Center</a>
            <a href="#" className="hover:underline block">Terms of Use</a>
            <a href="#" className="hover:underline block">Contact Us</a>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-4">
          <select className="bg-gray-800 text-gray-400 p-2 rounded">
            <option>🌐 English</option>
            <option>🌐 Bahasa Indonesia</option>
          </select>
        </div>

        {/* Copyright */}
        <p className="text-sm">© 2025 Netflix Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
