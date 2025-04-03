import React from "react";
import Navbar from "../layout/Navbar";
import { BadgeCheck, ShieldCheck, Bell, FileText } from "lucide-react";

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl border border-gray-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center leading-relaxed">
          Empowering educational institutions, students, and employers with
          secure and seamless digital certification solutions.
        </p>

        {/* Certificate Issuance */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <FileText size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Certificate Issuance
              </h2>
              <p className="text-gray-600">
                Generate and distribute certificates quickly and securely. Ideal
                for course completion, event participation, and professional
                achievements.
              </p>
            </div>
          </div>

          {/* Certificate Verification */}
          <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <BadgeCheck size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Certificate Verification
              </h2>
              <p className="text-gray-600">
                Instantly verify certificate authenticity. Our secure system
                ensures fast, fraud-proof verification for employers and
                institutions.
              </p>
            </div>
          </div>

          {/* Real-Time Notifications */}
          <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
              <Bell size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Real-Time Notifications
              </h2>
              <p className="text-gray-600">
                Stay updated with real-time notifications for certificate status
                and verification requests. Never miss an important update.
              </p>
            </div>
          </div>

          {/* Secure and Reliable */}
          <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="p-3 bg-red-100 text-red-600 rounded-full">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Secure and Reliable
              </h2>
              <p className="text-gray-600">
                We use advanced encryption and security protocols to protect
                certificates from tampering and unauthorized access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
