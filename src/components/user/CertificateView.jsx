import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const CertificateView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-[#1e293b]">
            Certificate #{id}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#edf2f7] mb-8">
          <img
            src={`/certificates/demo_certificate_${id}.webp`}
            alt={`Certificate ${id}`}
            className="w-full h-auto object-contain rounded-lg border border-[#edf2f7]"
          />
        </div>

        <button
          onClick={() => navigate(`/report-issue/${id}`)}
          className="bg-[#334155] text-white px-6 py-3 rounded-lg font-normal
                    hover:bg-[#475569] transition-all flex items-center gap-2 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Report Issue
        </button>
      </div>
    </div>
  );
};

export default CertificateView;
