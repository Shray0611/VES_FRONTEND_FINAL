import React, { useState, useEffect } from "react";
import IssuerNavbar from "../layout/IssuerNavbar";
import { useNavigate } from "react-router-dom";

const IssuerRecords = ({ onLogout }) => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch collections data
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("userName");
          navigate("/login");
          return;
        }

        // Using the correct endpoint from server.js
        const response = await fetch("http://localhost:5000/api/collections", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch collections (${response.status})`);
        }

        const data = await response.json();
        console.log("Collections data:", data);
        setCollections(data);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError(`${err.message}. Using sample data for development.`);
        // Enhanced sample data with more realistic structure
        setCollections([
          {
            _id: "1",
            name: "Invictus 2023",
            date: "2023-04-15",
            certificates: [
              { _id: "cert1" },
              { _id: "cert2" },
              { _id: "cert3" },
            ],
            createdAt: "2023-04-01",
          },
          {
            _id: "2",
            name: "Dalal Street Competition",
            date: "2023-05-20",
            certificates: [{ _id: "cert4" }, { _id: "cert5" }],
            createdAt: "2023-05-01",
          },
          {
            _id: "3",
            name: "Annual Tech Symposium",
            date: "2023-06-10",
            certificates: [{ _id: "cert6" }],
            createdAt: "2023-06-01",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      navigate("/login");
    }
  }, [navigate]);

  const handleViewCollection = (collection) => {
    navigate(`/event-view/${collection._id}`, {
      state: {
        collectionId: collection._id,
        collectionName: collection.name,
      },
    });
  };

  const handleDeleteCollection = async (collectionId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/collections/${collectionId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        // Try to parse JSON error, but fallback to status text if it fails
        try {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `Server returned ${response.status}`
          );
        } catch (jsonError) {
          throw new Error(
            `Failed to delete event. Server returned status: ${response.status} ${response.statusText}`
          );
        }
      }

      setCollections((prev) => prev.filter((c) => c._id !== collectionId));
    } catch (err) {
      alert("Failed to delete event: " + err.message);
    }
  };

  const handleDownloadCollection = async (collectionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/collections/${collectionId}/certificates/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        // Try to parse JSON error, but fallback to status text if it fails
        try {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `Server returned ${response.status}`
          );
        } catch (jsonError) {
          throw new Error(
            `Failed to download collection. Server returned status: ${response.status} ${response.statusText}`
          );
        }
      }

      // The backend sends a zip file, so we get the blob and create a download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // Get collection name for filename, fallback to ID
      const collection = collections.find((c) => c._id === collectionId);
      const filename = `${
        collection?.name.replace(/\s+/g, "_") || collectionId
      }_certificates.zip`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download collection: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      {/* Top Navbar */}
      <IssuerNavbar />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="issuer-home-header text-4xl font-bold text-[#1e293b] mb-2 transition-all duration-300 hover:text-[#0f172a]">
            Welcome, Issuer!
          </h1>
          <p className="text-[#64748b] text-lg transition-colors duration-300 hover:text-[#475569]">
            Manage your certificate events and activities
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#edf2f7]">
          <div className="p-6 border-b border-[#edf2f7] flex justify-between items-center">
            <h2 className="text-xl font-medium text-[#1e293b]">Your Events</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#e0c9a9] border-t-[#5f4b32]"></div>
              <p className="mt-2 text-[#64748b]">Loading events...</p>
            </div>
          ) : collections.length === 0 ? (
            <div className="p-8 text-center text-[#64748b]">
              No events found. Create your first event to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    {[
                      "No.",
                      "Event Name",
                      "Created Date",
                      "Certificates",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className={`px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide ${
                          header === "Actions" ? "text-center" : ""
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf2f7]">
                  {collections.map((collection, index) => (
                    <tr
                      key={collection._id}
                      className="transition-colors duration-200 hover:bg-[#e2e8f0] hover:shadow-md"
                    >
                      <td className="px-6 py-4 text-[#475569]">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-[#1e293b]">
                        {collection.eventName || collection.name}
                      </td>
                      <td className="px-6 py-4 text-[#475569]">
                        {new Date(collection.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-[#475569]">
                        {collection.certificates?.length || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center ml-8 gap-3">
                          <button
                            onClick={() => handleViewCollection(collection)}
                            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                            title="View Certificates"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>View</span>
                          </button>
                          <button
                            onClick={() =>
                              handleDownloadCollection(collection._id)
                            }
                            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                            title="Download All Certificates"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCollection(collection._id)
                            }
                            className="text-red-600 hover:text-red-700 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                            title="Delete Event"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssuerRecords;
