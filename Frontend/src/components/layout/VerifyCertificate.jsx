import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "/assets/VES-logo.png";

const VerifyCertificate = () => {
  const { code } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${baseUrl}/api/verify/${code}`);

        if (!response.ok) {
          throw new Error(`Verification failed: ${response.status}`);
        }

        const data = await response.json();
        console.log("Certificate verification response:", data);
        setResult(data);
      } catch (error) {
        console.error("Verification error:", error);
        setError(error.message || "Verification failed");
        setResult({ valid: false });
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      verifyCertificate();
    } else {
      setError("No verification code provided");
      setLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Simple Navbar */}
      <nav className="bg-[#f5f1e6] fixed top-0 left-0 w-full shadow-md z-50 border-b-2 border-[#e0c9a9]">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6 ml-4">
            <img src={logo} alt="Logo" className="h-14 w-auto" />
            <div className="text-[#5f4b32] font-bold text-lg">
              <b>VESIT Certificate Verification</b>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h1 className="text-2xl font-bold text-[#5f4b32] mb-6 text-center">
              Certificate Verification
            </h1>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5f4b32] mb-4"></div>
                <p className="text-gray-600">
                  Verifying certificate authenticity...
                </p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-600 text-5xl mb-4">❌</div>
                <h2 className="text-xl font-semibold text-red-700 mb-2">
                  Verification Failed
                </h2>
                <p className="text-red-600">{error}</p>
              </div>
            ) : result?.valid ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-green-600 text-5xl mb-4">✅</div>
                  <h2 className="text-xl font-semibold text-green-700">
                    Valid Certificate
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    This certificate has been verified as authentic
                  </p>
                </div>

                <div className="border-t border-green-200 pt-6 mt-4">
                  <h3 className="font-semibold text-[#5f4b32] mb-4">
                    Certificate Details:
                  </h3>

                  <div className="bg-white rounded-lg border border-green-200 overflow-hidden">
                    <ul className="divide-y divide-green-100">
                      {result.certificate?.studentData &&
                        Object.entries(result.certificate.studentData).map(
                          ([key, value]) => (
                            <li
                              key={key}
                              className="px-4 py-3 flex justify-between"
                            >
                              <span className="font-medium text-gray-700 capitalize">
                                {key.replace(/_/g, " ")}:
                              </span>
                              <span className="text-gray-600">{value}</span>
                            </li>
                          )
                        )}
                      <li className="px-4 py-3 flex justify-between bg-green-50">
                        <span className="font-medium text-gray-700">
                          Issued on:
                        </span>
                        <span className="text-gray-600">
                          {result.certificate?.createdAt
                            ? new Date(
                                result.certificate.createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "N/A"}
                        </span>
                      </li>
                      {result.certificate?.collection && (
                        <li className="px-4 py-3 flex justify-between">
                          <span className="font-medium text-gray-700">
                            Collection:
                          </span>
                          <span className="text-gray-600">
                            {result.certificate.collection}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-600 text-5xl mb-4">❌</div>
                <h2 className="text-xl font-semibold text-red-700 mb-2">
                  Invalid Certificate
                </h2>
                <p className="text-red-600">
                  We could not verify this certificate. It may be fraudulent or
                  the verification code may be incorrect.
                </p>
              </div>
            )}

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Powered by VESIT Certificate Management System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
