import React from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "./UserNavbar";  // Import UserNavbar

const ComplaintView = ({ onLogout }) => {
  const { id } = useParams(); // Get complaint ID from URL
  const complaint = {
    id,
    description: "This is a description of the complaint.", // Add complaint details
    status: "Under Review",
  };

  return (
    <div className="complaint-view">
      {/* Include UserNavbar here */}
      <UserNavbar onLogout={onLogout} />

      <h1>Complaint ID: {complaint.id}</h1>
      <p><strong>Status:</strong> {complaint.status}</p>
      <p><strong>Description:</strong> {complaint.description}</p>
      <button>Update Status</button> {/* This can be used to change the status */}
    </div>
  );
};

export default ComplaintView;
