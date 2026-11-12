import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Shield, GraduationCap, User, UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleSuccess = async (response) => {
    setIsLoading(true);
    setError("");

    try {
      const tokenId = response.credential;

      const signupResponse = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId }),
        }
      );

      const responseData = await signupResponse.json();

      if (!signupResponse.ok) {
        throw new Error(responseData.message || "Signup failed");
      }

      const { token, user, redirectTo } = responseData.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      navigate(redirectTo || "/user-home");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google signup failed. Please try again.");
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

            {/* Right Section - Signup Form */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-white/90 to-[#f9f3e8]/90">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#5f4b32] to-[#6b5439] rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#5f4b32] mb-2">
                    Create Account
                  </h3>
                  <p className="text-[#7d6954]">
                    Join VESIT E-Certificate Platform
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

                {/* Google Signup Button */}
                <div className="mb-6">
                  <div className="relative">
                    {isLoading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                        <div className="flex items-center space-x-2 text-[#5f4b32]">
                          <div className="w-5 h-5 border-2 border-[#5f4b32]/30 border-t-[#5f4b32] rounded-full animate-spin"></div>
                          <span className="text-sm font-medium">
                            Creating account...
                          </span>
                        </div>
                      </div>
                    )}
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap={true}
                      theme="filled_blue"
                      size="large"
                      shape="rectangular"
                      width="100%"
                      disabled={isLoading}
                      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                    />
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="mb-6 p-4 bg-gradient-to-r from-[#f9f3e8]/50 to-[#e0c9a9]/10 rounded-xl border border-[#e0c9a9]/20">
                  <h4 className="text-sm font-semibold text-[#5f4b32] mb-3">
                    What you'll get:
                  </h4>
                  <div className="space-y-2 text-xs text-[#7d6954]">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#5f4b32] rounded-full"></div>
                      <span>Secure digital certificate storage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#5f4b32] rounded-full"></div>
                      <span>Easy certificate verification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#5f4b32] rounded-full"></div>
                      <span>Access to VESIT academic services</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#e0c9a9]/30"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-gradient-to-r from-white/90 to-[#f9f3e8]/90 text-sm text-[#7d6954] font-medium">
                        Already have an account?
                      </span>
                    </div>
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 px-6 border-2 border-[#5f4b32] text-[#5f4b32] rounded-xl font-semibold text-base hover:bg-[#5f4b32] hover:text-white focus:ring-4 focus:ring-[#e0c9a9]/20 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign In Instead
                  </button>
                </div>

                {/* Back to Home Link */}
                <div className="text-center mt-4">
                  <p className="text-[#7d6954]">
                    <span
                      onClick={() => navigate("/")}
                      className="text-[#5f4b32] hover:text-[#4a3e2a] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#e0c9a9]/30 rounded transition-all duration-200 cursor-pointer text-sm"
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

export default Signup;
