import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Shield,
  GraduationCap,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e0c9a9]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#d4b88f]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-[#f8e5c5]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#e0c9a9]/30 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[500px]">
            {/* Left Section - Branding */}
            <div className="lg:w-1/2 bg-gradient-to-br from-[#5f4b32] via-[#6b5439] to-[#4a3e2a] p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-20 h-20 border border-[#e0c9a9]/20 rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 border border-[#e0c9a9]/20 rounded-full"></div>
                <div className="absolute top-1/2 left-5 w-2 h-2 bg-[#e0c9a9]/30 rounded-full"></div>
                <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-[#e0c9a9]/40 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#5f4b32]/50 to-transparent"></div>
              </div>

              <div className="relative z-10 text-center">
                {/* VES College Logo */}
                <div className="w-32 h-32 mb-6 mx-auto flex items-center justify-center">
                  <img
                    src="/assets/VES-logo.png"
                    alt="VES College Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to Shield icon if logo fails to load
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "block";
                    }}
                  />
                  <Shield className="w-20 h-20 text-[#e0c9a9] hidden" />
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#e0c9a9] bg-clip-text text-transparent">
                  VESIT
                </h1>
                <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-[#e0c9a9]">
                  E-Certificate Platform
                </h2>
                <p className="text-base text-[#e0c9a9]/80 max-w-sm leading-relaxed">
                  A trusted platform for managing and verifying digital
                  certificates
                </p>

                {/* Feature highlights */}
                <div className="mt-8 flex flex-wrap justify-center gap-6">
                  <div className="flex items-center space-x-2 text-[#e0c9a9]/80">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm">Secure & Verified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#e0c9a9]/80">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-sm">Academic Excellence</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#e0c9a9]/80">
                    <User className="w-5 h-5" />
                    <span className="text-sm">Trusted Institution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-white/90 to-[#f9f3e8]/90">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#5f4b32] mb-2">
                    Account Login
                  </h3>
                  <p className="text-[#7d6954]">
                    Sign in to access your dashboard
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in slide-in-from-top-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleLocalLogin} className="space-y-4">
                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-[#5f4b32] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7d6954] group-focus-within:text-[#5f4b32] transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-[#e0c9a9]/50 rounded-xl bg-white/80 text-[#5f4b32] placeholder-[#7d6954]/60 focus:bg-white focus:border-[#5f4b32] focus:ring-4 focus:ring-[#e0c9a9]/20 transition-all duration-200 outline-none backdrop-blur-sm"
                        placeholder="name@ves.ac.in"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-[#5f4b32] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7d6954] group-focus-within:text-[#5f4b32] transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-12 py-3 border border-[#e0c9a9]/50 rounded-xl bg-white/80 text-[#5f4b32] placeholder-[#7d6954]/60 focus:bg-white focus:border-[#5f4b32] focus:ring-4 focus:ring-[#e0c9a9]/20 transition-all duration-200 outline-none backdrop-blur-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#7d6954] hover:text-[#5f4b32] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 py-3 px-6 rounded-xl font-semibold text-base hover:from-yellow-500 hover:to-yellow-700 focus:ring-4 focus:ring-yellow-200/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-yellow-900/30 border-t-yellow-900 rounded-full animate-spin"></div>
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#e0c9a9]/30"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-gradient-to-r from-white/90 to-[#f9f3e8]/90 text-sm text-[#7d6954] font-medium">
                        OR
                      </span>
                    </div>
                  </div>
                </div>

                {/* Google Login */}
                <div className="flex justify-center mb-6">
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

                {/* Back to Home Link */}
                <div className="text-center">
                  <p className="text-[#7d6954]">
                    <span
                      onClick={() => navigate("/")}
                      className="text-[#5f4b32] hover:text-[#4a3e2a] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#e0c9a9]/30 rounded transition-all duration-200 cursor-pointer"
                    >
                      Back To Home Page
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
