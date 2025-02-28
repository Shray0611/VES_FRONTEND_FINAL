import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic (e.g., sending data to a server)
    console.log("Form submitted:", { name, email, message });
  };

  return (
    <div style={contactStyle}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={textareaStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

// Styles for the Contact Page
const contactStyle = {
  padding: "40px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "400px",
  margin: "0 auto",
};

const inputGroupStyle = {
  margin: "10px 0",
  width: "100%",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "100%",
  marginTop: "5px",
};

const textareaStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "100%",
  height: "150px",
  marginTop: "5px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
};

export default Contact;
