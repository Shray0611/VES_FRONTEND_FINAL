import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      if (storedName.endsWith("@ves.ac.in")) {
        const namePart = storedName.split("@")[0].split(".").slice(1).join(".");
        const formattedName = namePart
          .split(".")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");
        setDisplayName(formattedName || "User");
      } else {
        setDisplayName(storedName);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="bg-[#f5f1e6] fixed top-0 left-0 w-full shadow-md z-50 border-b-2 border-[#e0c9a9]">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Section - Logo & Links */}
        <div className="flex items-center space-x-6 ml-4">
          {/* Logo */}
          <img src="/assets/VES-logo.png" alt="Logo" className="h-14 w-auto" />
          <span className="text-[#5f4b32] font-bold text-lg">
            <b>VESIT</b>
          </span>

          {/* Home Page Link */}
          <span
            onClick={() => navigate("/user-home")}
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
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src="/assets/usericon.jpg"
              alt="User Icon"
              className="h-10 w-10 rounded-full border-2 border-[#e0c9a9] shadow-sm"
            />
            <span className="text-[#5f4b32] font-semibold text-lg">
              {displayName}
            </span>
          </div>

          <span
            onClick={handleLogout}
            className="text-[#5f4b32] hover:bg-[#e0c9a9] border border-[#e0c9a9] px-4 py-2 rounded-lg cursor-pointer transition-all duration-200"
          >
            Log Out
          </span>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
