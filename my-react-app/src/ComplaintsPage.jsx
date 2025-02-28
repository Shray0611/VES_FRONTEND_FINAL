// ComplaintsPage.js
import React from "react";

const ComplaintsPage = () => {
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
      </table>
    </div>
  );
};

export default ComplaintsPage;