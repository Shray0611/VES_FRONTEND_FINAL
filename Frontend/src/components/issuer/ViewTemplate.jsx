import React from "react";
import { useNavigate } from "react-router-dom";
import IssuerNavbar from "../layout/IssuerNavbar";
import { FiPlus } from "react-icons/fi";

const ViewTemplate = () => {
  const navigate = useNavigate();

  // Mock template data with absolute paths
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

  const handleUseTemplate = (templateImage) => {
    navigate("/generate", {
      state: { selectedTemplate: templateImage },
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle direct upload logic if needed
      navigate("/generate", {
        state: { selectedTemplate: URL.createObjectURL(file) },
      });
    }
  };

  // Add useEffect to check for token
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      <IssuerNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <br />
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
                  <button
                    onClick={() => handleUseTemplate(template.image)}
                    className="mt-2 w-full bg-[#4b3515] hover:bg-[#3f2f15] text-[#e4d7c8] px-4 py-2 rounded-lg  transition-colors duration-200"
                  >
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
                accept=".png,.jpg,.jpeg"
                onChange={handleUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <FiPlus className="w-12 h-12 mb-4" />
                <span className="text-lg font-medium">
                  Upload Custom Template
                </span>
                <span className="text-sm mt-1 text-gray-500">
                  (PNG, JPG, JPEG)
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
