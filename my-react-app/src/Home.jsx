import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <section className="welcome-section">
        <h1>Welcome!</h1>
        <p>Create professional certificates effortlessly. Whether it’s for education, awards, or any special occasion, certificates are for everyone.</p>
        <img src="/welcome-image.png" alt="Welcome" />
      </section>
      <section className="receive-section">
        <h2>Instantly Receive Your E-certificate</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam laboriosam corrupti amet!</p>
        <img src="/receive-image.png" alt="Receive Certificate" />
      </section>
      <section className="template-section">
        <h2>Template Showcase</h2>
        <div className="template-grid">
          <img src="/template1.png" alt="Template 1" />
          <img src="/template2.png" alt="Template 2" />
          <img src="/template3.png" alt="Template 3" />
        </div>
      </section>
    </div>
  );
};

export default Home;
