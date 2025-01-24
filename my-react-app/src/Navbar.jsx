import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
      <Link to="/login" style={buttonStyle}>Login</Link>
      <Link to="/signup" style={buttonStyle}>Signup</Link>
    </nav>
  );
};

const navbarStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "#fff",
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  padding: "0 10px",
};

const buttonStyle = {
  textDecoration: "none",
  color: "#fff",
  padding: "5px 10px",
  backgroundColor: "#007bff",
  borderRadius: "5px",
};

export default Navbar;
