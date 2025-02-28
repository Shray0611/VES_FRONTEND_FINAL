import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/services" className="nav-link">Services</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
      <Link to="/login" className="nav-button">Login</Link>
      <Link to="/signup" className="nav-button">Signup</Link>
    </nav>
  );
};

export default Navbar;
