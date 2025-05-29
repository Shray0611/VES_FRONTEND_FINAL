import React, { useState, useEffect } from "react";
import IssuerNavbar from "../layout/IssuerNavbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  Download,
  Trash2,
  Calendar,
  FileText,
  Users,
  Loader2,
  AlertCircle,
  Plus,
} from "lucide-react";

const IssuerRecords = ({ onLogout }) => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState({
    delete: null,
    download: null,
  });

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
      setActionLoading((prev) => ({ ...prev, delete: collectionId }));
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
      setError("Failed to delete event: " + err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, delete: null }));
    }
  };

  const handleDownloadCollection = async (collectionId) => {
    try {
      setActionLoading((prev) => ({ ...prev, download: collectionId }));
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
      setError("Failed to download collection: " + err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, download: null }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] flex flex-col">
        <IssuerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-[#e0c9a9]/30 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Loader2 className="w-12 h-12 text-[#e0c9a9] mx-auto mb-4 animate-spin" />
            <p className="text-xl text-[#5f4b32] font-medium">
              Loading your events...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] p-6 pt-24">
      {/* Top Navbar */}
      <IssuerNavbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5f4b32] mb-4">
            Welcome, Issuer!
          </h1>
          <p className="text-[#7d6954] text-lg md:text-xl max-w-2xl mx-auto">
            Manage your certificate events and track your activities
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            className="mb-8 bg-red-50/80 backdrop-blur-md border border-red-200 rounded-2xl p-4 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Events Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-[#e0c9a9]/30 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Section Header */}
          <div className="bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#5f4b32]" />
                <h2 className="text-2xl font-bold text-[#5f4b32]">
                  Your Events ({collections.length})
                </h2>
              </div>
            </div>
          </div>

          {collections.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FileText className="w-16 h-16 text-[#e0c9a9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#5f4b32] mb-2">
                No events found
              </h3>
              <p className="text-[#7d6954] mb-6">
                Create your first event to start issuing certificates
              </p>
              <motion.button
                onClick={handleCreateEvent}
                className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Create Your First Event
              </motion.button>
            </motion.div>
          ) : (
            <div className="p-8">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e0c9a9]/30">
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        #
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Event Name
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Created Date
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Certificates
                      </th>
                      <th className="text-center py-4 px-6 text-[#5f4b32] font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {collections.map((collection, index) => (
                      <motion.tr
                        key={collection._id}
                        className="border-b border-[#e0c9a9]/20 hover:bg-[#f8e5c5]/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-4 px-6 text-[#7d6954] font-medium">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-[#5f4b32]">
                            {collection.eventName || collection.name}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[#7d6954]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(
                              collection.createdAt
                            ).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[#7d6954]">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span className="font-medium">
                              {collection.certificates?.length || 0}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center gap-2">
                            <motion.button
                              onClick={() => handleViewCollection(collection)}
                              className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="View Certificates"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </motion.button>

                            <motion.button
                              onClick={() =>
                                handleDownloadCollection(collection._id)
                              }
                              disabled={
                                actionLoading.download === collection._id
                              }
                              className="bg-[#5f4b32] hover:bg-[#4a3a26] text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Download All Certificates"
                            >
                              {actionLoading.download === collection._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4" />
                              )}
                              Download
                            </motion.button>

                            <motion.button
                              onClick={() =>
                                handleDeleteCollection(collection._id)
                              }
                              disabled={actionLoading.delete === collection._id}
                              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Delete Event"
                            >
                              {actionLoading.delete === collection._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                              Delete
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {collections.map((collection, index) => (
                  <motion.div
                    key={collection._id}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#e0c9a9]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#5f4b32] text-lg">
                            {collection.eventName || collection.name}
                          </h3>
                          <div className="flex items-center gap-2 text-[#7d6954] text-sm mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(
                              collection.createdAt
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#7d6954] text-sm">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">
                            {collection.certificates?.length || 0}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleViewCollection(collection)}
                          className="flex-1 bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </motion.button>

                        <motion.button
                          onClick={() =>
                            handleDownloadCollection(collection._id)
                          }
                          disabled={actionLoading.download === collection._id}
                          className="flex-1 bg-[#5f4b32] hover:bg-[#4a3a26] text-white font-medium py-2 px-3 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {actionLoading.download === collection._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          Download
                        </motion.button>
                      </div>

                      <motion.button
                        onClick={() => handleDeleteCollection(collection._id)}
                        disabled={actionLoading.delete === collection._id}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {actionLoading.delete === collection._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete Event
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default IssuerRecords;
