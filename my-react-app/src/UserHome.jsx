// UserHome.js
import React from "react";
import { Link } from "react-router-dom";
import './UserHome.css';

const UserHome = ({ onLogout }) => {
  const certificates = [
    { id: 1, event: "Tech Fest 2023", certificateName: "Participation Certificate" },
    { id: 2, event: "Hackathon 2023", certificateName: "Winner Certificate" },
    { id: 3, event: "AI Workshop", certificateName: "Completion Certificate" },
  ];

  const handleViewCertificate = (id) => {
    window.location.href = `/certificate-view/${id}`;
  };

  const handleDownloadCertificate = (id) => {
    const certificateUrl = `/certificates/demo_certificate_${id}.png`;
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = `certificate_${id}.png`;
    link.click();
  };

  return (
    <div className="user-home">
      <nav className="navbar">
        <div className="navbar-logo">VESIT</div>
        <ul className="navbar-links">
          <li><button>Home Page</button></li>
          <li><Link to="/complaints"><button>View Complaints</button></Link></li>
        </ul>
        <div className="user-info">
          <span className="user-name">Name</span>
          <button className="logout-btn" onClick={onLogout}>Log Out</button>
        </div>
      </nav>
      <h1>Welcome, User!</h1>
      <h2>Your Certificates</h2>
      <table className="certificates-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Certificate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map(cert => (
            <tr key={cert.id}>
              <td>{cert.event}</td>
              <td>{cert.certificateName}</td>
              <td>
                <div className="actions">
                  <button onClick={() => handleViewCertificate(cert.id)}>View</button>
                  <button onClick={() => handleDownloadCertificate(cert.id)}>Download</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHome;
