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

const publicRoutes = [
  /^\/$/, // Home
  /^\/about$/, // About
  /^\/services$/, // Services
  /^\/contact$/, // Contact
  /^\/login$/, // Login
  /^\/signup$/, // Signup
  /^\/forgotPassword$/, // Forgot Password
  /^\/verify\/[^/]+$/, // Verify with dynamic code
];

function isPublicRoute(pathname) {
  return publicRoutes.some((regex) => regex.test(pathname));
}

const AppWithRouter = ({ isLoggedIn, onLogout, setIsLoggedIn }) => {
  const location = useLocation(); // Get current location (pathname)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !isPublicRoute(location.pathname)) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      navigate("/login");
    }
  }, [location, navigate]);

  useEffect(() => {
    // If user is logged in and navigates to any public route, clear session and reload
    const token = localStorage.getItem("token");
    if (token && isPublicRoute(location.pathname)) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      window.location.replace(location.pathname); // Hard reload to clear history stack
    }
  }, [location]);

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
              <ProtectedRoute allowedRoles={["student"]}>
                <UserHome onLogout={onLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issuer-home"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <IssuerHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issuer-records"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <IssuerRecords onLogout={onLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CertificateGenerator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-template"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ViewTemplate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate-view/:id"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <CertificateView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-issue/:id"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ReportIssue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ComplaintsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guidelines"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Guidelines />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-view"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EventView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-view/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EventView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints-view"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
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
