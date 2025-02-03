import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';  // Import the Navbar component

const Home = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    // Your logout logic here (e.g., clearing local storage, state, etc.)
    navigate("/");  // Navigate to the landing page after logout
  };

  // Handle Notification Query
  const handleQuery = () => {
    console.log("Query clicked");
  };

  return (
    <div className="home-container">
      <Navbar />  {/* Add the Navbar component here */}
      
      <section className="welcome-section">
        <h1>Welcome!</h1>
        <p className="font-sans">Create professional certificates effortlessly. Whether it’s for education, awards, or any special occasion, certificates are for everyone.</p>
        <img src="/welcome-image.png" alt="Welcome" className="welcome-image" />
      </section>
      <section className="receive-section">
        <h2>Instantly Receive Your E-certificate</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam laboriosam corrupti amet!</p>
        <img src="/receive-image.png" alt="Receive Certificate" className="receive-image" />
      </section>
      <section className="template-section">
        <h2>Template Showcase</h2>
        <div className="template-grid">
          <img src="/template1.png" alt="Template 1" className="template-image" />
          <img src="/template2.png" alt="Template 2" className="template-image" />
          <img src="/template3.png" alt="Template 3" className="template-image" />
        </div>
      </section>
    </div>
  );
};

export default Home;
