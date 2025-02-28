import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ReportIssue.css'; // Import the CSS file


const ReportIssue = () => {
  const [issueDescription, setIssueDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle form submission, e.g., sending the issue to a server
    alert(`Issue reported: ${issueDescription}`);
    // Redirect back to the user home page or any other page after reporting the issue
    navigate("/user-home");
  };

  return (
    <div className="report-issue">
      <h1>Report an Issue</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="issueDescription">Describe the issue:</label>
        <textarea
          id="issueDescription"
          rows="5"
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          placeholder="Describe the issue with the certificate"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportIssue;
