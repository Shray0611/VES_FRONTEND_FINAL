import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../layout/UserNavbar";
import { saveAs } from "file-saver";
import axios from "axios";

const UserHome = ({ onLogout }) => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [actionLoading, setActionLoading] = useState({
    view: false,
    download: false,
    complaint: false,
  });
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      if (storedName.endsWith("@ves.ac.in")) {
        // Extract the name part (e.g., 2022.avan.shetty@ves.ac.in -> avan.shetty)
        const namePart = storedName.split("@")[0].split(".").slice(1).join(".");
        // Take only the first name (avan.shetty -> avan)
        const firstNamePart = namePart.split(".")[0];
        // Capitalize the first name (avan -> Avan)
        const formattedFirstName =
          firstNamePart.charAt(0).toUpperCase() + firstNamePart.slice(1);
        setFirstName(formattedFirstName || "User");
      } else {
        // If not a ves.ac.in email, use the stored name as-is
        setFirstName(storedName);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/certificates",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCertificates(response.data);
      } catch (error) {
        setError(
          "Failed to load certificates: " +
            (error.response?.data?.error || error.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [navigate]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleView = async (certificateId) => {
    try {
      setActionLoading((prev) => ({ ...prev, view: true }));
      setError("");

      // Cleanup previous preview URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/certificates/${certificateId}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const url = URL.createObjectURL(response.data);
      setPreviewUrl(url);
    } catch (error) {
      setError(
        "Failed to load certificate: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, view: false }));
    }
  };

  const handleDownload = async (certificateId) => {
    try {
      setActionLoading((prev) => ({ ...prev, download: true }));
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/certificates/${certificateId}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Get the certificate details to use in filename
      const cert = certificates.find((c) => c._id === certificateId);
      const eventName = cert?.studentData?.eventName || "certificate";
      const filename = `${eventName}-${certificateId}.png`;

      saveAs(response.data, filename);
    } catch (error) {
      setError(
        "Download failed: " + (error.response?.data?.error || error.message)
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, download: false }));
    }
  };

  const handleComplaint = (certificateId) => {
    navigate(`/report-issue/${certificateId}`);
  };

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 pt-24 flex flex-col items-center">
        <UserNavbar onLogout={handleLogout} />
        <div className="text-xl text-gray-600">Loading certificates...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24 flex flex-col items-center">
      <UserNavbar onLogout={handleLogout} />

      <h1 className="text-gray-800 text-3xl font-bold mb-4">
        Welcome, {firstName}!
      </h1>
      <h2 className="text-gray-700 text-2xl font-semibold mb-8">
        Your Certificates
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg w-full max-w-6xl text-center">
          {error}
        </div>
      )}

      <div className="w-full max-w-6xl bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200">
        {certificates.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No certificates found
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-center text-gray-700">Event</th>
                <th className="p-4 text-center text-gray-700">Council</th>
                <th className="p-4 text-center text-gray-700">Event Date</th>
                <th className="p-4 text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr
                  key={cert._id}
                  className="border-t border-gray-300 hover:bg-gray-200"
                >
                  <td className="p-4 text-center text-gray-600 font-medium">
                    {cert.studentData.eventName || "N/A"}
                  </td>
                  <td className="p-4 text-center text-gray-600">
                    {cert.collectionId?.name || "N/A"}
                  </td>
                  <td className="p-4 text-center text-gray-600">
                    {new Date(cert.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleView(cert._id)}
                        disabled={actionLoading.view}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
                      >
                        {actionLoading.view ? "Loading..." : "View"}
                      </button>
                      <button
                        onClick={() => handleDownload(cert._id)}
                        disabled={actionLoading.download}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
                      >
                        {actionLoading.download ? "Downloading..." : "Download"}
                      </button>
                      <button
                        onClick={() => handleComplaint(cert._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
                      >
                        Raise Complaint
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl">
            <div className="flex justify-end mb-4">
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <img
              src={previewUrl}
              alt="Certificate Preview"
              className="max-h-[80vh] max-w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
