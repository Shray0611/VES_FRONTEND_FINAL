import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IssuerHome = () => {
  const navigate = useNavigate();
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [templateCount, setTemplateCount] = useState(0);
  const [pendingComplaintsCount, setPendingComplaintsCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch collections for certificate count
        const collectionsResponse = await fetch("http://localhost:5000/api/collections", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const collectionsData = await collectionsResponse.json();
        const certCount = collectionsData.reduce((acc, curr) => acc + (curr.certificates?.length || 0), 0);
        setTotalCertificates(certCount);

        // Fetch templates
        const templatesResponse = await fetch("http://localhost:5000/api/templates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const templatesData = await templatesResponse.json();
        setTemplateCount(templatesData.length);

        // Fetch complaints
        const complaintsResponse = await fetch("http://localhost:5000/api/complaints/issuer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const complaintsData = await complaintsResponse.json();
        const pendingComplaints = complaintsData.filter(c => c.status !== "resolved");
        setPendingComplaintsCount(pendingComplaints.length);

        // Generate recent activities
        const activities = [
          ...collectionsData.slice(0, 3).map((collection, index) => ({
            id: `cert-${collection._id}`,
            action: "Certificate issued",
            details: `${collection.name} certificates issued`,
            timestamp: new Date(collection.createdAt).toLocaleDateString(),
          })),
          ...templatesData.slice(0, 1).map(template => ({
            id: `tpl-${template._id}`,
            action: "Template created",
            details: template.name,
            timestamp: new Date(template.createdAt).toLocaleDateString(),
          })),
          ...pendingComplaints.slice(0, 3).map((complaint, index) => ({
            id: `comp-${complaint._id}`,
            action: "New complaint",
            details: `Complaint #COMP-${index + 1}: ${complaint.description}`,
            timestamp: new Date(complaint.createdAt).toLocaleDateString(),
          }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
         .slice(0, 3);

        setRecentActivities(activities);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dashboardData = [
    {
      title: "Total Certificates",
      count: totalCertificates,
      color: "bg-blue-100 text-blue-800",
      link: "/issuer-records",
    },
    {
      title: "Templates",
      count: templateCount,
      color: "bg-green-100 text-green-800",
      link: "/view-template",
    },
    {
      title: "Pending Complaints",
      count: pendingComplaintsCount,
      color: "bg-red-100 text-red-800",
      link: "/complaints-view",
    },
    {
      title: "Guidelines",
      count: null,
      color: "bg-purple-100 text-purple-800",
      link: "/guidelines",
    },
  ];

  if (loading) {
    return (
      <div className="pt-20 px-6 pb-8 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#e0c9a9] border-t-[#5f4b32]"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 pb-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#5f4b32] mb-8">
          Issuer Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.link)}
              className={`${card.color} rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105`}
            >
              <div>
                <p className="text-lg font-semibold">{card.title}</p>
                {card.count !== null && (
                  <p className="text-3xl font-bold mt-2">{card.count}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-[#5f4b32] mb-4">
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
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-4 text-[#7d6954] hover:text-[#5f4b32] font-medium"
            onClick={() => navigate("/issuer-records")}
          >
            View All Activities →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-[#5f4b32] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/view-template")}
              className="bg-[#f5f1e6] hover:bg-[#e0c9a9] text-[#5f4b32] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="mr-2">📋</span> Create New Template
            </button>
            <button
              onClick={() => navigate("/issuer-records")}
              className="bg-[#f5f1e6] hover:bg-[#e0c9a9] text-[#5f4b32] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="mr-2">📜</span> Issue Certificate
            </button>
            <button
              onClick={() => navigate("/complaints-view")}
              className="bg-[#f5f1e6] hover:bg-[#e0c9a9] text-[#5f4b32] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="mr-2">⚠️</span> View Complaints
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuerHome;