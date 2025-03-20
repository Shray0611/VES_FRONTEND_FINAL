import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8e5c5] to-[#f1d5a4]">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 grid gap-8">
        <Navbar onLogout={handleLogout} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#e0c9a9]">
            <h1 className="text-4xl font-bold text-[#5f4b32] mb-6">
              Create Professional Certificates Effortlessly
            </h1>
            <p className="text-[#7d6954] text-lg mb-8">
              Transform your recognition process with our seamless
              e-certification platform for education, awards, and special
              occasions.
            </p>

            {/* Test buttons for navigation */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => navigate("/issuer-home")}
                className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Go to Issuer Dashboard
              </button>
            </div>
          </div>

          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <img
              src="/assets/welcome_img.png"
              alt="welcome certi"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=" flex items-center justify-center rounded-2xl">
            <img
              src="/assets/excel_pic.png"
              alt="Excel type image"
              className="max-w-full max-h-[250px] object-contain rounded-lg"
            />
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#e0c9a9]">
            <h2 className="text-3xl  font-bold text-[#5f4b32] mb-4">
              Instant Digital Delivery
            </h2>
            <p className="text-[#7d6954]">
              Securely issue and distribute verifiable certificates with
              real-time tracking and immediate access for recipients.
            </p>
          </div>
        </div>

        {/* Template Gallery Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#e0c9a9]">
          <h2 className="text-3xl font-semibold text-[#5f4b32] text-center mb-8">
            Template Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="group relative">
                <img
                  src={`/assets/templates/certi_demo_${num}.png`}
                  alt={`Template ${num}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-[#5f4b32] text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-7 text-center">
          <p>
            &copy; {new Date().getFullYear()} VESIT-ECertificate. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
