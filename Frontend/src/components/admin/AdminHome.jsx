import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, useInView, useAnimation } from "framer-motion";
import logo from "/assets/VES-logo.png"; // Adjust the path as needed

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
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
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
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });

        if (res.data?.success && Array.isArray(res.data.data)) {
          setAdmins(res.data.data);
        } else {
          setAdmins([]);
        }
        setAdminLoading(false);
      } catch (err) {
        setAdminError(err.response?.data?.message || "Failed to fetch admin list.");
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
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
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
      setFormError(error.response?.data?.message || error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAdmin = (adminId) => {
    setSelectedAdmins((prev) =>
      prev.includes(adminId) ? prev.filter((id) => id !== adminId) : [...prev, adminId]
    );
    setVisibleCheckboxes((prev) =>
      prev.includes(adminId) ? prev.filter((id) => id !== adminId) : [...prev, adminId]
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
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          })
        )
      );

      setAdmins(admins.filter((admin) => !selectedAdmins.includes(admin._id)));
      setSelectedAdmins([]);
      setVisibleCheckboxes([]);
      setFormSuccess("Selected admins deleted successfully!");
    } catch (error) {
      setAdminError(error.response?.data?.message || "Failed to delete admins.");
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
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar */}
      <nav className="bg-[#f5f1e6] fixed top-0 left-0 w-full shadow-lg z-50 border-b-2 border-[#e0c9a9]">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6 ml-4">
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-auto cursor-pointer"
              onClick={() => navigate("/admin-home")}
            />
            <div className="text-[#5f4b32] font-bold text-lg">
              <b>VESIT Admin</b>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="/assets/usericon.jpg"
                alt="User Icon"
                className="h-10 w-10 rounded-full border-2 border-[#e0c9a9] shadow-sm"
              />
              <span className="text-[#5f4b32] font-semibold text-lg">
                {user?.email ? user.email.split("@")[0] : "Super Admin"}
              </span>
            </div>
            <motion.button
              onClick={handleLogout}
              className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Log Out
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Success Message */}
          {formSuccess && (
            <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-md bg-green-100 text-green-800 p-4 rounded-lg shadow-md z-50 animate-slide-up">
              {formSuccess}
            </div>
          )}

          {/* Admin List Section */}
          <FadeInSection>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Admin Accounts</h2>
                <div className="space-x-4">
                  <motion.button
                    onClick={() => setRefreshKey((k) => k + 1)}
                    className="bg-[#5f4b32] hover:bg-[#4a3a27] text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Refresh List
                  </motion.button>
                  <motion.button
                    onClick={handleDelete}
                    className={`bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 ${
                      selectedAdmins.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={selectedAdmins.length === 0}
                    whileHover={
                      selectedAdmins.length > 0
                        ? {
                            scale: 1.05,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }
                        : {}
                    }
                    whileTap={selectedAdmins.length > 0 ? { scale: 0.98 } : {}}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>

              {adminLoading ? (
                <div className="text-center py-4 text-gray-600">Loading admins...</div>
              ) : adminError ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">{adminError}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f5f1e6]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#5f4b32] uppercase tracking-wider w-12"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#5f4b32] uppercase tracking-wider w-16">
                          Sr No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#5f4b32] uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#5f4b32] uppercase tracking-wider">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {admins.length > 0 ? (
                        admins.map((admin, index) => (
                          <tr key={admin._id} className="hover:bg-[#f8fafc] transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium cursor-pointer hover:text-[#5f4b32] transition-colors"
                              onClick={() => handleSrNoClick(admin._id)}
                            >
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                              {admin.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(admin.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                            No admin accounts found
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
          <FadeInSection>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">Add New Admin</h2>

              {formError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{formError}</div>
              )}

              <form className="space-y-6" onSubmit={handleCreateAdmin}>
                <div className="flex flex-col items-start">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (VES domain only) *
                  </label>
                  <input
                    type="email"
                    className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all duration-200"
                    placeholder="example@ves.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="^[a-zA-Z0-9._%+-]+@ves\.ac\.in$"
                    required
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all duration-200"
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    required
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#5f4b32] hover:bg-[#4a3a27] cursor-pointer"
                    } text-white rounded-lg font-medium transition-colors duration-200`}
                    whileHover={
                      !isSubmitting
                        ? {
                            scale: 1.05,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }
                        : {}
                    }
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? "Creating..." : "Add Admin"}
                  </motion.button>
                </div>
              </form>
            </div>
          </FadeInSection>

          {/* Delete Confirmation Dialog */}
          {showDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete {selectedAdmins.length} admin(s)?
                  This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <motion.button
                    onClick={closeDialog}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;