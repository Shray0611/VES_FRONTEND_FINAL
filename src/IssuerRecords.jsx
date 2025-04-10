import React from "react";
import IssuerNavbar from "./IssuerNavbar";
import { useNavigate } from "react-router-dom";

const IssuerRecords = ({ onLogout }) => {
  const navigate = useNavigate();

  const events = [
    { id: 1, name: "Invictus", date: "2/1/2025" },
    { id: 2, name: "Dalal Street", date: "2/2/2025" },
  ];

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

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#edf2f7]">
          <div className="p-6 border-b border-[#edf2f7]">
            <h2 className="text-xl font-medium text-[#1e293b]">Your Events</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f8fafc]">
                <tr>
                  {["No.", "Event Name", "Date", "Actions"].map((header) => (
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
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className="transition-colors duration-200 hover:bg-[#e2e8f0] hover:shadow-md"
                  >
                    <td className="px-6 py-4 text-[#475569]">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-[#1e293b]">
                      {event.name}
                    </td>
                    <td className="px-6 py-4 text-[#475569]">{event.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center ml-8 gap-3">
                        <button
                          onClick={() => navigate("/event-view")}
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
                          onClick={() => console.log(`Download ${event.id}`)}
                          className="text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                          title="Download"
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
                          onClick={() => console.log(`Delete ${event.id}`)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                          title="Delete"
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
        </div>
      </div>
    </div>
  );
};

export default IssuerRecords;
