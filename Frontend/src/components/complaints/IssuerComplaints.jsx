import React, { useEffect, useState } from "react";
import axios from "axios";
import IssuerNavbar from "../layout/IssuerNavbar";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Calendar,
  User,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
  Loader2,
  Clock,
  Badge,
  Search,
} from "lucide-react";

const IssuerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/complaints/issuer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const sortedComplaints = response.data
          .slice()
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const complaintsWithId = sortedComplaints.map((complaint, index) => ({
          ...complaint,
          complaintId: `COMP#${index + 1}`,
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

    fetchComplaints();
  }, []);

  const handleViewReport = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeReport = () => {
    setSelectedComplaint(null);
  };

  const handleUpdateStatus = async (complaintId, newStatus) => {
    try {
      setActionLoading(complaintId);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/complaints/${complaintId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComplaints(
        complaints.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, status: newStatus }
            : complaint
        )
      );

      if (selectedComplaint && selectedComplaint._id === complaintId) {
        setSelectedComplaint({ ...selectedComplaint, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
      setError("Failed to update complaint status");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getStudentName = (complaint) => {
    let name = complaint.certificateId?.studentData?.name;
    if (name && name.trim() !== "") return name;

    const email = complaint.userId?.email;
    if (email && email.includes("@")) {
      const local = email.split("@")[0];
      const parts = local.split(".");
      const nameParts =
        parts.length > 2 && /^\d+$/.test(parts[0]) ? parts.slice(1) : parts;
      return nameParts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
    }
    return "Unknown Student";
  };

  const getEventName = (complaint) => {
    if (complaint.certificateId?.studentData?.eventName)
      return complaint.certificateId.studentData.eventName;
    if (complaint.certificateId?.collectionId?.eventName)
      return complaint.certificateId.collectionId.eventName;
    return "N/A";
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] flex flex-col">
        <IssuerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-[#e0c9a9]/30 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader2 className="w-12 h-12 text-[#e0c9a9] mx-auto mb-4 animate-spin" />
            <p className="text-xl text-[#5f4b32] font-medium">
              Loading complaints...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] p-6 pt-24">
      <IssuerNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5f4b32] mb-4">
            Complaints Management
          </h1>
          <p className="text-[#7d6954] text-lg md:text-xl max-w-2xl mx-auto">
            Review and manage certificate-related complaints
          </p>
        </motion.div>

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

        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-[#e0c9a9]/30 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-[#5f4b32]" />
                <h2 className="text-2xl font-bold text-[#5f4b32]">
                  Received Complaints ({complaints.length})
                </h2>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Complaint ID or Email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-md border border-[#e0c9a9]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e0c9a9] text-[#5f4b32] w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7d6954]" />
              </div>
            </div>
          </div>

          {filteredComplaints.length === 0 ? (
            searchQuery ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <MessageSquare className="w-16 h-16 text-[#e0c9a9] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#5f4b32] mb-2">
                  No complaints match your search
                </h3>
                <p className="text-[#7d6954]">
                  Try adjusting your search terms
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <MessageSquare className="w-16 h-16 text-[#e0c9a9] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#5f4b32] mb-2">
                  No complaints received
                </h3>
                <p className="text-[#7d6954]">
                  All your certificates are working perfectly!
                </p>
              </motion.div>
            )
          ) : (
            <div className="p-8">
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e0c9a9]/30">
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        #
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Complaint ID
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Email ID
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Date
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Status
                      </th>
                      <th className="text-center py-4 px-6 text-[#5f4b32] font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint, index) => (
                      <motion.tr
                        key={complaint._id}
                        className="border-b border-[#e0c9a9]/20 hover:bg-[#f8e5c5]/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-4 px-6 text-[#7d6954] font-medium">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-[#5f4b32]">
                            {complaint.complaintId}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[#7d6954]">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {complaint.userId?.email || "Unknown"}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[#7d6954]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(complaint.createdAt)}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              complaint.status === "open"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {complaint.status === "open" ? (
                              <Clock className="w-3 h-3 mr-1" />
                            ) : (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center">
                            <motion.button
                              onClick={() => handleViewReport(complaint)}
                              className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Eye className="w-4 h-4" />
                              View Report
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden space-y-4">
                {filteredComplaints.map((complaint, index) => (
                  <motion.div
                    key={complaint._id}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#e0c9a9]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#5f4b32] text-lg">
                            {complaint.complaintId}
                          </h3>
                          <div className="flex items-center gap-2 text-[#7d6954] text-sm mt-1">
                            <Mail className="w-4 h-4" />
                            {complaint.userId?.email || "Unknown"}
                          </div>
                          <div className="flex items-center gap-2 text-[#7d6954] text-sm mt-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(complaint.createdAt)}
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            complaint.status === "open"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {complaint.status === "open" ? (
                            <Clock className="w-3 h-3 mr-1" />
                          ) : (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {complaint.status}
                        </span>
                      </div>

                      <motion.button
                        onClick={() => handleViewReport(complaint)}
                        className="w-full bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-4 h-4" />
                        View Report
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {selectedComplaint && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e0c9a9]/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] px-8 py-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#5f4b32] flex items-center gap-3">
                  <Badge className="w-6 h-6" />
                  Complaint Report - {selectedComplaint.complaintId}
                </h3>
                <motion.button
                  className="text-[#5f4b32] hover:text-[#4a3a26] text-2xl p-2 rounded-xl hover:bg-white/30 transition-all"
                  onClick={closeReport}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-[#f8e5c5]/30 to-[#f1d5a4]/30 rounded-2xl p-6 border border-[#e0c9a9]/30">
                <h4 className="text-xl font-semibold text-[#5f4b32] mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Complaint Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <span className="block font-semibold text-[#7d6954] text-sm">
                      Status:
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                        selectedComplaint.status === "open"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedComplaint.status === "open" ? (
                        <Clock className="w-4 h-4 mr-1" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      {selectedComplaint.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block font-semibold text-[#7d6954] text-sm">
                      Date Submitted:
                    </span>
                    <span className="text-[#5f4b32] font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedComplaint.createdAt)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block font-semibold text-[#7d6954] text-sm">
                      Reported By:
                    </span>
                    <span className="text-[#5f4b32] font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedComplaint.userId?.email || "Unknown User"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 rounded-2xl p-6 border border-[#e0c9a9]/30">
                <h4 className="text-xl font-semibold text-[#5f4b32] mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message
                </h4>
                <div className="bg-gradient-to-r from-[#f8e5c5]/20 to-[#f1d5a4]/20 rounded-xl p-4 border border-[#e0c9a9]/20">
                  <p className="text-[#5f4b32] whitespace-pre-wrap leading-relaxed">
                    {selectedComplaint.message}
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-2xl p-6 border border-[#e0c9a9]/30">
                <h4 className="text-xl font-semibold text-[#5f4b32] mb-4 flex items-center gap-2">
                  <Badge className="w-5 h-5" />
                  Certificate Information
                </h4>
                <div className="bg-gradient-to-r from-[#f8e5c5]/20 to-[#f1d5a4]/20 rounded-xl p-4 border border-[#e0c9a9]/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <span className="block font-semibold text-[#7d6954] text-sm">
                        Certificate ID:
                      </span>
                      <span className="text-[#5f4b32] font-mono text-sm break-all">
                        {selectedComplaint.certificateId?._id || "N/A"}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="block font-semibold text-[#7d6954] text-sm">
                        Student Name:
                      </span>
                      <span className="text-[#5f4b32] font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {getStudentName(selectedComplaint)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="block font-semibold text-[#7d6954] text-sm">
                        Event Name:
                      </span>
                      <span className="text-[#5f4b32] font-medium">
                        {getEventName(selectedComplaint)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                {selectedComplaint.status === "open" ? (
                  <motion.button
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    onClick={() =>
                      handleUpdateStatus(selectedComplaint._id, "resolved")
                    }
                    disabled={actionLoading === selectedComplaint._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {actionLoading === selectedComplaint._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Mark as Resolved
                  </motion.button>
                ) : (
                  <motion.button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    onClick={() =>
                      handleUpdateStatus(selectedComplaint._id, "open")
                    }
                    disabled={actionLoading === selectedComplaint._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {actionLoading === selectedComplaint._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    Reopen Complaint
                  </motion.button>
                )}
                <motion.button
                  className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-3 px-6 rounded-xl transition-all duration-200"
                  onClick={closeReport}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default IssuerComplaints;
