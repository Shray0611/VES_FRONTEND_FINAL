import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IssuerNavbar from "../layout/IssuerNavbar";

const IssuerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

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

        // Add a complaint ID to each complaint for display
        const complaintsWithId = response.data.map((complaint, index) => ({
          ...complaint,
          complaintId: `#COMP-${789 + index}`,
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
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/complaints/${complaintId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the complaint in the local state
      setComplaints(
        complaints.map((complaint) =>
          complaint._id === complaintId
            ? { ...complaint, status: newStatus }
            : complaint
        )
      );

      // Update selected complaint if it's the one being viewed
      if (selectedComplaint && selectedComplaint._id === complaintId) {
        setSelectedComplaint({ ...selectedComplaint, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
      alert("Failed to update complaint status");
    }
  };

  // Format date to display in the table
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Helper function to safely access nested properties
  const getStudentName = (complaint) => {
    try {
      return complaint.certificateId?.studentData?.name || "Unknown Student";
    } catch (e) {
      return "Unknown Student";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6 pt-20">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Received Complaints
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/issuer-home"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/generate"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Create Certificate
              </Link>
              <Link
                to="/complaints-view"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Complaints
              </Link>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <div className="text-xl text-gray-600">Loading complaints...</div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          {!loading && !error && complaints.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-lg text-gray-600">
                No complaints have been received yet.
              </p>
            </div>
          )}

          {!loading && !error && complaints.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      Sr.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Complaint ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email ID
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Date
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
                  {complaints.map((complaint, index) => (
                    <tr
                      key={complaint._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        {complaint.complaintId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.userId?.email || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {formatDate(complaint.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            complaint.status === "open"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                          onClick={() => handleViewReport(complaint)}
                        >
                          View Report
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

      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Complaint Report - {selectedComplaint.complaintId}
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                onClick={closeReport}
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Complaint Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div>
                    <span className="block font-semibold text-gray-500 mb-1">
                      Status:
                    </span>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedComplaint.status === "open"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedComplaint.status}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-500 mb-1">
                      Date Submitted:
                    </span>
                    <span className="text-gray-700">
                      {formatDate(selectedComplaint.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-500 mb-1">
                      Reported By:
                    </span>
                    <span className="text-gray-700">
                      {selectedComplaint.userId?.email || "Unknown User"}
                    </span>
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
                      Certificate ID:
                    </span>
                    <span className="text-gray-700 break-all">
                      {selectedComplaint.certificateId?._id || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-500 mb-1">
                      Student Name:
                    </span>
                    <span className="text-gray-700">
                      {getStudentName(selectedComplaint)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              {selectedComplaint.status === "open" ? (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  onClick={() =>
                    handleUpdateStatus(selectedComplaint._id, "resolved")
                  }
                >
                  Mark as Resolved
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  onClick={() =>
                    handleUpdateStatus(selectedComplaint._id, "open")
                  }
                >
                  Reopen Complaint
                </button>
              )}
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={closeReport}
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

export default IssuerComplaints;
