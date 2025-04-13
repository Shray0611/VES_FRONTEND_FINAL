import React, { useState } from "react";

const CorrectionPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    division: "",
    rank: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Changes submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 flex items-center justify-center">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#edf2f7]">
          <h2 className="text-3xl font-light text-[#1e293b] text-center mb-8">
            Certificate Correction Request
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Middle Name", name: "middleName" },
              { label: "Last Name", name: "lastName" },
              { label: "Division", name: "division" },
              { label: "Rank", name: "rank" },
              { label: "Year", name: "year" },
            ].map(({ label, name }) => (
              <div key={name} className="space-y-1">
                <label className="text-sm text-[#64748b]" htmlFor={name}>
                  {label}
                </label>
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-[#edf2f7] 
                           focus:border-[#94a3b8] focus:ring-1 focus:ring-[#94a3b8]
                           outline-none text-[#1e293b]"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-[#334155] text-white py-3 px-6 rounded-lg 
                        font-normal hover:bg-[#475569] transition-colors 
                        flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Submit Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CorrectionPage;
