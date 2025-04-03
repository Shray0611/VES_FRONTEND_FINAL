import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assets/VES-logo.png"; // adjust the path as needed

const IssuerNavbar = ({ onLogout, handleQuery }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#f5f1e6] fixed top-0 left-0 w-full shadow-md z-50 border-b-2 border-[#e0c9a9]">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-6 ml-4 ">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-auto cursor-pointer"
            onClick={() => navigate("/issuer-home")}
          />
          <div className="text-[#5f4b32] font-bold text-lg">
            <b>VESIT</b>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span
              onClick={() => navigate("/issuer-home")}
              className="text-[#7d6954] hover:text-[#5f4b32] cursor-pointer transition-colors"
            >
              Home
            </span>
            <span
              onClick={() => navigate("/view-template")}
              className="text-[#7d6954] hover:text-[#5f4b32] cursor-pointer transition-colors"
            >
              Templates
            </span>
            <span
              onClick={() => navigate("/issuer-records")}
              className="text-[#7d6954] hover:text-[#5f4b32] cursor-pointer transition-colors"
            >
              Records
            </span>
            <span
              onClick={() => navigate("/guidelines")}
              className="text-[#7d6954] hover:text-[#5f4b32] cursor-pointer transition-colors"
            >
              Guidelines
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] px-4 py-2 rounded-lg font-medium transition-colors">
            Create
          </button>

          <span
            onClick={() => navigate("/complaints-view")}
            className="text-[#7d6954] hover:text-[#5f4b32] cursor-pointer relative p-2 rounded-full hover:bg-[#e0c9a9] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </span>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="/assets/usericon.jpg"
                alt="User Icon"
                className="h-10 w-10 rounded-full border-2 border-[#e0c9a9] shadow-sm"
              />
              <span className="text-[#5f4b32] font-semibold text-lg">
                Council Name
              </span>
            </div>{" "}
            <span
              onClick={() => navigate("/")}
              className="text-[#5f4b32] hover:bg-[#e0c9a9] border border-[#e0c9a9] px-4 py-2 rounded-lg cursor-pointer transition-all duration-200"
            >
              Log Out
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default IssuerNavbar;
