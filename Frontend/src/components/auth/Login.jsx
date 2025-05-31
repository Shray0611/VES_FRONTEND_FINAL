// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     ...
//   };
//   return (
//     ...
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      const { token, user } = responseData.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userName", email);

      switch (user.role) {
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;
        case "admin":
          navigate("/issuer-home");
          break;
        case "student":
          navigate("/user-home");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Local Login Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    setIsLoading(true);
    setError("");

    try {
      const tokenId = response.credential;

      const loginResponse = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId }),
        }
      );

      const responseData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(responseData.message || "Google login failed");
      }

      const { token, user, redirectTo } = responseData.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // Store user name or email from Google response
      localStorage.setItem("userName", user.name || user.email || "User");

      navigate(redirectTo || "/");
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f5dc] via-[#f3ead7] to-[#f8f6e3]">
      <div className="flex w-full max-w-4xl rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-transparent p-10">
          <img
            src="/assets/VES-logo.png"
            alt="VES Logo"
            className="w-20 mb-6"
          />
          <h2 className="text-4xl font-semibold text-[#3b3b3b] text-center">
            VESIT E-Certificate
          </h2>
          <p className="text-1.8xl font-light text-[#6b7280] mt-4 text-center">
            A trusted platform for managing and verifying digital certificates
          </p>
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-gray-300"></div>

        {/* Right Section - Login Card */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-light text-[#1e293b] text-center mb-8">
              Account Login
            </h1>

            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLocalLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2"
                  placeholder="name@ves.ac.in"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2"
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 disabled:bg-yellow-400"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="my-4 text-center text-gray-500">OR</div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={true}
                theme="filled_blue"
                size="large"
                shape="rectangular"
                width="100%"
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              />
            </div>

            <p className="text-center mt-4 text-gray-600">
              <span
                onClick={() => navigate("/")}
                className="text-[#000000] hover:underline focus:outline-none font-medium cursor-pointer"
              >
                Back To Home Page
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
