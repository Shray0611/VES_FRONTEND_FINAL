import React from "react";
import { Link } from "react-router-dom";
import IssuerNavbar from "../layout/IssuerNavbar";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-[#F5E9D8] p-6 sm:p-8">
      <IssuerNavbar />
      <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#4A3C31] mb-3 font-serif">
            Certificate Issuance Guidelines
          </h1>
          <p className="text-[#6B5E4F] text-lg sm:text-xl font-sans">
            Please follow these specifications for successful certificate
            generation
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-xl shadow-md p-8 sm:p-10 border border-gray-200 space-y-12">
          {/* Template Requirements */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-10 bg-blue-600 rounded-full"></div>
              <h3 className="text-2xl font-semibold text-[#4A3C31] font-serif">
                Template Requirements
              </h3>
            </div>
            <ul className="space-y-4 text-[#6B5E4F] pl-0 font-sans">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <span>
                  Include specific fields for custom template (Name, Date,
                  Certificate ID)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <span>
                  Maintain standard dimensions of 1920×1080 pixels (Landscape
                  orientation)
                </span>
              </li>
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Excel Specifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-10 bg-green-600 rounded-full"></div>
              <h3 className="text-2xl font-semibold text-[#4A3C31] font-serif">
                Excel File Specifications
              </h3>
            </div>
            <ul className="space-y-4 text-[#6B5E4F] pl-0 font-sans">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <span>
                  Required columns: Full Name, Email, Issue Date, Certificate ID
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <span>
                  Maintain consistent data formatting (Dates: YYYY-MM-DD)
                </span>
              </li>
            </ul>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* File Format */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-10 bg-purple-600 rounded-full"></div>
              <h3 className="text-2xl font-semibold text-[#4A3C31] font-serif">
                File Format Requirements
              </h3>
            </div>
            <ul className="space-y-4 text-[#6B5E4F] pl-0 font-sans">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                <span>
                  Custom templates must be uploaded in PNG format (300 DPI
                  resolution)
                </span>
              </li>
            </ul>
          </div>

          {/* Return Button */}
          <div className="pt-8 mt-8 text-center">
            <Link
              to="/issuer-home"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8D5B9] text-[#4A3C31] rounded-lg
                        hover:bg-[#D9C4A5] transition-colors font-medium text-base sm:text-lg shadow-sm hover:shadow-md"
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
