import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import IssuerNavbar from "../layout/IssuerNavbar";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Edit,
  Trash2,
  Calendar,
  Mail,
  User,
  FileText,
  Users,
  Loader2,
  AlertCircle,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import "./certificates.css";

const EventView = () => {
  const { id } = useParams();
  const location = useLocation();
  const collectionId = location.state?.collectionId || id;
  const collectionName = location.state?.collectionName || "Event";
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState({});
  const [actionLoading, setActionLoading] = useState({
    delete: null,
    download: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Fetch certificates for this collection
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

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
        setCollection(data);
        console.log("Collection data:", data);
        setCertificates(data.certificates || []);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError(`${err.message}. Using sample data for development.`);

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
          {
            _id: "cert4",
            studentData: {
              name: "Raj Patel",
              rollNo: "VES101",
              course: "Mechanical Engineering",
              grade: "A-",
            },
            email: "raj.patel@example.com",
            createdAt: "2023-05-18T14:20:00Z",
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
            _id: "cert5",
            studentData: {
              name: "Priya Sharma",
              rollNo: "VES202",
              course: "Civil Engineering",
              grade: "B+",
            },
            email: "priya.sharma@example.com",
            createdAt: "2023-05-19T16:45:00Z",
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
            _id: "cert6",
            studentData: {
              name: "Suresh Kumar",
              rollNo: "VES303",
              course: "Biotechnology",
              grade: "A",
            },
            email: "suresh.kumar@example.com",
            createdAt: "2023-05-20T08:30:00Z",
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
            _id: "cert7",
            studentData: {
              name: "Neha Gupta",
              rollNo: "VES404",
              course: "Chemical Engineering",
              grade: "A+",
            },
            email: "neha.gupta@example.com",
            createdAt: "2023-05-21T10:15:00Z",
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
            _id: "cert8",
            studentData: {
              name: "Vikram Singh",
              rollNo: "VES505",
              course: "Aerospace Engineering",
              grade: "B",
            },
            email: "vikram.singh@example.com",
            createdAt: "2023-05-22T13:50:00Z",
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
            _id: "cert9",
            studentData: {
              name: "Meera Desai",
              rollNo: "VES606",
              course: "Electrical Engineering",
              grade: "A-",
            },
            email: "meera.desai@example.com",
            createdAt: "2023-05-23T09:25:00Z",
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
            _id: "cert10",
            studentData: {
              name: "Arun Joshi",
              rollNo: "VES707",
              course: "Materials Science",
              grade: "A",
            },
            email: "arun.joshi@example.com",
            createdAt: "2023-05-24T11:40:00Z",
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
            _id: "cert11",
            studentData: {
              name: "Divya Reddy",
              rollNo: "VES808",
              course: "Environmental Engineering",
              grade: "B+",
            },
            email: "divya.reddy@example.com",
            createdAt: "2023-05-25T15:20:00Z",
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
            _id: "cert12",
            studentData: {
              name: "Karthik Iyer",
              rollNo: "VES909",
              course: "Industrial Engineering",
              grade: "A+",
            },
            email: "karthik.iyer@example.com",
            createdAt: "2023-05-26T17:05:00Z",
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
      setLoading(false);
      setCertificates([]);
    }
  }, [collectionId]);

  // Filter certificates based on search query
  const filteredCertificates = certificates.filter((cert) => {
    const name = cert.studentData?.name?.toLowerCase() || "";
    const email = cert.email?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  // Pagination calculations using filtered certificates
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCertificates.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredCertificates.length / recordsPerPage);

  // Reset page to 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle records per page change
  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
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

      console.log("Attempting to update certificate:", editingCert._id);
      console.log("Update data:", formData);

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

      setCertificates((certs) =>
        certs.map((c) =>
          c._id === editingCert._id ? { ...c, studentData: formData } : c
        )
      );

      setEditingCert(null);
    } catch (err) {
      console.error("Error updating certificate:", err);
      setError(`Error updating certificate: ${err.message}`);

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

  const handleDeleteCertificate = async (certId) => {
    if (!window.confirm("Are you sure you want to delete this certificate?"))
      return;
    try {
      setActionLoading((prev) => ({ ...prev, delete: certId }));
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/certificates/${certId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `Server returned ${response.status}`
          );
        } catch (jsonError) {
          throw new Error(
            `Failed to delete certificate. Server returned status: ${response.status} ${response.statusText}`
          );
        }
      }

      setCertificates((prev) => prev.filter((c) => c._id !== certId));
    } catch (err) {
      setError("Failed to delete certificate: " + err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, delete: null }));
    }
  };

  // Handle certificate download
  const handleDownloadCertificate = async (certId) => {
    try {
      setActionLoading((prev) => ({ ...prev, download: certId }));
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/certificates/${certId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `Server returned ${response.status}`
          );
        } catch (jsonError) {
          throw new Error(
            `Failed to download certificate. Server returned status: ${response.status} ${response.statusText}`
          );
        }
      }

      const imageBlob = await response.blob();
      const url = window.URL.createObjectURL(imageBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${certId}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to download certificate: " + err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, download: null }));
    }
  };

  // Helper to get student name from studentData or email
  const getStudentName = (cert) => {
    let name = cert.studentData?.name;
    if (name && name.trim() !== "") return name;
    const email = cert.email;
    if (email && email.includes("@")) {
      const local = email.split("@")[0];
      const parts = local.split(".");
      if (parts.length >= 3) {
        return (
          parts[1].charAt(0).toUpperCase() +
          parts[1].slice(1) +
          " " +
          parts[2].charAt(0).toUpperCase() +
          parts[2].slice(1)
        );
      }
      return local.charAt(0).toUpperCase() + local.slice(1);
    }
    return "Unknown Student";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      navigate("/login");
    }
  }, [navigate]);

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
              Loading certificates...
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
            {collection.eventName} Certificates
          </h1>
          <p className="text-[#7d6954] text-lg md:text-xl max-w-2xl mx-auto">
            Manage and track certificates for this event
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </motion.button>
        </motion.div>

        {/* Records per page selector, search bar, and pagination controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <label className="text-[#5f4b32] font-medium">Show</label>
              <select
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
                className="bg-white/80 backdrop-blur-md border border-[#e0c9a9]/50 rounded-xl py-2 px-3 text-[#5f4b32] focus:outline-none focus:ring-2 focus:ring-[#e0c9a9]"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-[#5f4b32] font-medium">
                records per page
              </span>
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-md border border-[#e0c9a9]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e0c9a9] text-[#5f4b32]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7d6954]" />
            </div>
          </div>

          {/* Desktop Pagination Controls */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white/80 backdrop-blur-md border border-[#e0c9a9]/50 rounded-xl p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-[#5f4b32]" />
            </motion.button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <motion.button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      currentPage === pageNum
                        ? "bg-[#e0c9a9] text-[#5f4b32] font-bold"
                        : "bg-white/80 backdrop-blur-md text-[#7d6954]"
                    } border border-[#e0c9a9]/50`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}
            </div>
            <motion.button
              onClick={() =>
                currentPage < totalPages && paginate(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className="bg-white/80 backdrop-blur-md border border-[#e0c9a9]/50 rounded-xl p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-[#5f4b32]" />
            </motion.button>
          </div>
        </div>

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

        {/* Certificates Section */}
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
                  Certificates ({filteredCertificates.length})
                </h2>
              </div>
              <div className="text-[#5f4b32] font-medium">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {filteredCertificates.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FileText className="w-16 h-16 text-[#e0c9a9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#5f4b32] mb-2">
                {searchQuery
                  ? "No certificates match your search"
                  : "No certificates found"}
              </h3>
              <p className="text-[#7d6954]">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "No certificates have been issued for this event yet"}
              </p>
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
                        Student Name
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Email
                      </th>
                      <th className="text-left py-4 px-6 text-[#5f4b32] font-semibold">
                        Issue Date
                      </th>
                      <th className="text-center py-4 px-6 text-[#5f4b32] font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((cert, index) => (
                      <motion.tr
                        key={cert._id}
                        className="border-b border-[#e0c9a9]/20 hover:bg-[#f8e5c5]/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-4 px-6 text-[#7d6954] font-medium">
                          {indexOfFirstRecord + index + 1}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#e0c9a9]" />
                            <div className="font-medium text-[#5f4b32]">
                              {getStudentName(cert)}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[#7d6954]">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {cert.email || "N/A"}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[#7d6954]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {cert.createdAt
                              ? new Date(cert.createdAt).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center gap-2">
                            <motion.button
                              onClick={() =>
                                handleDownloadCertificate(cert._id)
                              }
                              disabled={actionLoading.download === cert._id}
                              className="bg-[#5f4b32] hover:bg-[#4a3a26] text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Download Certificate"
                            >
                              {actionLoading.download === cert._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4" />
                              )}
                              Download
                            </motion.button>
                            <motion.button
                              onClick={() => handleEditClick(cert)}
                              className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Edit Certificate"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteCertificate(cert._id)}
                              disabled={actionLoading.delete === cert._id}
                              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Delete Certificate"
                            >
                              {actionLoading.delete === cert._id ? (
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
                {currentRecords.map((cert, index) => (
                  <motion.div
                    key={cert._id}
                    className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#e0c9a9]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-[#e0c9a9]" />
                            <h3 className="font-semibold text-[#5f4b32] text-lg">
                              {getStudentName(cert)}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-[#7d6954] text-sm mb-1">
                            <Mail className="w-4 h-4" />
                            {cert.email || "N/A"}
                          </div>
                          <div className="flex items-center gap-2 text-[#7d6954] text-sm">
                            <Calendar className="w-4 h-4" />
                            {cert.createdAt
                              ? new Date(cert.createdAt).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </div>
                        <span className="text-[#7d6954] text-sm">
                          #{indexOfFirstRecord + index + 1}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleDownloadCertificate(cert._id)}
                          disabled={actionLoading.download === cert._id}
                          className="flex-1 bg-[#5f4b32] hover:bg-[#4a3a26] text-white font-medium py-2 px-3 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {actionLoading.download === cert._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          Download
                        </motion.button>
                        <motion.button
                          onClick={() => handleEditClick(cert)}
                          className="flex-1 bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-medium py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => handleDeleteCertificate(cert._id)}
                        disabled={actionLoading.delete === cert._id}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {actionLoading.delete === cert._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete Certificate
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Mobile Pagination Controls */}
        <div className="flex md:hidden justify-center items-center gap-4 mt-8">
          <motion.button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-white/80 backdrop-blur-md border border-[#e0c9a9]/50 rounded-xl p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 text-[#5f4b32]" />
          </motion.button>
          <span className="text-[#5f4b32] font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <motion.button
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="bg-white/80 backdrop-blur-md border border-[#e0c9a9]/50 rounded-xl p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 text-[#5f4b32]" />
          </motion.button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingCert && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#ffedd4] backdrop-blur-md rounded-3xl shadow-2xl border border-[#e0c9a9]/30 p-8 max-w-md w-full max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#5f4b32]">
                Edit Certificate Data
              </h3>
              <motion.button
                onClick={() => setEditingCert(null)}
                className="text-[#7d6954] hover:text-[#5f4b32] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {editingCert.templateId?.variables ? (
                Object.entries(editingCert.templateId.variables)
                  .filter(
                    ([key, varConfig]) =>
                      !varConfig.name.toLowerCase().includes("qr")
                  )
                  .map(([key, varConfig]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-sm font-semibold text-[#5f4b32]">
                        {varConfig.name}
                      </label>
                      <input
                        type="text"
                        name={varConfig.name}
                        value={formData[varConfig.name] || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-black bg-white/70 backdrop-blur-sm border border-[#e0c9a9]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e0c9a9] focus:border-transparent transition-all duration-200"
                        placeholder={`Enter ${varConfig.name.toLowerCase()}`}
                      />
                    </div>
                  ))
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#5f4b32]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#e0c9a9]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e0c9a9] focus:border-transparent transition-all duration-200"
                    placeholder="Enter name"
                  />
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="flex-1 px-6 py-3 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b] font-medium rounded-xl transition-all duration-200 border border-[#e0c9a9]/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EventView;
