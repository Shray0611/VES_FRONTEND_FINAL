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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Changes submitted:", formData);
    // Add logic to process the form data, e.g., send it to a server
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Correction Page
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "First Name", name: "firstName" },
          { label: "Middle Name", name: "middleName" },
          { label: "Last Name", name: "lastName" },
          { label: "Division", name: "division" },
          { label: "Rank", name: "rank" },
          { label: "Year", name: "year" },
        ].map(({ label, name }) => (
          <div key={name} className="flex items-center justify-between">
            <label htmlFor={name} className="w-1/3 text-gray-700">
              {label}:
            </label>
            <input
              type="text"
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        ))}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Make Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CorrectionPage;