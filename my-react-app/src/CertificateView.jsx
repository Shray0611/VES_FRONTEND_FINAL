import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const CertificateView = () => {
  const { id } = useParams();  // Extract the certificate ID from the URL
  const navigate = useNavigate();

  const handleReportIssue = () => {
    navigate(`/report-issue/${id}`);
  };

  return (
    <div className="certificate-view">
      <h1 className="certificate-title">Certificate View</h1>
      <img
        src={`/certificates/demo_certificate_${id}.webp`}
        alt={`Certificate ${id}`}
        className="certificate-image"
      />
      <div className="report-issue-button-container">
        <button 
          onClick={handleReportIssue} 
          className="report-issue-button"
        >
          Is There Any Issue?
        </button>
      </div>
    </div>
  );
};

export default CertificateView;
