import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaGavel,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve user information from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-5">
          <div>
            <Link
              to="/home"
              className="flex items-center space-x-2 gap-2 text-2xl font-semibold"
            >
              <FaGavel className="w-6 h-6" />
              <h2>E-AUCTION</h2>
            </Link>
          </div>

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

          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                <span className="text-white">
                  Hi, {user.fullName || "User"}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded-md text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signin" className="bg-blue-500 px-3 py-1 rounded-md">
                Login
              </Link>
            )}
          </div>

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

            {user ? (
              <>
                <span>Welcome, {user.fullName || "User"}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 w-full py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="block bg-blue-500 w-full py-2 rounded-md text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
