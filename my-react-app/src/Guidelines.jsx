import React from "react";
import { Link } from "react-router-dom";

const Guidelines = () => {
  return (
    <div className="guidelines" style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Guidelines</h1>
      <div style={{ maxWidth: "600px", margin: "20px auto", background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
        <h3>➡ Please put specific fields for custom template:</h3>
        <ul>
          <li>1.</li>
          <li>2.</li>
        </ul>

        <h3>➡ Excel sheet must have the following fields in each column:</h3>
        <ul>
          <li>1.</li>
          <li>2.</li>
        </ul>

        <h3>➡ Custom template must be uploaded in PNG format only.</h3>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/issuer-home" style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "white", textDecoration: "none", borderRadius: "5px" }}>Go Back</Link>
      </div>
    </div>
  );
};

export default Guidelines;
