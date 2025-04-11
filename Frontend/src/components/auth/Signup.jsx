import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Frontend validation -Coment
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch('http://localhost:5000/api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || "Registration failed");
      }

      // Handle successful registration
      const userData = responseData.data.user;
      const userRole = userData?.role?.toLowerCase() || "student";

      localStorage.setItem("token", responseData.data.token);
      localStorage.setItem("role", userRole);

      // Redirect to appropriate dashboard
      switch(userRole) {
        case "admin":
          navigate("/generate");
          break;
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;
        default:
          navigate("/user-home");
      }

    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Sign Up</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@ves.ac.in"
            />
            <p className="text-sm text-gray-500 mt-1">Must use ves.ac.in domain</p>
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
              className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              minLength="6"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg px-4 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter password"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium
                      hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;