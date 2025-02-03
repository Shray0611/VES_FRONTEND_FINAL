import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserNavbar from "./UserNavbar"; // Import UserNavbar component

const UserHome = ({ onLogout }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="user-home-container p-6 pt-24"> {/* Added pt-24 to add padding on top */}
      {/* Use UserNavbar and remove the old Navbar */}
      <UserNavbar onLogout={onLogout} />

      <h1 className="text-white text-3xl font-bold mb-4">Welcome, User!</h1>
      <h2 className="text-white text-2xl font-semibold mb-3">Your Certificates</h2>

      <table className="certificates-table w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Event</th>
            <th className="p-3 text-left">Certificate</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3"></td>
            <td className="p-3"></td>
            <td className="p-3"></td>
          </tr>
          <tr className="border-t">
            <td className="p-3"></td>
            <td className="p-3"></td>
            <td className="p-3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserHome;
