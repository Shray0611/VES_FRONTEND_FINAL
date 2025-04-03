import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const ReportIssue = () => {
  const [issueDescription, setIssueDescription] = useState("");
  const navigate = useNavigate();
  // hello
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Issue reported: ${issueDescription}`);
    navigate("/user-home");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full border border-gray-200">
        <UserNavbar></UserNavbar>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Issue Reporting Form
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="issueDescription"
              className="block text-black font-medium mb-2"
            >
              Issue Description:
            </label>
            <textarea
              id="issueDescription"
              rows="5"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Describe the issue with the certificate"
              required
              className="w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full font-medium"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
