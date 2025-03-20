import React from "react";

const LoginModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-[#f8fafc]/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg border border-[#edf2f7] w-full max-w-md relative p-8">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#64748b] hover:text-[#475569] transition-colors p-1 rounded-full hover:bg-[#f8fafc]"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-[#1e293b] text-center">
            Select Login Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex flex-col items-center p-6 rounded-xl border-2 border-[#edf2f7] hover:border-[#94a3b8] transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#334155] mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-[#475569] group-hover:text-[#334155] transition-colors">
                User
              </span>
            </button>

            <button className="flex flex-col items-center p-6 rounded-xl border-2 border-[#edf2f7] hover:border-[#94a3b8] transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#334155] mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-[#475569] group-hover:text-[#334155] transition-colors">
                Issuer
              </span>
            </button>

            <button className="flex flex-col items-center p-6 rounded-xl border-2 border-[#edf2f7] hover:border-[#94a3b8] transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#334155] mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-[#475569] group-hover:text-[#334155] transition-colors">
                Admin
              </span>
            </button>
          </div>

          <p className="text-center text-sm text-[#64748b]">
            Select your role to continue to the dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
