import React from "react";
import UserNavbar from "./UserNavbar";

const ComplaintsPage = () => {
  const complaints = [
    { id: 1, complaintId: "#COMP-789", date: "2023-07-17", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light text-[#1e293b] mb-8">
          Complaints History
        </h1>
        <UserNavbar></UserNavbar>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#edf2f7]">
          <table className="w-full">
            <thead className="bg-[#f8fafc]">
              <tr>
                {["Sr.No", "Complaint ID", "Date", "Status"].map((header) => (
                  <th 
                    key={header}
                    className="px-6 py-4 text-left text-sm font-normal text-[#64748b]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-[#f8fafc]">
                  <td className="px-6 py-4 text-[#475569]">{complaint.id}</td>
                  <td className="px-6 py-4 font-medium text-[#1e293b]">
                    {complaint.complaintId}
                  </td>
                  <td className="px-6 py-4 text-[#475569]">{complaint.date}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={complaint.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs 
    ${
      {
        Resolved: "bg-green-100 text-green-700",
        "In Progress": "bg-amber-100 text-amber-700",
        Pending: "bg-blue-100 text-blue-700",
      }[status]
    }`}
  >
    {status}
  </span>
);

export default ComplaintsPage;
