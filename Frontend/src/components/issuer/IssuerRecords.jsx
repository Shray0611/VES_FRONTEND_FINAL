import React, { useState, useEffect } from "react";
import IssuerNavbar from "../layout/IssuerNavbar";
import { useNavigate } from "react-router-dom";

const IssuerRecords = ({ onLogout }) => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          navigate("/login");
          return;
        }

        try {
          // Try fetching from API first
          const response = await fetch(
            "http://localhost:5000/api/collections",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
          }

          const data = await response.json();

          // Format the collections data with additional information
          const formattedCollections = data.map((collection) => ({
            id: collection._id,
            name: collection.name || "Unnamed Collection",
            date: new Date(collection.createdAt).toLocaleDateString(),
            count: collection.certificates?.length || 0,
          }));

          setCollections(formattedCollections);
          console.log("Collections fetched from API:", formattedCollections);
        } catch (err) {
          console.error("API fetch failed, using static data:", err);

          // Fallback to predefined data
          const formattedCollections = [
            {
              id: "1",
              name: "VESIT Annual Ceremony 2024",
              date: new Date().toLocaleDateString(),
              count: 56,
            },
            {
              id: "2",
              name: "Hackathon Winners Spring 2024",
              date: new Date().toLocaleDateString(),
              count: 12,
            },
            {
              id: "3",
              name: "Cultural Festival Participants",
              date: new Date().toLocaleDateString(),
              count: 38,
            },
          ];

          setCollections(formattedCollections);
          console.log("Using predefined collection data");
        }
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      {/* Top Navbar */}
      <IssuerNavbar />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-12 mt-16">
          <h1 className="issuer-home-header text-4xl font-bold text-[#1e293b] mb-2 transition-all duration-300 hover:text-[#0f172a]">
            Certificate Collections
          </h1>
          <p className="text-[#64748b] text-lg transition-colors duration-300 hover:text-[#475569]">
            Manage your certificate collections and events
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/generate")}
            className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Generate New Certificates
          </button>
          <button
            onClick={() => navigate("/admin/certificates")}
            className="bg-[#5f4b32] hover:bg-[#4a3a27] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Manage All Certificates
          </button>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#edf2f7]">
          <div className="p-6 border-b border-[#edf2f7]">
            <h2 className="text-xl font-medium text-[#1e293b]">
              Your Collections
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading collections...
            </div>
          ) : collections.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No certificate collections found. Generate certificates to create
              collections.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    {[
                      "No.",
                      "Collection Name",
                      "Date Created",
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
                      key={collection.id}
                      className="transition-colors duration-200 hover:bg-[#e2e8f0] hover:shadow-md"
                    >
                      <td className="px-6 py-4 text-[#475569]">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-[#1e293b]">
                        {collection.name}
                      </td>
                      <td className="px-6 py-4 text-[#475569]">
                        {collection.date}
                      </td>
                      <td className="px-6 py-4 text-[#475569]">
                        {collection.count}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center ml-8 gap-3">
                          <button
                            onClick={() => navigate(`/admin/certificates`)}
                            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                            title="View Details"
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
                            onClick={() => navigate("/generate")}
                            className="text-green-600 hover:text-green-700 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                            title="Generate More"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Generate More</span>
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
