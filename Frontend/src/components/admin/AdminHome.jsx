import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assets/VES-logo.png"; // adjust the path as needed

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar - Kept original styling */}
      <nav className="bg-[#f5f1e6] fixed top-0 left-0 w-full shadow-md z-50 border-b-2 border-[#e0c9a9]">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-6 ml-4">
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-auto cursor-pointer"
              onClick={() => navigate("/admin-home")}
            />
            <div className="text-[#5f4b32] font-bold text-lg">
              <b>VESIT Admin</b>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/assets/usericon.jpg"
                  alt="User Icon"
                  className="h-10 w-10 rounded-full border-2 border-[#e0c9a9] shadow-sm"
                />
                <span className="text-[#5f4b32] font-semibold text-lg">
                  Super Admin
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Enhanced sections */}
      <div className="pt-24 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Issuers List */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Issuers List
              </h2>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {["VRC", "E CELL", "CSI", "ISTE", "IEEE"].length} Active
              </span>
            </div>

            <ul className="space-y-3">
              {["VRC", "E CELL", "CSI", "ISTE", "IEEE"].map((issuer, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center ${
                        index % 3 === 0
                          ? "bg-red-100 text-red-600"
                          : index % 3 === 1
                          ? "bg-amber-100 text-amber-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      <span className="font-medium">{issuer.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-gray-700">{issuer}</span>
                  </div>
                  <button className="text-gray-500 hover:text-red-600 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mt-6">
              <button className="bg-[#5f4b32] hover:bg-[#4a3a27] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                View All
              </button>
            </div>
          </div>

          {/* Enhanced Add Issuer Form */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Add New Issuer
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuer Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all"
                    placeholder="e.g. Cultural Committee"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all"
                    placeholder="contact@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all"
                  placeholder="Brief description about the issuer..."
                  rows="3"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#5f4b32] hover:bg-[#4a3a27] text-white rounded-lg font-medium transition-colors"
                >
                  Add Issuer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
