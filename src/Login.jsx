import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
    navigate("/user-home");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#edf2f7] w-full max-w-md">
        <h1 className="text-3xl font-light text-[#1e293b] text-center mb-8">
          Account Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm text-[#64748b]">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#edf2f7] 
                         focus:border-[#94a3b8] focus:ring-1 focus:ring-[#94a3b8]
                         outline-none pl-10"
                placeholder="john@example.com"
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-3.5 text-[#94a3b8]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[#64748b]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#edf2f7] 
                         focus:border-[#94a3b8] focus:ring-1 focus:ring-[#94a3b8]
                         outline-none pl-10 pr-12"
                placeholder="Please enter your password"
                required
              />
              {/* Padlock Icon (Left Side) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-3.5 text-[#94a3b8]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6 8V6a4 4 0 118 0v2h1.5A1.5 1.5 0 0117 9.5v6A1.5 1.5 0 0115.5 17h-11A1.5 1.5 0 013 15.5v-6A1.5 1.5 0 014.5 8H6zm2 0h4V6a2 2 0 00-4 0v2zm2 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              {/* See Password Button (Right Side) */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-xs p-1 text-[#94a3b8] focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3C5 3 1.73 7.11.64 9.1a1 1 0 000 .8C1.73 12.89 5 17 10 17s8.27-4.11 9.36-6.1a1 1 0 000-.8C18.27 7.11 15 3 10 3zm0 2c3.5 0 6.27 3.11 7.36 5-.9 1.54-3.09 4-7.36 4s-6.46-2.46-7.36-4C3.73 8.11 6.5 5 10 5zm0 2a3 3 0 103 3 3 3 0 00-3-3zm0 2a1 1 0 11-1 1 1 1 0 011-1z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4.03 3.44A.75.75 0 003.47 4.5l1.14 1.12A9.17 9.17 0 002 10c1.1 2.25 4 6 8 6a9.21 9.21 0 005.58-1.92l1.02 1.02a.75.75 0 001.06-1.06l-14-14a.75.75 0 00-1.06 0zm6.47 6.47a1.5 1.5 0 10-1.5 1.5.75.75 0 00.53-1.28l1.5 1.5a3 3 0 01-4.24-4.24L8 6.25V6a1 1 0 00-2 0v.25a9.19 9.19 0 00-2.91 3.36 1 1 0 000 .8C3.73 12.89 6.5 16 10 16a9.17 9.17 0 004.62-1.38l1.14 1.12a.75.75 0 001.06-1.06l-4.5-4.5-1.14-1.14zM10 14a7.21 7.21 0 01-6.36-4A7.21 7.21 0 0110 6a7.18 7.18 0 014.62 1.36l-1.1 1.1A5.22 5.22 0 0010 8a5.22 5.22 0 00-3.54 1.46A.75.75 0 106.3 9.7 3.72 3.72 0 0110 10.5a3.72 3.72 0 013.7-2.8.75.75 0 00.54-1.28A7.17 7.17 0 0110 6z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="text-center ">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgotPassword");
              }}
              className="text-sm text-[#64748b] hover:text-[#475569] transition-colors"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#334155] text-white py-3 px-6 rounded-lg 
                     font-normal hover:bg-[#475569] transition-colors"
          >
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
