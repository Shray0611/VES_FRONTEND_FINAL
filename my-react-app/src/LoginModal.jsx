import React from 'react';

const LoginModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <p>Select your role:</p>
        <div className="role-buttons">
          <button>User</button>
          <button>Issuer</button>
          <button>Admin</button>
        </div>
        <button onClick={closeModal} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
