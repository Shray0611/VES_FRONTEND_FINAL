import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const IssuerNavbar = ({ onLogout, handleQuery }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Handle Home button click
  const handleHomeClick = () => {
    navigate("/issuer-home"); // Redirect to issuer-home page
  };

  // Handle Logout
  const handleLogout = () => {
    // Your logout logic here (e.g., clearing local storage, state, etc.)
    navigate("/");  // Navigate to home page after logout
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={handleHomeClick} // Add onClick for logo to redirect to home
      >
        VESIT
      </div>
      <ul className="navbar-links">
        <li>
          <button
            onClick={handleHomeClick} // Add onClick for Home button to redirect to issuer-home
            className="navbar-button"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/view-template")}
            className="navbar-button"
          >
            View Template
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/guidelines")}
            className="navbar-guideline-button"
          >
            Guidelines
          </button>
        </li>
      </ul>
      <div className="user-info">
        <button
          onClick={handleQuery}
          className="query-button"
        >
          🔔
        </button>
        <span className="user-name">
          Council Name
        </span>
        <button
          className="logout-btn"
          onClick={handleLogout} // Log out button redirects to home
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default IssuerNavbar;
