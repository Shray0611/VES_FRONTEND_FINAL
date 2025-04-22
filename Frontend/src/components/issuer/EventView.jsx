import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import IssuerNavbar from "../layout/IssuerNavbar";
import "./certificates.css";

const EventView = () => {
  const { id } = useParams();
  const location = useLocation();
  const collectionId = location.state?.collectionId || id;
  const collectionName = location.state?.collectionName || "Event";

  const [certificates, setCertificates] = useState([]);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch certificates for this collection
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Using the correct endpoint from server.js
        const response = await fetch(
          `http://localhost:5000/api/collections/${collectionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch collection (${response.status})`);
        }

        const data = await response.json();
        console.log("Collection data:", data);

        // Handle response - expecting certificates to be in data.certificates
        setCertificates(data.certificates || []);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError(`${err.message}. Using sample data for development.`);

        // Fallback to sample data if API fails
        setCertificates([
          {
            _id: "cert1",
            studentData: {
              name: "John Doe",
              rollNo: "VES123",
              course: "Computer Science",
              grade: "A",
            },
            email: "john.doe@example.com",
            createdAt: "2023-05-15T10:00:00Z",
            templateId: {
              variables: {
                name: { name: "Name" },
                rollNo: { name: "Roll Number" },
                course: { name: "Course" },
                grade: { name: "Grade" },
              },
            },
          },
          {
            _id: "cert2",
            studentData: {
              name: "Jane Smith",
              rollNo: "VES456",
              course: "Information Technology",
              grade: "A+",
            },
            email: "jane.smith@example.com",
            createdAt: "2023-05-16T11:30:00Z",
            templateId: {
              variables: {
                name: { name: "Name" },
                rollNo: { name: "Roll Number" },
                course: { name: "Course" },
                grade: { name: "Grade" },
              },
            },
          },
          {
            _id: "cert3",
            studentData: {
              name: "Anita Kumar",
              rollNo: "VES789",
              course: "Electronics",
              grade: "B+",
            },
            email: "anita.kumar@example.com",
            createdAt: "2023-05-17T09:15:00Z",
            templateId: {
              variables: {
                name: { name: "Name" },
                rollNo: { name: "Roll Number" },
                course: { name: "Course" },
                grade: { name: "Grade" },
              },
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (collectionId) {
      fetchCertificates();
    } else {
      // Handle case when no collection ID is provided
      setLoading(false);
      setCertificates([]);
    }
  }, [collectionId]);

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

      console.log("Attempting to update certificate:", editingCert._id);
      console.log("Update data:", formData);

      // Using the correct endpoint from server.js
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Server returned ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Certificate updated successfully:", data);

      // Update certificates state
      setCertificates((certs) =>
        certs.map((c) =>
          c._id === editingCert._id ? { ...c, studentData: formData } : c
        )
      );

      setEditingCert(null);
    } catch (err) {
      console.error("Error updating certificate:", err);
      setError(`Error updating certificate: ${err.message}`);

      // For development, simulate successful update even if API fails
      if (process.env.NODE_ENV !== "production") {
        console.log("Simulating successful update for development");
        setCertificates((certs) =>
          certs.map((c) =>
            c._id === editingCert._id ? { ...c, studentData: formData } : c
          )
        );
        setEditingCert(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <IssuerNavbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-2">
            {collectionName} Certificates
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-[#edf2f7]">
          <div className="p-6 border-b border-[#edf2f7] flex justify-between items-center">
            <h2 className="text-xl font-medium text-[#1e293b]">Certificates</h2>
            <div className="flex gap-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-colors"
                onClick={() => window.history.back()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#e0c9a9] border-t-[#5f4b32]"></div>
              <p className="mt-2 text-[#64748b]">Loading certificates...</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="p-8 text-center text-[#64748b]">
              No certificates found for this collection.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide">
                      No.
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide">
                      Name
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide">
                      Email
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide">
                      Issue Date
                    </th>
                    <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf2f7]">
                  {certificates.map((cert, index) => (
                    <tr
                      key={cert._id}
                      className="transition-colors duration-200 hover:bg-[#e2e8f0] hover:shadow-md"
                    >
                      <td className="px-6 py-4 text-[#475569]">{index + 1}</td>
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
                        <div className="flex justify-center gap-4">
                          <button
                            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                            title="Download Certificate"
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
                            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                            onClick={() => handleEditClick(cert)}
                            title="Edit Certificate"
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
                          <button
                            className="text-red-600 hover:text-red-700 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                            title="Delete Certificate"
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

      {/* Edit Modal */}
      {editingCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-semibold text-[#1e293b] mb-4">
              Edit Certificate Data
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {editingCert.templateId?.variables ? (
                Object.entries(editingCert.templateId.variables).map(
                  ([key, varConfig]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-medium text-[#475569]">
                        {varConfig.name}
                      </label>
                      <input
                        type="text"
                        name={varConfig.name}
                        value={formData[varConfig.name] || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#cbd5e1] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )
                )
              ) : (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#475569]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#cbd5e1] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 border border-[#cbd5e1] rounded-md text-[#475569] hover:bg-[#f1f5f9] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventView;
