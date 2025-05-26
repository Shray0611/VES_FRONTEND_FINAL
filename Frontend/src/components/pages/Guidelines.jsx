import React from "react";
import { Link } from "react-router-dom";
import IssuerNavbar from "../layout/IssuerNavbar";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-[#F5E9D8] p-6 sm:p-8">
      <IssuerNavbar />
      <div className="max-w-4xl mx-auto mt-8 sm:mt-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#4A3C31] mb-2">
            Certificate Issuance Guidelines
          </h1>
          <p className="text-[#6B5E4F] text-lg">
            Please follow these specifications for successful certificate
            generation
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200 space-y-8">
          {/* Template Requirements */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-[#4A3C31]">
                Template Requirements
              </h3>
            </div>
            <ul className="space-y-3 text-[#6B5E4F] pl-8">
              <li className="relative before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-blue-600 before:rounded-full">
                Include specific fields for custom template (Name, Date,
                Certificate ID)
              </li>
              <li className="relative before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-blue-600 before:rounded-full">
                Maintain standard dimensions of 1920×1080 pixels (Landscape
                orientation)
              </li>
            </ul>
          </div>

          {/* Excel Specifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-green-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-[#4A3C31]">
                Excel File Specifications
              </h3>
            </div>
            <ul className="space-y-3 text-[#6B5E4F] pl-8">
              <li className="relative before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Required columns: Full Name, Email, Issue Date, Certificate ID
              </li>
              <li className="relative before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Maintain consistent data formatting (Dates: YYYY-MM-DD)
              </li>
            </ul>
          </div>

          {/* File Format */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-[#4A3C31]">
                File Format Requirements
              </h3>
            </div>
            <div className="text-[#6B5E4F] pl-8">
              <p className="relative before:absolute before:left-[-1.25rem] before:top-2 before:w-2 before:h-2 before:bg-purple-600 before:rounded-full">
                Custom templates must be uploaded in PNG format (300 DPI
                resolution)
              </p>
            </div>
          </div>

          {/* Return Button */}
          <div className="pt-8 mt-8 border-t border-gray-200 text-center">
            <Link
              to="/issuer-home"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8D5B9] text-[#4A3C31] rounded-lg
                        hover:bg-[#D9C4A5] transition-colors font-medium text-sm sm:text-base"
            >
              <span aria-hidden="true">←</span>
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
