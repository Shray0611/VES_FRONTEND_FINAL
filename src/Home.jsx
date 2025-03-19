import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f4d7b2] to-[#eac391]">
      {/* Removed max-w-7xl and added w-full */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 grid gap-8">
        <Navbar onLogout={handleLogout} />

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#d8b995]">
            <h1 className="text-4xl font-bold text-[#4e3c27] mb-6">
              Create Professional Certificates Effortlessly
            </h1>
            <p className="text-[#6d5840] text-lg mb-8">
              Transform your recognition process with our seamless
              e-certification platform for education, awards, and special
              occasions.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#5f4b32] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#4e3c27] transition duration-200">
                About
              </button>
              <button className="bg-[#5f4b32] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#4e3c27] transition duration-200">
                Services
              </button>
              <button className="bg-[#5f4b32] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#4e3c27] transition duration-200">
                Contact
              </button>
            </div>
          </div>

          <div className="relative w-full h-auto overflow-hidden rounded-2xl">
            <img
              src="/assets/welcome_img.png"
              alt="welcome certi"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center rounded-2xl">
            <img
              src="/assets/excel_pic.png"
              alt="Excel type image"
              className="max-w-full max-h-[250px] object-contain rounded-lg"
            />
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#d8b995]">
            <h2 className="text-3xl font-bold text-[#4e3c27] mb-4">
              Instant Digital Delivery
            </h2>
            <p className="text-[#6d5840]">
              Securely issue and distribute verifiable certificates with
              real-time tracking and immediate access for recipients.
            </p>
          </div>
        </div>

        {/* Template Gallery Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#d8b995]">
          <h2 className="text-3xl font-semibold text-[#4e3c27] text-center mb-8">
            Template Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={`/assets/templates/certi_demo_${num}.png`}
                  alt={`Template ${num}`}
                  className="w-full h-auto object-contain aspect-[4/3] rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4e3c27] text-white py-4 mt-auto">
        <div className="w-full px-7 text-center">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="/"
              className="text-[#d8b995] hover:text-[#eac391] active:text-[#f4d7b2] transition duration-200 focus:outline-none ring-0"
            >
              VESIT-ECertificate
            </a>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
