import React from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const UserHome = ({ onLogout }) => {
  const navigate = useNavigate();

  // Dummy data for demonstration
  const certificates = [
    {
      event: "Annual Tech Symposium 2024",
      council: "Technical Council",
      date: "2024-03-15",
      certificate: "Participation_Certificate.pdf",
    },
    {
      event: "Cultural Fest 2023",
      council: "Cultural Council",
      date: "2023-11-20",
      certificate: "Cultural_Fest_Certificate.pdf",
    },
    {
      event: "Sports Championship 2023",
      council: "Sports Council",
      date: "2023-09-05",
      certificate: "Sports_Champion.pdf",
    },
  ];

  const handleView = (certificate) => {
    console.log("Viewing:", certificate);
  };

  const handleDownload = (certificate) => {
    console.log("Downloading:", certificate);
  };

  const handleComplaint = (certificate) => {
    console.log("Raising complaint for:", certificate);
    navigate("/report-issue/id");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24 flex flex-col items-center">
      <UserNavbar onLogout={onLogout} />

      <h1 className="text-gray-800 text-3xl font-bold mb-4">Welcome, User!</h1>
      <h2 className="text-gray-700 text-2xl font-semibold mb-8">
        Your Certificates
      </h2>

      <div className="w-full max-w-6xl bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-center text-gray-700">Event</th>
              <th className="p-4 text-center text-gray-700">Council</th>
              <th className="p-4 text-center text-gray-700">Event Date</th>
              <th className="p-4 text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr
                key={index}
                className="border-t border-gray-300 hover:bg-gray-200"
              >
                <td className="p-4 text-center text-gray-600 font-medium">
                  {cert.event}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {cert.council}
                </td>
                <td className="p-4 text-center text-gray-600">{cert.date}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleView(cert)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(cert)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleComplaint(cert)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Raise Complaint
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;
