import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    navigate("/user-home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Signup</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-black bg-white text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-black bg-white text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Re-enter Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-black bg-white text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;