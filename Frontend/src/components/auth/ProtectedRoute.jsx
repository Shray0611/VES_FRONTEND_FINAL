import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || (allowedRoles && !allowedRoles.includes(role))) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
