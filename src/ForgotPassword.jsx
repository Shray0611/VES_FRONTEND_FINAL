import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    // Here you could add your email validation and API call logic.
    setVerified(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#edf2f7] w-full max-w-md">
        <h1 className="text-3xl font-light text-[#1e293b] text-center mb-8">
          Forgot Password
        </h1>

        <div className="space-y-6">
          <div className="flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Gmail address"
              className="flex-1 p-3 rounded-lg border border-[#edf2f7] focus:border-[#94a3b8] focus:ring-1 focus:ring-[#94a3b8] outline-none"
              required
            />
            <button
              type="button"
              onClick={handleVerify}
              className="ml-2 bg-[#334155] text-white py-3 px-6 rounded-lg font-normal hover:bg-[#475569] transition-colors"
            >
              Verify
            </button>
          </div>

          {verified && (
            <p className="text-sm text-[#64748b] mt-4">
              We have sent you a mail, please check your inbox.
            </p>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm text-[#64748b] hover:text-[#475569] transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
