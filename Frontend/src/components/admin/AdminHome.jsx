import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, useInView, useAnimation } from "framer-motion";
import logo from "/assets/VES-logo.png";

// Fade-in animation component
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AdminHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminError, setAdminError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [visibleCheckboxes, setVisibleCheckboxes] = useState([]);

  // Verify superadmin user
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await axios.get(`${baseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.data.success || res.data.data.role !== "superadmin") {
          throw new Error("Not authorized as superadmin");
        }

        setUser(res.data.data);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyUser();
  }, [navigate]);

  // Fetch admin list
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setAdminLoading(true);
        setAdminError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await axios.get(`${baseUrl}/api/admin/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data?.success && Array.isArray(res.data.data)) {
          setAdmins(res.data.data);
        } else {
          setAdmins([]);
        }
        setAdminLoading(false);
      } catch (err) {
        setAdminError(
          err.response?.data?.message || "Failed to fetch admin list."
        );
        setAdminLoading(false);
      }
    };

    fetchAdmins();
  }, [refreshKey]);

  // Handle success message timeout
  useEffect(() => {
    if (formSuccess) {
      const timer = setTimeout(() => setFormSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [formSuccess]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      if (!email.endsWith("@ves.ac.in")) {
        throw new Error("Only VES domain emails allowed");
      }
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(
        `${baseUrl}/api/admin/create`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setFormSuccess("Admin created successfully!");
        setEmail("");
        setPassword("");
        setRefreshKey((k) => k + 1);
      } else {
        setFormError(response.data.message || "Failed to create admin");
      }
    } catch (error) {
      setFormError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAdmin = (adminId) => {
    setSelectedAdmins((prev) =>
      prev.includes(adminId)
        ? prev.filter((id) => id !== adminId)
        : [...prev, adminId]
    );
    setVisibleCheckboxes((prev) =>
      prev.includes(adminId)
        ? prev.filter((id) => id !== adminId)
        : [...prev, adminId]
    );
  };

  const handleSrNoClick = (adminId) => {
    setVisibleCheckboxes((prev) =>
      prev.includes(adminId) ? prev : [...prev, adminId]
    );
    setSelectedAdmins((prev) =>
      prev.includes(adminId) ? prev : [...prev, adminId]
    );
  };

  const handleDelete = async () => {
    if (selectedAdmins.length === 0) {
      setAdminError("Please select at least one admin to delete.");
      return;
    }

    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await Promise.all(
        selectedAdmins.map((adminId) =>
          axios.delete(`${baseUrl}/api/admin/${adminId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        )
      );

      setAdmins(admins.filter((admin) => !selectedAdmins.includes(admin._id)));
      setSelectedAdmins([]);
      setVisibleCheckboxes([]);
      setFormSuccess("Selected admins deleted successfully!");
    } catch (error) {
      setAdminError(
        error.response?.data?.message || "Failed to delete admins."
      );
    } finally {
      setShowDialog(false);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-[#5f4b32] border-b-[#e0c9a9] border-l-[#e0c9a9] border-r-[#e0c9a9] rounded-full animate-spin mb-4"></div>
          <div className="text-lg text-gray-600 font-medium">
            Authenticating...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#f8f4eb] to-[#f5f1e6] fixed top-0 left-0 w-full shadow-md z-50 border-b border-[#e0d6c1]">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6 ml-4">
            <motion.img
              src={logo}
              alt="Logo"
              className="h-14 w-auto cursor-pointer"
              onClick={() => navigate("/admin-home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <div className="text-[#5f4b32] font-bold text-xl tracking-wide">
              <b>VESIT Superadmin</b>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-[#f0e6d3] to-[#e0c9a9] h-10 w-10 rounded-full flex items-center justify-center border-2 border-[#e0c9a9] shadow-sm">
                <span className="text-[#5f4b32] font-bold text-lg">
                  {user?.email ? user.email.charAt(0).toUpperCase() : "S"}
                </span>
              </div>
              <span className="text-[#5f4b32] font-semibold text-lg max-w-[150px] truncate">
                {user?.email ? user.email.split("@")[0] : "Super Admin"}
              </span>
            </div>
            <motion.button
              onClick={handleLogout}
              className="bg-gradient-to-r from-[#d4b88f] to-[#c5a476] hover:from-[#c5a476] hover:to-[#b6956a] text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Log Out
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Success Message */}
          {formSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {formSuccess}
            </motion.div>
          )}
          <br />
          <br />
          {/* Admin List Section */}
          <FadeInSection>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#f0e6d3] mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Issuer Accounts
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    onClick={() => setRefreshKey((k) => k + 1)}
                    className="bg-gradient-to-r from-[#5f4b32] to-[#4a3a27] hover:from-[#4a3a27] hover:to-[#3a2d1f] text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 flex items-center"
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Refresh List
                  </motion.button>
                  <motion.button
                    onClick={handleDelete}
                    className={`bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 flex items-center ${
                      selectedAdmins.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={selectedAdmins.length === 0}
                    whileHover={
                      selectedAdmins.length > 0
                        ? {
                            scale: 1.05,
                            boxShadow:
                              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }
                        : {}
                    }
                    whileTap={selectedAdmins.length > 0 ? { scale: 0.98 } : {}}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </motion.button>
                </div>
              </div>

              {adminLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-12 h-12 border-4 border-t-[#5f4b32] border-b-[#e0c9a9] border-l-[#e0c9a9] border-r-[#e0c9a9] rounded-full animate-spin"></div>
                </div>
              ) : adminError ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-700 font-medium">
                      {adminError}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-[#f0e6d3]">
                  <table className="min-w-full divide-y divide-[#f0e6d3]">
                    <thead className="bg-gradient-to-r from-[#f9f5ec] to-[#f5f1e6]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#5f4b32] uppercase tracking-wider w-12"></th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#5f4b32] uppercase tracking-wider w-16">
                          Sr No
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#5f4b32] uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#5f4b32] uppercase tracking-wider">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#f0e6d3]">
                      {admins.length > 0 ? (
                        admins.map((admin, index) => (
                          <tr
                            key={admin._id}
                            className="hover:bg-[#fcfaf5] transition-colors duration-150"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {visibleCheckboxes.includes(admin._id) && (
                                <input
                                  type="checkbox"
                                  checked={selectedAdmins.includes(admin._id)}
                                  onChange={() => handleSelectAdmin(admin._id)}
                                  className="h-4 w-4 text-[#5f4b32] focus:ring-[#e0c9a9] border-gray-300 rounded cursor-pointer"
                                />
                              )}
                            </td>
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:text-[#5f4b32] transition-colors"
                              onClick={() => handleSrNoClick(admin._id)}
                            >
                              <div className="flex items-center">
                                <span className="bg-[#f5f1e6] rounded-full w-8 h-8 flex items-center justify-center">
                                  {index + 1}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400 mr-2"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {admin.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400 mr-2"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {new Date(admin.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 opacity-40 mb-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <span className="text-lg font-medium">
                                No issuer accounts found
                              </span>
                              <p className="mt-1 text-gray-600 max-w-md">
                                Create a new issuer account using the form below
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </FadeInSection>

          {/* Add New Admin Form */}
          <FadeInSection delay={0.2}>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#f0e6d3]">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#f5f1e6] to-[#f9f5ec] p-3 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#5f4b32]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Add New Issuer
                </h2>
              </div>

              {formError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-700 font-medium">
                      {formError}
                    </span>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleCreateAdmin}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (VES domain only) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all duration-200"
                        placeholder="example@ves.ac.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        pattern="^[a-zA-Z0-9._%+-]+@ves\.ac\.in$"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all duration-200"
                        placeholder="Minimum 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength="8"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 flex items-center ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#5f4b32] to-[#4a3a27] hover:from-[#4a3a27] hover:to-[#3a2d1f] cursor-pointer"
                    } text-white rounded-lg font-medium shadow-md transition-all duration-200`}
                    whileHover={
                      !isSubmitting
                        ? {
                            scale: 1.05,
                            boxShadow:
                              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }
                        : {}
                    }
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Issuer
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </FadeInSection>

          {/* Delete Confirmation Dialog */}
          {showDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full border-2 border-red-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Confirm Deletion
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 pl-11">
                  Are you sure you want to delete {selectedAdmins.length}
                  {selectedAdmins.length === 1
                    ? " admin account"
                    : " admin accounts"}
                  ? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    onClick={closeDialog}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={confirmDelete}
                    className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium transition-colors duration-200"
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
