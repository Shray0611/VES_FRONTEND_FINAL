import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b-2 border-[#e0c9a9] transition-all duration-300 ${
        isScrolled
          ? "bg-[#f5f1e6]/80 backdrop-blur-md h-14 shadow-md"
          : "bg-[#f5f1e6] h-16"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-[#5f4b32] font-bold text-lg">
            VESIT E-Certificate
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/about"
              className="text-[#7d6954] hover:text-[#5f4b32] transition-colors"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-[#7d6954] hover:text-[#5f4b32] transition-colors"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-[#7d6954] hover:text-[#5f4b32] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-[#5f4b32] text-white px-4 py-2 rounded-md hover:bg-[#e0c9a9] transition-all flex items-center gap-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Login
          </Link>

          <Link
            to="/signup"
            className="border border-[#5f4b32] text-[#5f4b32] px-4 py-2 rounded-md hover:bg-[#e0c9a9] transition-all flex items-center gap-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
