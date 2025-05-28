import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "/assets/VES-logo.png"; // adjust the path as needed

const AdminHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminError, setAdminError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          navigate("/login");
          return;
        }

        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        console.log(
          "Verifying user with token:",
          token.substring(0, 10) + "..."
        );

        const res = await axios.get(`${baseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("User verification response:", res.data);

        if (!res.data.success || res.data.data.role !== "superadmin") {
          throw new Error("Not authorized as superadmin");
        }

        setUser(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "User verification error:",
          error.response?.data || error.message
        );
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyUser();
  }, [navigate]);

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
        console.log("Fetching admins from:", `${baseUrl}/api/admin/list`);

        const res = await axios.get(`${baseUrl}/api/admin/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Admin list response:", res.data);

        if (res.data?.success && Array.isArray(res.data.data)) {
          setAdmins(res.data.data);
        } else {
          console.warn("Unexpected response format:", res.data);
          setAdmins([]);
        }
        setAdminLoading(false);
      } catch (err) {
        console.error(
          "Error fetching admins:",
          err.response?.data || err.message
        );
        setAdminError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch admin list. Please check if the server is running."
        );
        setAdminLoading(false);
      }
    };

    fetchAdmins();
  }, [refreshKey]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    try {
      // Validation
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
        {
          email: email,
          password: password,
        },
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
        setRefreshKey((k) => k + 1); // Refresh the admin list
      } else {
        setFormError(response.data.message || "Failed to create admin");
      }
    } catch (error) {
      console.error(
        "Admin creation failed:",
        error.response?.data || error.message
      );
      setFormError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Navbar - Kept original styling */}
      <nav className="bg-[#f5f1e6] fixed top-0 left-0 w-full shadow-md z-50 border-b-2 border-[#e0c9a9]">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left Section */}
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

          {/* Right Section */}
          <div className="flex items-center space-x-4">
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
              <button
                onClick={handleLogout}
                className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Enhanced sections */}
      <div className="pt-24 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Admin List Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Admin Accounts
              </h2>
              <button
                onClick={() => setRefreshKey((k) => k + 1)}
                className="bg-[#5f4b32] hover:bg-[#4a3a27] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Refresh List
              </button>
            </div>

            {adminLoading ? (
              <div className="text-center py-4">Loading admins...</div>
            ) : adminError ? (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                Error: {adminError}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.length > 0 ? (
                      admins.map((admin) => (
                        <tr key={admin._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {admin.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(admin.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No admin accounts found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add New Admin Form */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Add New Admin
            </h2>

            {formError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                {formError}
              </div>
            )}

            {formSuccess && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4">
                {formSuccess}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleCreateAdmin}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (VES domain only) *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all"
                  placeholder="example@ves.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="^[a-zA-Z0-9._%+-]+@ves\.ac\.in$"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] transition-all"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setFormError("");
                    setFormSuccess("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#5f4b32] hover:bg-[#4a3a27] cursor-pointer"
                  } text-white rounded-lg font-medium transition-colors`}
                >
                  {isSubmitting ? "Creating..." : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
