import React from "react";
import Navbar from "./Navbar";

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h1>
        <p className="text-gray-600 mb-6">
          At VESIT E-Certification, we offer a variety of digital certification
          services that cater to educational institutions, students, and
          employers. Our platform makes the certification process seamless,
          secure, and efficient.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Certificate Issuance
          </h2>
          <p className="text-gray-600">
            We enable educational institutions to issue digital certificates
            quickly and securely. Whether it's for a course completion, event
            participation, or any other certification, our platform provides a
            seamless experience for both issuers and recipients.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Certificate Verification
          </h2>
          <p className="text-gray-600">
            Employers and institutions can easily verify the authenticity of
            certificates issued by VESIT E-Certification. Our platform ensures
            that the verification process is fast, secure, and free of fraud.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Real-Time Notifications
          </h2>
          <p className="text-gray-600">
            Stay updated in real-time about the status of issued certificates,
            requests for verification, and more. Our notification system keeps
            everyone informed, ensuring no step is missed in the certification
            process.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Secure Access
          </h2>
          <p className="text-gray-600">
            We prioritize security. VESIT E-Certification employs the latest
            security measures to ensure that certificates are tamper-proof and
            safe from unauthorized access.
          </p>
        </section>
      </div>
    </>
  );
};

export default Services;
