import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiChevronDown,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiEye,
} from "react-icons/fi";
import UserNavbar from "../layout/UserNavbar";
import axios from "axios";

const ComplaintsPage = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/complaints/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Add a complaint ID to each complaint for better display
        const complaintsWithId = response.data.map((complaint, index) => ({
          ...complaint,
          displayId: `#COMP-${789 + index}`,
        }));

        setComplaints(complaintsWithId);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError(
          err.response?.data?.error ||
            "An error occurred while fetching complaints"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserComplaints();
  }, [navigate]);

  const filteredComplaints = complaints
    .filter(
      (complaint) =>
        (searchQuery === "" ||
          complaint.displayId
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          complaint.message
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (selectedStatus === "All" ||
          selectedStatus.toLowerCase() === complaint.status)
    )
    .sort((a, b) => {
      if (sortConfig.key === "createdAt") {
        return sortConfig.direction === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaintView = () => {
    setSelectedComplaint(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Helper function to safely access certificate data
  const getCertificateInfo = (complaint, field) => {
    try {
      if (field === "eventName")
        return complaint.certificateId?.studentData?.eventName || "N/A";
      else if (field === "organization")
        return complaint.certificateId?.collectionId?.name || "N/A";
      else return "N/A";
    } catch (e) {
      return "N/A";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <div className="max-w-7xl mx-auto p-6 pt-24">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b pb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                My Complaints
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                {complaints.length} registered case
                {complaints.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200
                         text-gray-700 placeholder-gray-400 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white
                        focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200
                        text-gray-700 appearance-none text-sm"
              >
                <option>All</option>
                <option>open</option>
                <option>resolved</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="text-xl text-gray-600">Loading complaints...</div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          {!loading && !error && filteredComplaints.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-lg text-gray-600">
                {searchQuery || selectedStatus !== "All"
                  ? "No matching complaints found"
                  : "You haven't submitted any complaints yet"}
              </p>
            </div>
          )}

          {!loading && !error && filteredComplaints.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      Sr.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div
                        className="flex items-center gap-1.5 cursor-pointer"
                        onClick={() => handleSort("createdAt")}
                      >
                        Date
                        {sortConfig.key === "createdAt" && (
                          <FiChevronDown
                            className={`text-gray-500 transition-transform ${
                              sortConfig.direction === "asc" ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certificate
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredComplaints.map((complaint, index) => (
                    <tr
                      key={complaint._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-600 text-sm text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">
                        {formatDate(complaint.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-gray-900 text-sm font-medium">
                        <div className="flex flex-col">
                          <span>
                            {getCertificateInfo(complaint, "eventName")}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getCertificateInfo(complaint, "organization")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={complaint.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleViewComplaint(complaint)}
                          className="inline-flex items-center justify-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          <FiEye className="mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Complaint Details - {selectedComplaint.displayId}
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                onClick={closeComplaintView}
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Complaint Status
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-semibold text-gray-500 mb-1">
                        Current Status:
                      </span>
                      <StatusBadge status={selectedComplaint.status} />
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-500 mb-1">
                        Submitted On:
                      </span>
                      <span className="text-gray-700">
                        {formatDate(selectedComplaint.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Message
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedComplaint.message}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Certificate Information
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block font-semibold text-gray-500 mb-1">
                      Event:
                    </span>
                    <span className="text-gray-700">
                      {getCertificateInfo(selectedComplaint, "eventName")}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-500 mb-1">
                      Council/Organization:
                    </span>
                    <span className="text-gray-700">
                      {getCertificateInfo(selectedComplaint, "organization")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={closeComplaintView}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    resolved: {
      color: "bg-green-100 text-green-700",
      icon: <FiCheckCircle className="w-4 h-4" />,
    },
    open: {
      color: "bg-yellow-100 text-yellow-700",
      icon: <FiAlertCircle className="w-4 h-4" />,
    },
  };

  const config = statusConfig[status] || {
    color: "bg-gray-100 text-gray-700",
    icon: <FiClock className="w-4 h-4" />,
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.icon}
      {status === "open" ? "Open" : "Resolved"}
    </div>
  );
};

export default ComplaintsPage;
