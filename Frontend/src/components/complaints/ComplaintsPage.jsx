import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  X,
  Calendar,
  MessageSquare,
  Award,
  Building2,
} from "lucide-react";
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
      if (field === "eventName") {
        const eventName = complaint.certificateId?.studentData?.eventName;
        return eventName && eventName.trim() !== "" ? eventName : "";
      } else if (field === "organization") {
        const organization = complaint.certificateId?.collectionId?.name;
        return organization && organization.trim() !== "" ? organization : "";
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      <UserNavbar />
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-8 border border-[#e0c9a9]/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-[#5f4b32] leading-tight">
                My Complaints
              </h1>
              <p className="text-[#7d6954] text-lg">
                {complaints.length} registered case
                {complaints.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7d6954] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  className="pl-12 pr-4 py-3 w-full sm:w-80 rounded-2xl border-2 border-[#e0c9a9]/30 bg-white/70 
                         focus:outline-none focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#e0c9a9]
                         text-[#5f4b32] placeholder-[#7d6954]/60 text-sm font-medium
                         backdrop-blur-sm transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none px-6 py-3 pr-12 rounded-2xl border-2 border-[#e0c9a9]/30 bg-white/70
                          focus:outline-none focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#e0c9a9]
                          text-[#5f4b32] text-sm font-medium backdrop-blur-sm transition-all duration-300"
                >
                  <option>All</option>
                  <option>open</option>
                  <option>resolved</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#7d6954] w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-16 text-center border border-[#e0c9a9]/30">
            <div className="animate-spin w-12 h-12 border-4 border-[#e0c9a9] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl text-[#7d6954] font-medium">
              Loading complaints...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-md border-2 border-red-200 text-red-700 rounded-3xl p-6 mb-6 shadow-xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredComplaints.length === 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-16 text-center border border-[#e0c9a9]/30">
            <MessageSquare className="w-16 h-16 text-[#e0c9a9] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[#5f4b32] mb-2">
              {searchQuery || selectedStatus !== "All"
                ? "No matching complaints found"
                : "No complaints yet"}
            </h3>
            <p className="text-[#7d6954] text-lg">
              {searchQuery || selectedStatus !== "All"
                ? "Try adjusting your search criteria"
                : "You haven't submitted any complaints yet"}
            </p>
          </div>
        )}

        {/* Complaints Table */}
        {!loading && !error && filteredComplaints.length > 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-[#e0c9a9]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#e0c9a9]/20 to-[#d4b88f]/20">
                  <tr>
                    <th className="px-6 py-4 text-center text-sm font-bold text-[#5f4b32] uppercase tracking-wider">
                      Sr.No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#5f4b32] uppercase tracking-wider">
                      <button
                        className="flex items-center gap-2 hover:text-[#7d6954] transition-colors"
                        onClick={() => handleSort("createdAt")}
                      >
                        <Calendar className="w-4 h-4" />
                        Date
                        {sortConfig.key === "createdAt" && (
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              sortConfig.direction === "asc" ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#5f4b32] uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Certificate
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-[#5f4b32] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-[#5f4b32] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0c9a9]/20">
                  {filteredComplaints.map((complaint, index) => {
                    const eventName = getCertificateInfo(
                      complaint,
                      "eventName"
                    );
                    const organization = getCertificateInfo(
                      complaint,
                      "organization"
                    );

                    return (
                      <tr
                        key={complaint._id}
                        className="hover:bg-[#f9f3e8]/50 transition-all duration-200"
                      >
                        <td className="px-6 py-5 text-[#7d6954] text-sm text-center font-medium">
                          {index + 1}
                        </td>
                        <td className="px-6 py-5 text-[#5f4b32] text-sm font-medium whitespace-nowrap">
                          {formatDate(complaint.createdAt)}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col space-y-1">
                            {eventName && (
                              <span className="text-[#5f4b32] text-sm font-semibold">
                                {eventName}
                              </span>
                            )}
                            {organization && (
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-[#7d6954]" />
                                <span className="text-xs text-[#7d6954]">
                                  {organization}
                                </span>
                              </div>
                            )}
                            {!eventName && !organization && (
                              <span className="text-[#7d6954] text-sm italic">
                                Certificate info unavailable
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <StatusBadge status={complaint.status} />
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button
                            onClick={() => handleViewComplaint(complaint)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] 
                                     text-[#5f4b32] rounded-xl hover:from-[#d4b88f] hover:to-[#c8a982] 
                                     transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg
                                     transform hover:scale-105"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#e0c9a9]/30">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-8 pb-6 border-b border-[#e0c9a9]/20">
              <div>
                <h3 className="text-2xl font-bold text-[#5f4b32]">
                  Complaint Details
                </h3>
                <p className="text-[#7d6954] mt-1">
                  {selectedComplaint.displayId}
                </p>
              </div>
              <button
                className="p-2 hover:bg-[#f9f3e8] rounded-full transition-colors"
                onClick={closeComplaintView}
              >
                <X className="w-6 h-6 text-[#7d6954]" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Status Section */}
              <div className="bg-gradient-to-r from-[#e0c9a9]/30 to-[#d4b88f]/40 rounded-2xl p-6 border border-[#c8a982]/40">
                <h4 className="text-lg font-bold text-[#5f4b32] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Complaint Status
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="block text-sm font-semibold text-[#5f4b32] mb-2 uppercase tracking-wider">
                      Current Status
                    </span>
                    <StatusBadge status={selectedComplaint.status} large />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="block text-sm font-semibold text-[#5f4b32] mb-2 uppercase tracking-wider">
                      Submitted On
                    </span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#7d6954]" />
                      <span className="text-[#5f4b32] font-medium">
                        {formatDate(selectedComplaint.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="bg-gradient-to-r from-[#e0c9a9]/30 to-[#d4b88f]/40 rounded-2xl p-6 border border-[#c8a982]/40">
                <h4 className="text-lg font-bold text-[#5f4b32] mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message
                </h4>
                <div className="bg-gradient-to-r from-[#d4b88f]/60 to-[#c8a982]/50 rounded-xl p-4 border border-[#b8a275]/50">
                  <p className="text-[#5f4b32] whitespace-pre-wrap leading-relaxed">
                    {selectedComplaint.message}
                  </p>
                </div>
              </div>

              {/* Certificate Information */}
              <div className="bg-gradient-to-r from-[#e0c9a9]/30 to-[#d4b88f]/40 rounded-2xl p-6 border border-[#c8a982]/40">
                <h4 className="text-lg font-bold text-[#5f4b32] mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certificate Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getCertificateInfo(selectedComplaint, "eventName") && (
                    <div className="bg-gradient-to-r from-[#d4b88f]/60 to-[#c8a982]/50 rounded-xl p-4 border border-[#b8a275]/50">
                      <span className="block text-sm font-semibold text-[#5f4b32] mb-2 uppercase tracking-wider">
                        Event Name
                      </span>
                      <span className="text-[#5f4b32] font-medium">
                        {getCertificateInfo(selectedComplaint, "eventName")}
                      </span>
                    </div>
                  )}
                  {getCertificateInfo(selectedComplaint, "organization") && (
                    <div className="bg-gradient-to-r from-[#d4b88f]/60 to-[#c8a982]/50 rounded-xl p-4 border border-[#b8a275]/50">
                      <span className="block text-sm font-semibold text-[#5f4b32] mb-2 uppercase tracking-wider">
                        Council/Organization
                      </span>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#7d6954]" />
                        <span className="text-[#5f4b32] font-medium">
                          {getCertificateInfo(
                            selectedComplaint,
                            "organization"
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  {!getCertificateInfo(selectedComplaint, "eventName") &&
                    !getCertificateInfo(selectedComplaint, "organization") && (
                      <div className="bg-gradient-to-r from-[#d4b88f]/60 to-[#c8a982]/50 rounded-xl p-4 border border-[#b8a275]/50 col-span-2">
                        <span className="text-[#5f4b32] italic">
                          Certificate information is not available for this
                          complaint.
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-8 pt-4 border-t border-[#e0c9a9]/20">
              <button
                className="px-6 py-3 bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] text-[#5f4b32] 
                         rounded-xl hover:from-[#d4b88f] hover:to-[#c8a982] transition-all duration-300 
                         font-medium shadow-md hover:shadow-lg transform hover:scale-105"
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

const StatusBadge = ({ status, large = false }) => {
  const statusConfig = {
    resolved: {
      color:
        "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200",
      icon: <CheckCircle className={`${large ? "w-5 h-5" : "w-4 h-4"}`} />,
      label: "Resolved",
    },
    open: {
      color:
        "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border-amber-200",
      icon: <AlertCircle className={`${large ? "w-5 h-5" : "w-4 h-4"}`} />,
      label: "Open",
    },
  };

  const config = statusConfig[status] || {
    color:
      "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border-gray-200",
    icon: <Clock className={`${large ? "w-5 h-5" : "w-4 h-4"}`} />,
    label: "Pending",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
        config.color
      } ${large ? "text-sm px-4 py-2" : ""}`}
    >
      {config.icon}
      {config.label}
    </div>
  );
};

export default ComplaintsPage;
