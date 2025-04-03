import React from "react";

const AdminHome = () => (
  <div className="min-h-screen bg-[#f8fafc] p-8">
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-light text-[#1e293b]">Admin Dashboard</h1>
        <p className="text-[#64748b] mt-2">Platform management console</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <MetricCard title="Total Users" value="2,345" color="blue" />
        <MetricCard title="Certificates" value="8,901" color="green" />
        <MetricCard title="Pending Actions" value="15" color="amber" />
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#edf2f7]">
        <h2 className="text-xl font-normal text-[#1e293b] mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4 text-[#475569]">
          <ActivityItem text="New certificate issued" time="2h ago" />
          <ActivityItem text="User registration completed" time="5h ago" />
          <ActivityItem text="Certificate verification" time="1d ago" />
        </div>
      </div>
    </div>
  </div>
);

const MetricCard = ({ title, value, color }) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-sm border-l-4 border-${color}-200`}
  >
    <h3 className="text-sm text-[#64748b] mb-2">{title}</h3>
    <p className={`text-3xl font-light text-${color}-600`}>{value}</p>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <div className="flex justify-between items-center p-3 hover:bg-[#f8fafc] rounded-lg">
    <span>{text}</span>
    <span className="text-sm text-[#94a3b8]">{time}</span>
  </div>
);

export default AdminHome;
