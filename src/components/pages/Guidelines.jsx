import React from "react";
import { Link } from "react-router-dom";
import IssuerNavbar from "./IssuerNavbar";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <IssuerNavbar></IssuerNavbar>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light text-[#1e293b] text-center mb-8">
          Certificate Issuance Guidelines
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#edf2f7] space-y-6">
          <section className="space-y-3">
            <h3 className="text-lg font-medium text-[#1e293b] flex items-center gap-2">
              <span className="text-blue-500">➡</span>
              Template Requirements
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-[#475569]">
              <li>1. Include specific fields for custom template</li>
              <li>2. Maintain standard certificate dimensions</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-medium text-[#1e293b] flex items-center gap-2">
              <span className="text-blue-500">➡</span>
              Excel File Specifications
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-[#475569]">
              <li>1. Required column headers must be included</li>
              <li>2. Maintain consistent data formatting</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-medium text-[#1e293b] flex items-center gap-2">
              <span className="text-blue-500">➡</span>
              File Format Requirements
            </h3>
            <p className="text-[#475569] pl-8">
              Custom templates must be uploaded in PNG format only
            </p>
          </section>

          <div className="pt-6 text-center">
            <Link
              to="/issuer-home"
              className="bg-[#334155] text-white px-6 py-2.5 rounded-lg
                        hover:bg-[#475569] transition-colors inline-flex
                        items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
