import React from "react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    navigate("/"); // Navigate to the landing page after logout
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full shadow-md z-50 border-b-2 border-[#015f4c]">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Section - Logo & Buttons */}
        <div className="left-section flex items-center space-x-6 ml-4"> {/* Added ml-4 to shift left */}
          {/* Logo */}
          <img src="/vesit-logo.png" alt="Logo" className="h-8 w-auto" /> 
          <span className="text-black font-bold text-lg"> <b>VESIT</b> </span>

          {/* Home Page Button */}
          <button onClick={() => navigate("/home")} className="deep-sea-blue">
            Home Page
          </button>

          {/* View Complaints Button */}
          <button onClick={() => navigate("/complaints")} className="deep-sea-blue">
            View Complaints
          </button>
        </div>

        {/* Right Section - User Info & Logout */}
        <div className="right-section flex items-center space-x-3">
          {/* User Icon & Name */}
          <img src="/user-icon.png" alt="User Icon" className="h-6 w-6" /> 
          <span className="text-black font-bold text-lg"> <b>Name</b> </span>

          {/* Log Out Button */}
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        </div>

      </div>
    </nav>
  );
};

export default UserNavbar;
