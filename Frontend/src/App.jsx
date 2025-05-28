import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"; // Import useLocation to track current route
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import Services from "./components/pages/Services";
import Contact from "./components/pages/Contact";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import UserHome from "./components/user/UserHome";
import IssuerRecords from "./components/issuer/IssuerRecords";
import AdminHome from "./components/admin/AdminHome";
import CertificateView from "./components/user/CertificateView";
import ReportIssue from "./components/complaints/ReportIssue";
import ComplaintsPage from "./components/complaints/ComplaintsPage";
import Guidelines from "./components/pages/Guidelines";
import IssuerNavbar from "./components/layout/IssuerNavbar"; // Import IssuerNavbar
import IssuerHome from "./components/issuer/IssuerHome"; // Import IssuerHome
import VerifyCertificate from "./components/layout/VerifyCertificate"; // Import VerifyCertificate
import IssuerComplaints from "./components/complaints/IssuerComplaints"; // Import IssuerComplaints
import "./App.css"; // Import your App's CSS file
import ForgotPassword from "./components/auth/ForgotPassword";
import EventView from "./components/issuer/EventView";
import ViewTemplate from "./components/issuer/ViewTemplate";
import ComplaintView from "./components/complaints/ComplaintView";
import CertificateGenerator from "./components/issuer/CertificateGenerator";
import ProtectedRoute from "./components/auth/ProtectedRoute";


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
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for browser back/forward navigation
    const handlePopState = () => {
      localStorage.setItem("sessionExpired", "true");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    // If sessionExpired flag is set, clear session and redirect
    if (localStorage.getItem("sessionExpired") === "true") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      localStorage.removeItem("sessionExpired");
      navigate("/login");
      return;
    }
    const token = localStorage.getItem("token");
    if (
      !token &&
      ![
        "/login",
        "/signup",
        "/forgotPassword",
        "/verify/:code",
        "/",
        "/about",
        "/services",
        "/contact",
      ].includes(location.pathname)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <>
      {/* Conditionally render IssuerNavbar on issuer routes (temporarily without login check for testing) */}
      {(location.pathname === "/issuer-home" ||
        location.pathname === "/issuer-records" ||
        location.pathname === "/view-template" ||
        location.pathname === "/complaints-view") && (
        <IssuerNavbar onLogout={onLogout} handleQuery={() => {}} />
      )}

      <div className="main-content">
        <Routes>
          {/* Public routes */}
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
          <Route path="/verify/:code" element={<VerifyCertificate />} />

          {/* Protected routes */}
          <Route
            path="/user-home"
            element={
              <ProtectedRoute>
                <UserHome onLogout={onLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issuer-home"
            element={
              <ProtectedRoute>
                <IssuerHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issuer-records"
            element={
              <ProtectedRoute>
                <IssuerRecords onLogout={onLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                <CertificateGenerator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-template"
            element={
              <ProtectedRoute>
                <ViewTemplate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/dashboard"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate-view/:id"
            element={
              <ProtectedRoute>
                <CertificateView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-issue/:id"
            element={
              <ProtectedRoute>
                <ReportIssue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <ComplaintsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guidelines"
            element={
              <ProtectedRoute>
                <Guidelines />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-view"
            element={
              <ProtectedRoute>
                <EventView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-view/:id"
            element={
              <ProtectedRoute>
                <EventView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints-view"
            element={
              <ProtectedRoute>
                <IssuerComplaints />
              </ProtectedRoute>
            }
          />
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
