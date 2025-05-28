import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
