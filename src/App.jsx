import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"; // Import useLocation to track current route
import Home from "./Home";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Contact from "./Contact";
import Login from "./Login";
import Signup from "./Signup";
import UserHome from "./UserHome";
import IssuerHome from "./IssuerHome";
import AdminHome from "./AdminHome";
import CertificateView from "./CertificateView";
import ReportIssue from "./ReportIssue";
import ComplaintsPage from "./ComplaintsPage";
import Guidelines from "./Guidelines";
import IssuerNavbar from "./IssuerNavbar"; // Import IssuerNavbar
import "./App.css"; // Import your App's CSS file
import ForgotPassword from "./ForgotPassword";
import EventView from "./EventView";
import ViewTemplate from "./ViewTemplate";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged in state to false
  };

  return (
    <Router>
      {" "}
      {/* Ensure App is wrapped with Router */}
      <AppWithRouter
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        setIsLoggedIn={setIsLoggedIn}
      />
    </Router>
  );
};

const AppWithRouter = ({ isLoggedIn, onLogout, setIsLoggedIn }) => {
  const location = useLocation(); // Get current location (pathname)

  return (
    <>
      {/* Conditionally render IssuerNavbar only when logged in and on /issuer-home route */}
      {isLoggedIn && location.pathname === "/issuer-home" && (
        <IssuerNavbar onLogout={onLogout} handleQuery={() => {}} />
      )}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />

          {/* These routes are accessible after logging in */}
          <Route path="/user-home" element={<UserHome onLogout={onLogout} />} />
          <Route
            path="/issuer-home"
            element={<IssuerHome onLogout={onLogout} />}
          />
          <Route path="/view-template" element={<ViewTemplate />} />
          <Route path="/admin-home" element={<AdminHome />} />

          <Route path="/certificate-view/:id" element={<CertificateView />} />
          <Route path="/report-issue/:id" element={<ReportIssue />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/event-view" element={<EventView />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer>
        <p>Footer Content</p>
      </footer>
    </>
  );
};

export default App;
