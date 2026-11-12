import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../layout/UserNavbar";
import axios from "axios";
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Calendar,
  ArrowLeft,
} from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] flex flex-col">
      <UserNavbar />

      <div className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e0c9a9] rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-[#5f4b32]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#5f4b32] mb-2">
              Report Certificate Issue
            </h1>
            <p className="text-[#7d6954] text-lg">
              Help us resolve any problems with your certificate
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-6 border border-[#e0c9a9]/30">
            {/* Certificate Details Card */}
            {certificateDetails && (
              <div className="mb-6 bg-gradient-to-r from-[#f8e5c5] to-[#e0c9a9]/50 rounded-2xl p-4 border border-[#e0c9a9]/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/70 p-2 rounded-lg">
                    <FileText className="w-4 h-4 text-[#5f4b32]" />
                  </div>
                  <h2 className="text-lg font-bold text-[#5f4b32]">
                    Certificate Details
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-12">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/50 p-1.5 rounded-lg">
                      <FileText className="w-3 h-3 text-[#7d6954]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#5f4b32]">
                        Event Name
                      </p>
                      <p className="text-sm text-[#7d6954] font-semibold truncate max-w-[200px]">
                        {certificateDetails.studentData?.eventName || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-white/50 p-1.5 rounded-lg">
                      <Calendar className="w-3 h-3 text-[#7d6954]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#5f4b32]">
                        Issue Date
                      </p>
                      <p className="text-sm text-[#7d6954] font-semibold">
                        {new Date(
                          certificateDetails.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Report Submitted Successfully!
                </h3>
                <p className="text-green-600 mb-4">
                  Your complaint has been submitted. We'll review it shortly and
                  get back to you.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-700">
                    Redirecting you back to the dashboard...
                  </p>
                </div>
              </div>
            ) : (
              /* Report Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Error</h4>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Issue Description */}
                <div>
                  <label
                    htmlFor="issueDescription"
                    className="block text-[#5f4b32] font-semibold mb-3 text-lg"
                  >
                    Describe the Issue
                  </label>
                  <textarea
                    id="issueDescription"
                    rows="6"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Please provide detailed information about what's incorrect with your certificate. Include specific details like names, dates, or other elements that need correction..."
                    required
                    className="w-full bg-white/70 text-[#5f4b32] border-2 border-[#e0c9a9]/50 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4b88f] focus:ring-2 focus:ring-[#e0c9a9]/20 transition-all duration-200 placeholder-[#7d6954]/60 resize-none"
                    disabled={loading}
                  />
                  <p className="text-sm text-[#7d6954] mt-2">
                    The more details you provide, the faster we can resolve your
                    issue.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/user-home")}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/70 text-[#7d6954] border-2 border-[#e0c9a9]/50 rounded-xl hover:bg-white hover:border-[#d4b88f] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#e0c9a9] text-[#5f4b32] rounded-xl hover:bg-[#d4b88f] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#5f4b32]/30 border-t-[#5f4b32] rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        Submit Report
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
