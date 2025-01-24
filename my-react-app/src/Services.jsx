import React from "react";

const Services = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Our Services</h1>
      <p style={introTextStyle}>
        At VESIT E-Certification, we offer a variety of digital certification services that cater to
        educational institutions, students, and employers. Our platform makes the certification
        process seamless, secure, and efficient.
      </p>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Certificate Issuance</h2>
        <p style={paragraphStyle}>
          We enable educational institutions to issue digital certificates quickly and securely. 
          Whether it's for a course completion, event participation, or any other certification, 
          our platform provides a seamless experience for both issuers and recipients.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Certificate Verification</h2>
        <p style={paragraphStyle}>
          Employers and institutions can easily verify the authenticity of certificates issued by
          VESIT E-Certification. Our platform ensures that the verification process is fast, secure, 
          and free of fraud.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Real-Time Notifications</h2>
        <p style={paragraphStyle}>
          Stay updated in real-time about the status of issued certificates, requests for verification,
          and more. Our notification system keeps everyone informed, ensuring no step is missed in the
          certification process.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Secure Access</h2>
        <p style={paragraphStyle}>
          We prioritize security. VESIT E-Certification employs the latest security measures to ensure
          that certificates are tamper-proof and safe from unauthorized access.
        </p>
      </section>
    </div>
  );
};

// Reuse styles from the About Us page
const containerStyle = {
  padding: "30px",
  maxWidth: "900px",
  margin: "0 auto",
};

const headingStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
  marginBottom: "20px",
};

const introTextStyle = {
  fontSize: "18px",
  color: "#555",
  lineHeight: "1.6",
  textAlign: "center",
  marginBottom: "30px",
};

const sectionStyle = {
  marginBottom: "20px",
};

const subHeadingStyle = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "10px",
};

const paragraphStyle = {
  fontSize: "18px",
  color: "#555",
  lineHeight: "1.6",
};

export default Services;
