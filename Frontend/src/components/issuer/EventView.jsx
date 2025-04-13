import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import IssuerNavbar from "../layout/IssuerNavbar";
import { saveAs } from "file-saver";

const EventView = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  // Fetch collections and certificates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          navigate("/login");
          return;
        }

        // Try fetching actual data from the API first
        try {
          // Fetch collections
          const collectionsResponse = await fetch(
            "http://localhost:5000/api/collections",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!collectionsResponse.ok) {
            throw new Error(`API Error: ${collectionsResponse.status}`);
          }

          const collectionsData = await collectionsResponse.json();
          setCollections(collectionsData);
          console.log("Collections fetched:", collectionsData);

          // Fetch all certificates
          const certificatesResponse = await fetch(
            "http://localhost:5000/api/admin/certificates",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!certificatesResponse.ok) {
            throw new Error(`API Error: ${certificatesResponse.status}`);
          }

          const certificatesData = await certificatesResponse.json();
          setCertificates(certificatesData);
          console.log("Certificates fetched:", certificatesData);
        } catch (err) {
          console.error("API fetch failed, using static data:", err);

          // Fallback to static data
          const staticCollections = [
            {
              _id: "1",
              name: "VESIT Annual Ceremony 2024",
              createdAt: new Date().toISOString(),
              certificates: [
                {
                  _id: "cert1",
                  studentData: { name: "John Doe", role: "Student" },
                  email: "john.doe@example.com",
                  createdAt: new Date().toISOString(),
                  templateId: {
                    variables: {
                      name: { name: "name", type: "text" },
                      role: { name: "role", type: "text" },
                    },
                  },
                },
                {
                  _id: "cert2",
                  studentData: { name: "Jane Smith", role: "Student" },
                  email: "jane.smith@example.com",
                  createdAt: new Date().toISOString(),
                  templateId: {
                    variables: {
                      name: { name: "name", type: "text" },
                      role: { name: "role", type: "text" },
                    },
                  },
                },
              ],
            },
            {
              _id: "2",
              name: "Hackathon Winners Spring 2024",
              createdAt: new Date().toISOString(),
              certificates: [
                {
                  _id: "cert3",
                  studentData: { name: "Alex Johnson", role: "Participant" },
                  email: "alex.j@example.com",
                  createdAt: new Date().toISOString(),
                  templateId: {
                    variables: {
                      name: { name: "name", type: "text" },
                      role: { name: "role", type: "text" },
                    },
                  },
                },
              ],
            },
            {
              _id: "3",
              name: "Cultural Festival Participants",
              createdAt: new Date().toISOString(),
              certificates: [
                {
                  _id: "cert4",
                  studentData: { name: "Priya Sharma", role: "Participant" },
                  email: "priya.s@example.com",
                  createdAt: new Date().toISOString(),
                  templateId: {
                    variables: {
                      name: { name: "name", type: "text" },
                      role: { name: "role", type: "text" },
                    },
                  },
                },
                {
                  _id: "cert5",
                  studentData: { name: "Rajesh Kumar", role: "Organizer" },
                  email: "rajesh.k@example.com",
                  createdAt: new Date().toISOString(),
                  templateId: {
                    variables: {
                      name: { name: "name", type: "text" },
                      role: { name: "role", type: "text" },
                    },
                  },
                },
              ],
            },
          ];

          const staticCertificates = [
            {
              _id: "cert1",
              studentData: { name: "John Doe", role: "Student" },
              email: "john.doe@example.com",
              createdAt: new Date().toISOString(),
              templateId: {
                variables: {
                  name: { name: "name", type: "text" },
                  role: { name: "role", type: "text" },
                },
              },
            },
            {
              _id: "cert2",
              studentData: { name: "Jane Smith", role: "Student" },
              email: "jane.smith@example.com",
              createdAt: new Date().toISOString(),
              templateId: {
                variables: {
                  name: { name: "name", type: "text" },
                  role: { name: "role", type: "text" },
                },
              },
            },
            {
              _id: "cert3",
              studentData: { name: "Alex Johnson", role: "Participant" },
              email: "alex.j@example.com",
              createdAt: new Date().toISOString(),
              templateId: {
                variables: {
                  name: { name: "name", type: "text" },
                  role: { name: "role", type: "text" },
                },
              },
            },
            {
              _id: "cert4",
              studentData: { name: "Priya Sharma", role: "Participant" },
              email: "priya.s@example.com",
              createdAt: new Date().toISOString(),
              templateId: {
                variables: {
                  name: { name: "name", type: "text" },
                  role: { name: "role", type: "text" },
                },
              },
            },
            {
              _id: "cert5",
              studentData: { name: "Rajesh Kumar", role: "Organizer" },
              email: "rajesh.k@example.com",
              createdAt: new Date().toISOString(),
              templateId: {
                variables: {
                  name: { name: "name", type: "text" },
                  role: { name: "role", type: "text" },
                },
              },
            },
          ];

          setCollections(staticCollections);
          setCertificates(staticCertificates);
          console.log("Using predefined data until API is implemented");
        }
      } catch (err) {
        console.error("Error setting up data:", err);
        setError(`Error: ${err.message}`);
      }
    };

    fetchData();
  }, [navigate]);

  // Handle collection selection
  const handleCollectionSelect = async (collectionId) => {
    if (!collectionId) {
      setSelectedCollection(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      try {
        // Try fetching from API
        const response = await fetch(
          `http://localhost:5000/api/collections/${collectionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        setSelectedCollection(data);
        console.log("Selected collection from API:", data);
      } catch (err) {
        console.error("API collection fetch failed, using local data:", err);

        // Use local collection data
        const collection = collections.find((c) => c._id === collectionId);
        if (collection) {
          setSelectedCollection(collection);
          console.log("Selected collection from local data:", collection);
        } else {
          throw new Error("Collection not found");
        }
      }
    } catch (err) {
      console.error("Error selecting collection:", err);
      setError(`Error: ${err.message}`);
    }
  };

  // Handle certificate edit click
  const handleEditClick = (certificate) => {
    setEditingCert(certificate);
    setFormData(certificate.studentData);
  };

  // Handle input change for editing
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      try {
        // Try updating via API
        const response = await fetch(
          `http://localhost:5000/api/certificates/${editingCert._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || `API Error: ${response.status}`);

        console.log("Certificate updated via API:", data);
      } catch (err) {
        console.error("API update failed, updating local state only:", err);
      }

      // Update certificates state (works both when API succeeds or fails)
      setCertificates((certs) =>
        certs.map((c) =>
          c._id === editingCert._id ? { ...c, studentData: formData } : c
        )
      );

      // Update selected collection if it exists
      if (selectedCollection) {
        setSelectedCollection((prev) => ({
          ...prev,
          certificates: prev.certificates.map((c) =>
            c._id === editingCert._id ? { ...c, studentData: formData } : c
          ),
        }));
      }

      setEditingCert(null);
      alert("Certificate updated successfully!");
    } catch (err) {
      console.error("Error updating certificate:", err);
      setError(`Error: ${err.message}`);
    }
  };

  // Handle certificate preview
  const handlePreview = async (certificateId) => {
    setLoadingPreview(true);
    try {
      const token = localStorage.getItem("token");
      try {
        // Try to get preview from the API
        const response = await fetch(
          `http://localhost:5000/api/certificates/${certificateId}/preview`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        console.log("Preview fetched from API");
      } catch (err) {
        console.error("API preview failed, using placeholder:", err);
        // Fallback to placeholder image
        const placeholderUrl =
          "https://placehold.co/600x400/e0c9a9/5f4b32?text=Certificate+Preview";
        setPreviewUrl(placeholderUrl);
      }
    } catch (err) {
      console.error("Error previewing certificate:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoadingPreview(false);
    }
  };

  // Handle certificate download
  const handleDownload = async (certificateId) => {
    try {
      const token = localStorage.getItem("token");
      try {
        // Try to download from the API
        const response = await fetch(
          `http://localhost:5000/api/certificates/${certificateId}/download`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        saveAs(blob, `certificate-${certificateId}.png`);
        console.log("Certificate downloaded from API");
      } catch (err) {
        console.error("API download failed, using placeholder:", err);
        // Fallback to placeholder image
        fetch(
          "https://placehold.co/800x600/e0c9a9/5f4b32?text=Certificate+Download"
        )
          .then((res) => res.blob())
          .then((blob) => {
            saveAs(blob, `certificate-${certificateId}.png`);
            alert(
              "Using placeholder certificate for download. API endpoint may not be available."
            );
          });
      }
    } catch (err) {
      console.error("Error downloading certificate:", err);
      setError(`Error: ${err.message}`);
    }
  };

  // Close preview modal
  const closePreview = () => {
    setPreviewUrl(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 pt-20">
      <IssuerNavbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#5f4b32]">
            Certificate Management
          </h1>
          <Link
            to="/generate"
            className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Generate New Certificates
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Collection Selector */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-md p-4">
            <h3 className="text-xl font-semibold text-[#5f4b32] mb-4">
              Collections
            </h3>
            <div className="space-y-2">
              <div
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  !selectedCollection
                    ? "bg-[#f5f1e6] text-[#5f4b32] font-medium"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleCollectionSelect(null)}
              >
                <div className="font-medium">All Certificates</div>
                <div className="text-sm text-gray-600">
                  {certificates.length} certificates
                </div>
              </div>
              {collections.map((collection) => (
                <div
                  key={collection._id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedCollection?._id === collection._id
                      ? "bg-[#f5f1e6] text-[#5f4b32] font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleCollectionSelect(collection._id)}
                >
                  <div className="font-medium">
                    {collection.name || "Unnamed Collection"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {collection.certificates?.length || 0} certificates
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Table */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#5f4b32]">
                {selectedCollection
                  ? selectedCollection.name
                  : "All Certificates"}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide">
                      Student Name
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide">
                      Email
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide">
                      Issued Date
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf2f7]">
                  {(selectedCollection
                    ? selectedCollection.certificates
                    : certificates
                  )?.map((cert) => (
                    <tr
                      key={cert._id}
                      className="transition-colors duration-200 hover:bg-[#e2e8f0]"
                    >
                      <td className="px-6 py-4 font-medium text-[#1e293b]">
                        {cert.studentData?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-[#475569]">
                        {cert.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-[#475569]">
                        {cert.createdAt
                          ? new Date(cert.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handlePreview(cert._id)}
                            disabled={loadingPreview}
                            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-transform hover:scale-105"
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
                            <span>
                              {loadingPreview ? "Loading..." : "View"}
                            </span>
                          </button>
                          <button
                            onClick={() => handleDownload(cert._id)}
                            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-transform hover:scale-105"
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
                            onClick={() => handleEditClick(cert)}
                            className="text-green-600 hover:text-green-700 flex items-center gap-1 transition-transform hover:scale-105"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            <span>Edit</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingCert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-[#5f4b32] mb-4">
                Edit Certificate Data
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {editingCert.templateId?.variables &&
                  Object.entries(editingCert.templateId.variables).map(
                    ([_, varConfig]) => (
                      <div key={varConfig.name} className="space-y-1">
                        <label className="text-sm text-[#64748b]">
                          {varConfig.name}
                        </label>
                        <input
                          type="text"
                          name={varConfig.name}
                          value={formData[varConfig.name] || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e0c9a9] focus:border-[#d4b88f] outline-none"
                        />
                      </div>
                    )
                  )}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingCert(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#e0c9a9] text-[#5f4b32] rounded-lg hover:bg-[#d4b88f]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#5f4b32]">
                  Certificate Preview
                </h3>
                <button
                  onClick={closePreview}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <img
                src={previewUrl}
                alt="Certificate Preview"
                className="w-full h-auto object-contain rounded-lg"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDownload()}
                  className="px-4 py-2 bg-[#e0c9a9] text-[#5f4b32] rounded-lg hover:bg-[#d4b88f] flex items-center gap-2"
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
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventView;
