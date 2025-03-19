import React from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const UserHome = ({ onLogout }) => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-[#f4e3d7] to-[#d2b48c] p-6 pt-24 flex flex-col items-center">
      <UserNavbar onLogout={onLogout} />

      <div className="mb-8 text-center">
        <h1 className="text-[#5a3d2b] text-4xl font-extrabold mb-2">
          Welcome, <span className="text-[#a67c52]">User!</span>
        </h1>
        <h2 className="text-[#7d5a44] text-xl font-medium">
          Your Certificates
        </h2>
      </div>

      <div className="w-full max-w-6xl bg-[#f9f3ef] rounded-2xl shadow-lg overflow-hidden border border-[#d2b48c]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#a67c52] text-white">
              <th className="p-5 text-center text-sm font-semibold">Event</th>
              <th className="p-5 text-center text-sm font-semibold">Council</th>
              <th className="p-5 text-center text-sm font-semibold">
                Event Date
              </th>
              <th className="p-5 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr
                key={index}
                className="border-t border-[#e4cbb6] hover:bg-[#f0e1d0] transition-all duration-200"
              >
                <td className="p-4 text-center text-[#5a3d2b] font-medium">
                  {cert.event}
                </td>
                <td className="p-4 text-center text-[#7d5a44]">
                  {cert.council}
                </td>
                <td className="p-4 text-center text-[#7d5a44]">
                  {cert.date}
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-3">
                    {/* View Button */}
                    <button
                      onClick={() => handleView(cert)}
                      className="bg-[#d2a679] hover:bg-[#c1905d] text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200"
                    >
                      View
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(cert)}
                      className="bg-[#8b5e3c] hover:bg-[#6f4e37] text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200"
                    >
                      Download
                    </button>

                    {/* Raise Complaint Button */}
                    <button
                      onClick={() => handleComplaint(cert)}
                      className="bg-[#b35a30] hover:bg-[#9a4b24] text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200"
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
