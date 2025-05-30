import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../layout/UserNavbar";
import { saveAs } from "file-saver";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Eye,
  Download,
  AlertCircle,
  Calendar,
  Award,
  FileText,
  X,
  Loader2,
} from "lucide-react";

const UserHome = ({ onLogout }) => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [actionLoading, setActionLoading] = useState({
    view: false,
    download: false,
    complaint: false,
  });
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      if (storedName.endsWith("@ves.ac.in")) {
        const namePart = storedName.split("@")[0].split(".").slice(1).join(".")
        const firstNamePart = namePart.split(".")[0];
        const formattedFirstName =
          firstNamePart.charAt(0).toUpperCase() + firstNamePart.slice(1);
        setFirstName(formattedFirstName || "User");
      } else {
        setFirstName(storedName);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/certificates",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCertificates(response.data);
      } catch (error) {
        setError(
          "Failed to load certificates: " +
            (error.response?.data?.error || error.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [navigate]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleView = async (certificateId) => {
    try {
      setActionLoading((prev) => ({ ...prev, view: true }));
      setError("");

      // Cleanup previous preview URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/certificates/${certificateId}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const url = URL.createObjectURL(response.data);
      setPreviewUrl(url);
    } catch (error) {
      setError(
        "Failed to load certificate: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, view: false }));
    }
  };

  const handleDownload = async (certificateId) => {
    try {
      setActionLoading((prev) => ({ ...prev, download: true }));
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/certificates/${certificateId}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Get the certificate details to use in filename
      const cert = certificates.find((c) => c._id === certificateId);
      const eventName = cert?.studentData?.eventName || "certificate";
      const filename = `${eventName}.png`;

      saveAs(response.data, filename);
    } catch (error) {
      setError(
        "Download failed: " + (error.response?.data?.error || error.message)
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, download: false }));
    }
  };

  const handleComplaint = (certificateId) => {
    navigate(`/report-issue/${certificateId}`);
  };

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/");
  };

  // Helper function to extract and capitalize name from email
  const getIssuerName = (email) => {
    if (!email || typeof email !== "string") return "N/A";
    const beforeAt = email.split("@")[0];
    if (!beforeAt) return "N/A";
    return beforeAt.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] flex flex-col">
        <UserNavbar onLogout={onLogout} />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-[#e0c9a9]/30 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader2 className="w-12 h-12 text-[#e0c9a9] mx-auto mb-4 animate-spin" />
            <p className="text-xl text-[#5f4b32] font-medium">
              Loading your certificates...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] p-6 pt-24 flex flex-col items-center">
      <UserNavbar onLogout={handleLogout} />

      <div className="w-full mx-auto px-16 sm:px-24 lg:px-40 py-20">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5f4b32] mb-4">
            Welcome back, {firstName}!
          </h1>
          {/* <p className="text-[#7d6954] text-lg md:text-xl max-w-2xl mx-auto">
            Manage and download your certificates with ease
          </p> */}
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            className="mb-8 bg-red-50/80 backdrop-blur-md border border-red-200 rounded-2xl p-4 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Certificates Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-[#e0c9a9]/30 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Section Header */}
          <div className="bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] px-8 py-6">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#5f4b32]" />
              <h2 className="text-2xl font-bold text-[#5f4b32]">
                Your Certificates ({certificates.length})
              </h2>
            </div>
          </div>

          {certificates.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FileText className="w-16 h-16 text-[#e0c9a9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#5f4b32] mb-2">
                No certificates found
              </h3>
              <p className="text-[#7d6954]">
                Your certificates will appear here once they're issued
              </p>
            </motion.div>
          ) : (
            <div className="p-8">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e0c9a9]/30">
                      <th className="text-center py-4 px-6 text-[#5f4b32] font-semibold">
                        Event
                      </th>
                      <th className="text-center py-4 px-6 text-[#5f4b32] font-semibold">
                        Council
                      </th>
                      <th className="text-center py-4 px-6 text-[#5f4b32] font-semibold">
                        Date Issued
                      </th>
                      <th className="text-center py-4 px-6 text-[#5f4b32] font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert, index) => (
                      <motion.tr
                        key={cert._id}
                        className="border-b border-[#e0c9a9]/20 hover:bg-[#f8e5c5]/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-4 px-6 text-center">
                          <div className="font-medium text-[#5f4b32]">
                            {cert.studentData.eventName || "N/A"}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center text-[#7d6954]">
                          {getIssuerName(cert.issuerEmail)}
                        </td>
                        <td className="py-4 px-6 text-center text-[#7d6954]">
                          <div className="flex items-center gap-2 justify-center">
                            <Calendar className="w-4 h-4" />
                            {new Date(cert.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex justify-center items-center gap-8">
                            <motion.button
                              onClick={() => handleView(cert._id)}
                              disabled={actionLoading.view}
                              className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {actionLoading.view ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                              View
                            </motion.button>

                            <motion.button
                              onClick={() => handleDownload(cert._id)}
                              disabled={actionLoading.download}
                              className="bg-[#5f4b32] hover:bg-[#4a3a26] text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {actionLoading.download ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4" />
                              )}
                              Download
                            </motion.button>

                            <motion.button
                              onClick={() => handleComplaint(cert._id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <AlertCircle className="w-4 h-4" />
                              Report Issue
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert._id}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#e0c9a9]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-[#5f4b32] text-lg">
                          {cert.studentData.eventName || "N/A"}
                        </h3>
                        <p className="text-[#7d6954]">
                          {getIssuerName(cert.issuerEmail)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[#7d6954] text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(cert.createdAt).toLocaleDateString()}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <motion.button
                          onClick={() => handleView(cert._id)}
                          disabled={actionLoading.view}
                          className="flex-1 bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-3 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {actionLoading.view ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                          View
                        </motion.button>

                        <motion.button
                          onClick={() => handleDownload(cert._id)}
                          disabled={actionLoading.download}
                          className="flex-1 bg-[#5f4b32] hover:bg-[#4a3a26] text-white font-medium py-2 px-3 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {actionLoading.download ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          Download
                        </motion.button>
                      </div>

                      <motion.button
                        onClick={() => handleComplaint(cert._id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        Report Issue
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePreview}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#5f4b32]">
                Certificate Preview
              </h3>
              <motion.button
                onClick={closePreview}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-gray-500" />
              </motion.button>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
              <img
                src={previewUrl}
                alt="Certificate Preview"
                className="max-w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UserHome;
