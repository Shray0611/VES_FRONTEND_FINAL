import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (role === "user") {
      navigate("/user-home");
    } else if (role === "issuer") {
      navigate("/issuer-home");
    } else if (role === "admin") {
      navigate("/admin-home");
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup} style={formStyle}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          >
            <option value="user">User</option>
            <option value="issuer">Issuer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" style={buttonStyle}>Signup</button>
      </form>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  width: "300px",
  marginTop: "5px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default Signup;
