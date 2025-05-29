import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Chart from "chart.js/auto";
import IssuerNavbar from "../layout/IssuerNavbar";

const IssuerHome = () => {
  const navigate = useNavigate();
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [pendingComplaintsCount, setPendingComplaintsCount] = useState(0);
  const [totalEventsCount, setTotalEventsCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch collections for certificate count and events count
        const collectionsResponse = await fetch(
          "http://localhost:5000/api/collections",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const collectionsData = await collectionsResponse.json();

        // Set total events count (number of collections)
        setTotalEventsCount(collectionsData.length);

        // Calculate total certificates
        const certCount = collectionsData.reduce(
          (acc, curr) => acc + (curr.certificates?.length || 0),
          0
        );
        setTotalCertificates(certCount);

        // Fetch complaints
        const complaintsResponse = await fetch(
          "http://localhost:5000/api/complaints/issuer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const complaintsData = await complaintsResponse.json();

        // Filter pending complaints
        const pendingComplaints = complaintsData.filter(
          (c) => c.status !== "resolved"
        );

        // Set pending complaints count
        setPendingComplaintsCount(pendingComplaints.length);

        // Generate recent activities
        const activities = [
          ...collectionsData.slice(0, 3).map((collection, index) => ({
            id: `cert-${collection._id}`,
            action: "Certificate issued",
            details: `${collection.name} certificates issued`,
            timestamp: new Date(collection.createdAt).toLocaleDateString(),
          })),
          ...pendingComplaints.slice(0, 3).map((complaint, index) => ({
            id: `comp-${complaint._id}`,
            action: "New complaint",
            details: `Complaint #COMP-${index + 1}: ${complaint.description}`,
            timestamp: new Date(complaint.createdAt).toLocaleDateString(),
          })),
        ]
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 3);

        setRecentActivities(activities);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const ctx = document.getElementById("dashboardChart");
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Certificates", "Pending Complaints", "Total Events"],
            datasets: [
              {
                label: "Dashboard Metrics",
                data: [
                  totalCertificates,
                  pendingComplaintsCount,
                  totalEventsCount,
                ],
                backgroundColor: [
                  "rgba(59, 130, 246, 0.5)", // Blue
                  "rgba(34, 197, 94, 0.5)", // Green
                  "rgba(239, 68, 68, 0.5)", // Red
                ],
                borderColor: [
                  "rgb(59, 130, 246)",
                  "rgb(34, 197, 94)",
                  "rgb(239, 68, 68)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false } },
          },
        });
      } else {
        console.error("Chart canvas not found");
      }
    }
  }, [
    loading,
    error,
    totalCertificates,
    pendingComplaintsCount,
    totalEventsCount,
  ]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      navigate("/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const dashboardData = [
    {
      title: "Total Certificates",
      count: totalCertificates,
      color: "bg-blue-100 text-blue-800",
      link: "/issuer-records",
    },
    {
      title: "Pending Complaints",
      count: pendingComplaintsCount,
      color: "bg-green-100 text-green-800",
      link: "/complaints-view",
    },
    {
      title: "Total Events",
      count: totalEventsCount,
      color: "bg-red-100 text-red-800",
      link: "/issuer-records",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#f5f1e6] rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Error</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center px-4 py-2 bg-[#5f4b32] text-white text-sm font-medium rounded-md hover:bg-[#7d6954] transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#f5f1e6] rounded-xl shadow-lg p-6 space-y-4">
          <div className="h-12 w-12 mx-auto rounded-full bg-gray-200 animate-pulse"></div>
          <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-[#f5f1e6] rounded-xl shadow-lg p-6 space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#5f4b32] to-[#7d6954] bg-clip-text text-transparent text-left">
              Issuer Dashboard
            </h1>
            <p className="text-lg text-gray-600 text-left">
              Monitor your certificates, templates, and activities with ease.
            </p>
          </div>

          {/* Stats Cards - Centered with 3 columns */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl w-full">
              {dashboardData.map((card, index) => (
                <div
                  key={index}
                  onClick={() => navigate(card.link)}
                  className={`${card.color} rounded-xl shadow-lg p-6 cursor-pointer transition-transform hover:scale-105`}
                >
                  <div>
                    <p className="text-lg font-semibold">{card.title}</p>
                    <p className="text-3xl font-bold mt-2">{card.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-[#f5f1e6] rounded-xl shadow-lg p-6">
            <h2 className="text-xl Oceansbold text-[#5f4b32] mb-4">
              Dashboard Metrics
            </h2>
            <canvas id="dashboardChart" className="w-full max-h-64"></canvas>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-[#f5f1e6] rounded-xl shadow-lg p-6">
              <h2 className="text-xl  font-bold text-[#5f4b32] mb-4">
                Recent Activity
              </h2>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          {activity.action}
                        </p>
                        <p className="text-gray-600">{activity.details}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 bg-[#4b3515] hover:bg-[#3f2f15] text-[#e4d7c8] font-medium"
                onClick={() => navigate("/issuer-records")}
              >
                View All Activities
              </button>
            </div>

            {/* Quick Actions */}
            {/* <div className="bg-[#f5f1e6] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#5f4b32] mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => navigate("/create-template")}
                  className="bg-[#f5f1e6] hover:bg-[#e0c9a9] text-[#5f4b32] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center border border-[#e0c9a9]"
                >
                  Create New Template
                </button>
                <button
                  onClick={() => navigate("/complaints-view")}
                  className="bg-[#f5f1e6] hover:bg-[#e0c9a9] text-[#5f4b32] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center border border-[#e0c9a9]"
                >
                  View Complaints
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <IssuerNavbar onLogout={handleLogout} handleQuery={() => {}} />
    </div>
  );
};

export default IssuerHome;
