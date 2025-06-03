import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Calendar,
  Award,
  FileText,
  Shield,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import logo from "/assets/VES-logo.png";

const VerifyCertificate = () => {
  const { code } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/api/verify/${code}`);

        if (!response.ok) {
          throw new Error(`Verification failed: ${response.status}`);
        }

        const data = await response.json();
        console.log("Certificate verification response:", data);
        setResult(data);
      } catch (error) {
        console.error("Verification error:", error);
        setError(error.message || "Verification failed");
        setResult({ valid: false });
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      verifyCertificate();
    } else {
      setError("No verification code provided");
      setLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] via-[#f5e6c8] to-[#f1d5a4] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#e0c9a9]/20 to-[#d4b88f]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#e0c9a9]/20 to-[#d4b88f]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#e0c9a9]/10 to-[#d4b88f]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Navbar */}
      <nav className="bg-white/90 backdrop-blur-xl fixed top-0 left-0 w-full shadow-2xl z-50 border-b border-[#e0c9a9]/40">
        <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-6 ml-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#e0c9a9]/30 to-[#d4b88f]/30 rounded-full blur-lg"></div>
              <img
                src={logo}
                alt="Logo"
                className="h-16 w-auto relative z-10"
              />
            </motion.div>
            <div className="text-[#5f4b32]">
              <h1 className="font-bold text-xl bg-gradient-to-r from-[#5f4b32] via-[#7d6954] to-[#5f4b32] bg-clip-text text-transparent">
                VESIT E-Certificate Verification
              </h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] rounded-full mt-1"></div>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 text-[#5f4b32] bg-gradient-to-r from-[#e0c9a9]/20 to-[#d4b88f]/20 px-4 py-2 rounded-full border border-[#e0c9a9]/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="w-5 h-5" />
            <span className="font-semibold text-sm">Secure Verification</span>
            <Sparkles className="w-4 h-4 text-[#d4b88f]" />
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-6 px-4 flex-1 flex items-center justify-center relative">
        <div className="max-w-3xl w-full mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative inline-block">
              <h1 className="text-2xl md:text-3xl font-bold text-[#5f4b32] mb-2 relative z-10">
                Certificate Verification
              </h1>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-[#e0c9a9] via-[#d4b88f] to-[#e0c9a9] rounded-full"></div>
            </div>
            <p className="text-[#7d6954] text-sm md:text-base max-w-xl mx-auto mt-3 leading-relaxed">
              Verify the authenticity of your VESIT certificates with our secure
              verification system
            </p>
          </motion.div>

          {/* Verification Card */}
          <motion.div
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#e0c9a9]/40 overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative top border */}
            <div className="h-1 bg-gradient-to-r from-[#e0c9a9] via-[#d4b88f] to-[#e0c9a9]"></div>

            {loading ? (
              <motion.div
                className="flex flex-col items-center justify-center py-8 px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="relative mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-16 h-16 border-4 border-[#e0c9a9]/30 border-t-[#5f4b32] rounded-full shadow-lg"></div>
                  <div className="absolute inset-2 w-12 h-12 border-2 border-[#d4b88f]/20 border-b-[#7d6954] rounded-full"></div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-[#5f4b32] mb-3">
                    Verifying Certificate
                  </h2>
                  <p className="text-[#7d6954] leading-relaxed">
                    Please wait while we authenticate your certificate...
                  </p>
                  <div className="flex justify-center mt-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#e0c9a9] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#d4b88f] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#e0c9a9] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : error || !result?.valid ? (
              <motion.div
                className="p-6 md:p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <motion.div
                    className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center shadow-lg border border-red-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <XCircle className="w-10 h-10 text-red-500" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold text-red-600 mb-4">
                      Verification Failed
                    </h2>
                    <div className="bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-400 p-6 rounded-2xl mb-6 shadow-inner">
                      <div className="flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                        <p className="text-red-700 font-semibold text-lg">
                          {error || "This certificate could not be verified"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#7d6954] leading-relaxed text-lg">
                      The certificate may be fraudulent or the verification code
                      may be incorrect. Please double-check the code and try
                      again.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="p-6 md:p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Success Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-green-100 to-green-50 rounded-full flex items-center justify-center shadow-lg border border-green-200 relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-white" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-green-600 mb-3">
                      Certificate Verified ✓
                    </h2>
                    <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-l-4 border-green-400 p-4 rounded-2xl mb-4 shadow-inner">
                      <div className="flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-500 mr-2" />
                        <p className="text-green-700 font-semibold">
                          This certificate has been verified as authentic
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Certificate Details */}
                <motion.div
                  className="bg-gradient-to-br from-[#e0c9a9]/25 via-[#f5e6c8]/20 to-[#d4b88f]/25 rounded-2xl p-4 border border-[#e0c9a9]/50 shadow-inner relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#5f4b32] to-[#7d6954] rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#5f4b32]">
                      Certificate Details
                    </h3>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-[#e0c9a9] to-transparent rounded-full"></div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-[#e0c9a9]/40 overflow-hidden shadow-lg relative z-10">
                    {/* Student Data */}
                    {result.certificate?.studentData &&
                      Object.entries(result.certificate.studentData).map(
                        ([key, value], index) => (
                          <motion.div
                            key={key}
                            className={`px-4 py-2.5 flex items-center gap-2 transition-all duration-200 hover:bg-white/60 ${
                              index % 2 === 0 ? "bg-white/50" : "bg-transparent"
                            } ${
                              index !==
                              Object.entries(result.certificate.studentData)
                                .length -
                                1
                                ? "border-b border-[#e0c9a9]/30"
                                : ""
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] rounded-full"></div>
                            <span className="font-bold text-[#5f4b32] capitalize text-sm">
                              {key
                                .replace(/_/g, " ")
                                .replace(/([a-z])([A-Z])/g, "$1 $2")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                              :
                            </span>
                            <span className="text-[#7d6954] font-semibold bg-gradient-to-r from-[#e0c9a9]/20 to-[#d4b88f]/20 px-2 py-0.5 rounded-full text-sm">
                              {value}
                            </span>
                          </motion.div>
                        )
                      )}

                    {/* Issue Date */}
                    <motion.div
                      className={`px-4 py-2.5 flex items-center gap-2 transition-all duration-200 hover:bg-white/60 ${
                        result.certificate?.studentData
                          ? Object.entries(result.certificate.studentData)
                              .length %
                              2 ===
                            0
                            ? "bg-white/50"
                            : "bg-transparent"
                          : "bg-white/50"
                      } ${
                        result.certificate?.collection
                          ? "border-b border-[#e0c9a9]/30"
                          : ""
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-[#5f4b32] to-[#7d6954] rounded-full flex items-center justify-center">
                        <Calendar className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-bold text-[#5f4b32] text-sm">
                        Issued on:
                      </span>
                      <span className="text-[#7d6954] font-semibold bg-gradient-to-r from-[#e0c9a9]/20 to-[#d4b88f]/20 px-2 py-0.5 rounded-full text-sm">
                        {result.certificate?.createdAt
                          ? new Date(
                              result.certificate.createdAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "N/A"}
                      </span>
                    </motion.div>

                    {/* Council name */}
                    {result.certificate?.collection && (
                      <motion.div
                        className={`px-4 py-2.5 flex items-center gap-2 transition-all duration-200 hover:bg-white/60 ${
                          result.certificate?.studentData
                            ? (Object.entries(result.certificate.studentData)
                                .length +
                                1) %
                                2 ===
                              0
                              ? "bg-white/50"
                              : "bg-transparent"
                            : "bg-transparent"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        {/* <div className="w-6 h-6 bg-gradient-to-r from-[#5f4b32] to-[#7d6954] rounded-full flex items-center justify-center">
                          <FileText className="w-3 h-3 text-white" />
                        </div> */}
                        {/* <span className="font-bold text-[#5f4b32] text-sm">
                          Council name:
                        </span>
                        <span className="text-[#7d6954] font-semibold bg-gradient-to-r from-[#e0c9a9]/20 to-[#d4b88f]/20 px-2 py-0.5 rounded-full text-sm">
                          {result.certificate.collection}
                        </span> */}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Enhanced Footer */}
            <motion.div
              className="bg-gradient-to-r from-[#e0c9a9]/40 via-[#f5e6c8]/30 to-[#d4b88f]/40 px-6 py-4 text-center border-t border-[#e0c9a9]/40 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="flex items-center justify-center gap-3 text-[#7d6954] relative z-10">
                <div className="w-8 h-8 bg-gradient-to-r from-[#5f4b32] to-[#7d6954] rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <p className="font-bold">
                  Powered by VESIT E-Certificate Management System
                </p>
                <Sparkles className="w-5 h-5 text-[#d4b88f]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
