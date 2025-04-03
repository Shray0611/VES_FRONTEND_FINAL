import React, { useState } from "react";
import IssuerNavbar from "./IssuerNavbar";

const ComplaintsView = () => {
  // Dummy complaints data for demonstration
  const complaints = [
    {
      id: 1,
      complaintId: "#COMP-789",
      email: "user1@example.com",
      date: "2023-07-17",
      status: "Pending",
      report: "The certificate has a wrong signature and incorrect details.",
    },
    {
      id: 2,
      complaintId: "#COMP-790",
      email: "user2@example.com",
      date: "2023-07-18",
      status: "Under Review",
      report: "Error in the certificate: details are not matching the records.",
    },
    {
      id: 3,
      complaintId: "#COMP-791",
      email: "user3@example.com",
      date: "2023-07-19",
      status: "Resolved",
      report: "Certificate generated with wrong serial number and typos in name.",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  // Filter complaints based on complaintId search
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.complaintId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  const handleUpdateStatus = (complaintId) => {
    setUpdatedStatuses((prev) => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <IssuerNavbar />
      <div className="max-w-7xl mx-auto mt-8">
        {/* Centered Header Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[#1e293b]">
            Complaints History
          </h1>
          <p className="text-[#64748b] mt-1 text-sm">
            {complaints.length} registered cases
          </p>
          <div className="mt-4 relative w-full sm:w-auto max-w-sm">
            <input
              type="text"
              placeholder="Search complaint ID..."
              className="pl-4 pr-4 py-2 rounded-lg border border-[#edf2f7] bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-[#475569] placeholder-[#a0aec0] text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Centered Complaints Table */}
        <div className="bg-white rounded-lg border border-[#edf2f7] overflow-hidden shadow-sm mx-auto w-full max-w-4xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f8fafc]">
                <tr>
                  <th className="w-16 py-3 text-sm font-medium text-[#64748b]">
                    Sr.No
                  </th>
                  <th className="w-32 py-3 text-sm font-medium text-[#64748b]">
                    Complaint ID
                  </th>
                  <th className="min-w-[140px] py-3 text-sm font-medium text-[#64748b]">
                    Email ID
                  </th>
                  <th className="min-w-[100px] py-3 text-sm font-medium text-[#64748b]">
                    Date
                  </th>
                  <th className="w-48 py-3 text-sm font-medium text-[#64748b]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {filteredComplaints.map((complaint, index) => (
                  <tr
                    key={complaint.id}
                    className="hover:bg-[#e2e8f0] transition-colors"
                  >
                    <td className="py-3 text-[#475569] text-sm text-center">
                      {index + 1}
                    </td>
                    <td className="py-3 text-[#1e293b] text-sm font-medium text-center">
                      {complaint.complaintId}
                    </td>
                    <td className="py-3 text-[#475569] text-sm text-center">
                      {complaint.email}
                    </td>
                    <td className="py-3 text-[#475569] text-sm text-center">
                      {new Date(complaint.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 text-sm">
                      <div className="flex justify-center gap-2 items-center">
                        <button
                          onClick={() => openModal(complaint)}
                          className="bg-[#334155] text-white px-3 py-1.5 rounded-lg hover:bg-[#475569] transition-colors text-sm whitespace-nowrap"
                        >
                          View Report
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(complaint.id)}
                          className={`px-3 py-1.5 rounded-lg transition-colors font-medium text-sm whitespace-nowrap ${
                            updatedStatuses[complaint.id]
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          {updatedStatuses[complaint.id]
                            ? "Updated"
                            : "Update"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredComplaints.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#64748b] text-sm">
                No matching complaints found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup for Viewing Report */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-[#1e293b] mb-4">
              Complaint Report {selectedComplaint.complaintId}
            </h2>
            <p className="text-[#475569] mb-4">
              {selectedComplaint.report}
            </p>
            <button
              onClick={closeModal}
              className="bg-[#334155] text-white px-4 py-2 rounded-lg hover:bg-[#475569] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsView;