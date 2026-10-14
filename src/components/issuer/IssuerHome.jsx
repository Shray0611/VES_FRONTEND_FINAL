import React from "react";
import { useNavigate } from "react-router-dom";

const IssuerHome = () => {
  const navigate = useNavigate();

  // Sample data for dashboard cards
  const dashboardData = [
    {
      title: "Total Certificates",
      count: 156,
      color: "bg-blue-100 text-blue-800",
      link: "/issuer-records",
    },
    {
      title: "Templates",
      count: 8,
      color: "bg-green-100 text-green-800",
      link: "/view-template",
    },
    {
      title: "Pending Complaints",
      count: 3,
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

  // Sample recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Certificate issued",
      details: "Merit Certificate for John Doe",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      action: "Template created",
      details: "New template for Sports Achievement",
      timestamp: "Yesterday",
    },
    {
      id: 3,
      action: "Complaint resolved",
      details: "Name correction for Certificate #1234",
      timestamp: "2 days ago",
    },
  ];

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

        {/* Quick Actions Section */}
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
