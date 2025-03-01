import React from "react";
import { useParams } from "react-router-dom";
import IssuerNavbar from "./IssuerNavbar";

const EventView = () => {
  const { id } = useParams();

  // Sample certificate data (replace this with API call to fetch real data)
  const certificates = [
    { id: 1, name: "John Doe", event: "Invictus" },
    { id: 2, name: "Jane Smith", event: "Invictus" },
    { id: 3, name: "Alice Johnson", event: "Invictus" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <IssuerNavbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-2">
            {/* Certificates for Event ID: {id} */}
          </h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#edf2f7]">
          <div className="p-6 border-b border-[#edf2f7]">
            <h2 className="text-xl font-medium text-[#1e293b]">Certificates</h2>
          </div>
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
                    Event
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-[#64748b] uppercase tracking-wide text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {certificates.map((cert, index) => (
                  <tr
                    key={cert.id}
                    className="transition-colors duration-200 hover:bg-[#e2e8f0] hover:shadow-md"
                  >
                    <td className="px-6 py-4 text-[#475569]">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-[#1e293b]">
                      {cert.name}
                    </td>
                    <td className="px-6 py-4 text-[#475569]">{cert.event}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-4">
                        <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-transform duration-200 hover:scale-105">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-700 flex items-center gap-1 transition-transform duration-200 hover:scale-105">
                          Delete
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

export default EventView;
