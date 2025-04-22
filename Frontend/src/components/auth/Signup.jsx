import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleSuccess = async (response) => {
    setIsLoading(true);
    setError("");

    try {
      const tokenId = response.credential;

      const signupResponse = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId }),
      });

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
            VESIT-Ecertificate
          </h2>
          <p className="text-1.8xl font-light text-[#6b7280] mt-4 text-center">
          A trusted platform for managing and verifying digital certificates
          </p>
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-gray-300"></div>

        {/* Right Section - Signup Card */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-light text-[#1e293b] text-center mb-8">
              Sign Up
            </h1>

            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
            )}

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={true} // Enables one-tap signup
              theme="filled_blue"
              size="large"
              shape="rectangular"
              width="100%"
              disabled={isLoading}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} // Use env variable
            />

            <p className="text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#000000] hover:underline focus:outline-none font-medium cursor-pointer"
              >
                Log in here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;