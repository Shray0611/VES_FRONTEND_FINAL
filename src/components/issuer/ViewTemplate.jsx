import React from "react";
import IssuerNavbar from "./IssuerNavbar";
import { FiPlus } from "react-icons/fi";

const ViewTemplate = () => {
  // Mock template data
  const templates = [
    {
      id: 1,
      title: "Classic Academic",
      image: "/assets/ViewTemplates/classic.png",
    },
    {
      id: 2,
      title: "Modern Design",
      image: "/assets/ViewTemplates/modern.jpg",
    },
    {
      id: 3,
      title: "Vintage Style",
      image: "/assets/ViewTemplates/vintage.png",
    },
    {
      id: 4,
      title: "Corporate Theme",
      image: "/assets/ViewTemplates/corporate.png",
    },
    {
      id: 5,
      title: "Creative Layout",
      image: "/assets/ViewTemplates/creative.png",
    },
  ];

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <IssuerNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mt-8">
            Certificate Templates
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {template.title}
                  </h3>
                  <button className="mt-2 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Custom Template Upload */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <label className="cursor-pointer p-4 flex flex-col items-center justify-center h-full min-h-[300px]">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <FiPlus className="w-12 h-12 mb-4" />
                <span className="text-lg font-medium">
                  Upload Custom Template
                </span>
                <span className="text-sm mt-1 text-gray-500">
                  (PDF, PNG, JPG)
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTemplate;
