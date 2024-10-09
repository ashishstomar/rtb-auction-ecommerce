import React, { useState } from "react";
import { Link } from "react-router-dom"; // Using react-router-dom's Link for navigation
import {
  FaBars,
  FaGavel,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa"; // Import React Icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For handling mobile menu state

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div>
            <Link
              to="/home"
              className="flex items-center space-x-2 gap-2 text-2xl font-semibold"
            >
              <FaGavel className="w-6 h-6" />
              <h2>E-AUCTION</h2>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-indigo-200">
              Home
            </Link>
            <Link to="/about" className="hover:text-indigo-200">
              About
            </Link>
            <Link to="/services" className="hover:text-indigo-200">
              Services
            </Link>
            <Link to="/contact" className="hover:text-indigo-200">
              Contact
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="hidden md:flex space-x-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:text-indigo-200 text-xl" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="hover:text-indigo-200 text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-indigo-200 text-xl" />
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-700 text-white rounded-lg space-y-4 py-4 px-6">
            <Link to="/" className="block hover:text-indigo-200">
              Home
            </Link>
            <Link to="/about" className="block hover:text-indigo-200">
              About
            </Link>
            <Link to="/services" className="block hover:text-indigo-200">
              Services
            </Link>
            <Link to="/contact" className="block hover:text-indigo-200">
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
