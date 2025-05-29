import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../layout/UserNavbar";
import axios from "axios";

const ReportIssue = () => {
  const { id: certificateId } = useParams();
  const [issueDescription, setIssueDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificateDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("userName");
          navigate("/login");
          return;
        }

        // Fetch certificate details to show what certificate the user is reporting an issue for
        const response = await axios.get(
          `http://localhost:5000/api/certificates`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const certificate = response.data.find(
          (cert) => cert._id === certificateId
        );
        if (certificate) {
          setCertificateDetails(certificate);
        }
      } catch (error) {
        setError("Failed to load certificate details");
        console.error("Error fetching certificate details:", error);
      }
    };

    fetchCertificateDetails();
  }, [certificateId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issueDescription.trim()) {
      setError("Please describe the issue");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/complaints",
        {
          certificateId,
          message: issueDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(true);
      setIssueDescription("");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/user-home");
      }, 2000);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setError(
        error.response?.data?.error ||
          "Failed to submit complaint. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24 flex flex-col items-center">
      <UserNavbar />

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Report Certificate Issue
        </h1>

        {certificateDetails && (
          <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Certificate Details
            </h2>
            <p>
              <span className="font-medium">Event:</span>{" "}
              {certificateDetails.studentData?.eventName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Council:</span>{" "}
              {certificateDetails.collectionId?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(certificateDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {success ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
            Your complaint has been submitted successfully. You will be
            redirected shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="issueDescription"
                className="block text-gray-700 font-medium mb-2"
              >
                Issue Description:
              </label>
              <textarea
                id="issueDescription"
                rows="5"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Describe what is incorrect about this certificate"
                required
                className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/user-home")}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportIssue;
