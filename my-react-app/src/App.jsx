import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
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
import ComplaintsPage from "./ComplaintsPage"; // Import the ComplaintsPage component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/issuer-home" element={<IssuerHome />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/certificate-view/:id" element={<CertificateView />} />
        <Route path="/report-issue/:id" element={<ReportIssue />} />
        <Route path="/complaints" element={<ComplaintsPage />} /> {/* Add the complaints route */}
      </Routes>
    </Router>
  );
};

export default App;
