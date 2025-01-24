// ComplaintsPage.js
import React from "react";

const ComplaintsPage = () => {
  const complaints = [
    { srNo: 1, complaintId: "C001", date: "2023-12-01", status: "Under Review" },
    { srNo: 2, complaintId: "C002", date: "2023-12-05", status: "Corrected" },
    { srNo: 3, complaintId: "C003", date: "2023-12-10", status: "Issued" },
  ];

  return (
    <div className="complaints-page">
      <h1>Your Complaints</h1>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Complaint ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.complaintId}>
              <td>{complaint.srNo}</td>
              <td>{complaint.complaintId}</td>
              <td>{complaint.date}</td>
              <td>{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsPage;
