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
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup} className="form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </label>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
          >
            <option value="user">User</option>
            <option value="issuer">Issuer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" className="button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
