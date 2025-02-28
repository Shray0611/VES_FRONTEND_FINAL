import React from "react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    navigate("/"); // Navigate to the landing page after logout
  };

  return (
    <nav className="bg-[#f5f1e6] fixed top-0 left-0 w-full shadow-md z-50 border-b-2 border-[#e0c9a9]">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Section - Logo & Links */}
        <div className="flex items-center space-x-6 ml-4">
          {/* Logo */}
          <img src="./assets/VES-logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-[#5f4b32] font-bold text-lg">
            {" "}
            <b>VESIT</b>{" "}
          </span>

          {/* Home Page Link */}
          <span
            onClick={() => navigate("/home")}
            className="text-[#7d6954] hover:text-[#5f4b32] cursor-pointer transition-colors"
          >
            Home Page
          </span>

          {/* View Complaints Link */}
          <span
            onClick={() => navigate("/complaints")}
            className="text-[#7d6954] hover:text-[#5f4b32] cursor-pointer transition-colors"
          >
            View Complaints
          </span>
        </div>

        {/* Right Section - User Info & Logout */}
        <div className="flex items-center space-x-3">
          {/* User Icon & Name */}
          <img src="/user-icon.png" alt="User Icon" className="h-6 w-6" />
          <span className="text-[#5f4b32] font-bold text-lg">
            {" "}
            <b>Name</b>{" "}
          </span>

          {/* Log Out Link */}
          <span
            onClick={handleLogout}
            className="text-[#5f4b32] hover:bg-[#e0c9a9] border border-[#e0c9a9] px-4 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Log Out
          </span>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
