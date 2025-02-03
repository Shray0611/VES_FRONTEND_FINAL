import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {  // Get onLogin from props
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Trigger onLogin here after the role check
    onLogin();  // Calling the onLogin function passed via props

    if (role === "user") {
      navigate("/user-home");
    } else if (role === "issuer") {
      navigate("/issuer-home");
    } else if (role === "admin") {
      navigate("/admin-home");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
          >
            <option value="user">User</option>
            <option value="issuer">Issuer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
