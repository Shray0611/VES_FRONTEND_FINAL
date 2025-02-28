import React, { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";

const ComplaintsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const complaints = [
    { id: 1, complaintId: "#COMP-789", date: "2023-07-17", status: "Pending" },
    { id: 2, complaintId: "#COMP-790", date: "2023-07-18", status: "Resolved" },
    {
      id: 3,
      complaintId: "#COMP-791",
      date: "2023-07-19",
      status: "In Progress",
    },
    { id: 4, complaintId: "#COMP-792", date: "2023-07-20", status: "Pending" },
    { id: 5, complaintId: "#COMP-793", date: "2023-07-21", status: "Resolved" },
  ];

  const filteredComplaints = complaints
    .filter(
      (complaint) =>
        complaint.complaintId
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        (selectedStatus === "All" || complaint.status === selectedStatus)
    )
    .sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return sortConfig.direction === "asc" ? a.id - b.id : b.id - a.id;
    });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Complaints History
            </h1>
            <p className="text-gray-500 mt-1 text-sm">5 registered cases</p>
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
              <option>Pending</option>
              <option>Resolved</option>
              <option>In Progress</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Sr.No", "Complaint ID", "Date", "Status"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-medium text-gray-600 cursor-pointer"
                      onClick={() =>
                        handleSort(header === "Date" ? "date" : "id")
                      }
                    >
                      <div className="flex items-center gap-1.5">
                        {header}
                        {sortConfig.key ===
                          (header === "Date" ? "date" : "id") && (
                          <FiChevronDown
                            className={`text-gray-500 transition-transform ${
                              sortConfig.direction === "asc" ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {complaint.id}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-sm font-medium">
                      {complaint.complaintId}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">
                      {new Date(complaint.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={complaint.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                No matching complaints found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Resolved: { color: "green", icon: <FiCheckCircle className="w-4 h-4" /> },
    "In Progress": { color: "amber", icon: <FiClock className="w-4 h-4" /> },
    Pending: { color: "blue", icon: <FiAlertCircle className="w-4 h-4" /> },
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium 
      bg-${statusConfig[status].color}-50 text-${statusConfig[status].color}-700`}
    >
      {statusConfig[status].icon}
      {status}
    </div>
  );
};

export default ComplaintsPage;
