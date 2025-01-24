import React from "react";

const AboutUs = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About VESIT E-Certification</h1>
      <p style={introTextStyle}>
        Welcome to the VESIT E-Certification platform, where we strive to bring the best in
        digital certification technology to educational institutions. Our platform is designed to
        make the certification process easier, faster, and more secure for students, educational
        institutions, and employers.
      </p>
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Our Mission</h2>
        <p style={paragraphStyle}>
          At VESIT E-Certification, our mission is to provide a seamless and trustworthy
          platform for issuing, verifying, and managing digital certificates. We aim to enhance
          the educational certification process by offering a secure, efficient, and transparent
          solution for all stakeholders involved.
        </p>
      </section>
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Our Vision</h2>
        <p style={paragraphStyle}>
          Our vision is to be the leading digital certification platform that empowers
          educational institutions to confidently issue and manage certificates. We seek to
          build a future where students, employers, and institutions can trust the authenticity
          and validity of digital certifications, simplifying recruitment processes and increasing
          global access to education.
        </p>
      </section>
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Why Choose Us?</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>Secure, tamper-proof certificates</li>
          <li style={listItemStyle}>Instant verification process</li>
          <li style={listItemStyle}>User-friendly interface for easy navigation</li>
          <li style={listItemStyle}>Real-time updates and notifications</li>
          <li style={listItemStyle}>Integration with institutions and employers worldwide</li>
        </ul>
      </section>
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Our Values</h2>
        <p style={paragraphStyle}>
          We are committed to delivering exceptional service and innovation. Our core values
          include transparency, trust, and reliability. We take pride in fostering an inclusive
          environment where our platform evolves based on feedback from our users and partners.
        </p>
      </section>
    </div>
  );
};

// Styles for the About Us page
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

const listStyle = {
  listStyleType: "disc",
  marginLeft: "20px",
  fontSize: "18px",
};

const listItemStyle = {
  marginBottom: "10px",
};

export default AboutUs ;