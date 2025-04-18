import React, { useState } from "react";

const ComplaintModal = ({ certificateId, onClose, onSubmit }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a complaint message");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit({ certificateId, message });
      onClose();
    } catch (err) {
      console.error("Complaint submission error:", err);
      setError(err.message || "Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          File Complaint
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue..."
            className="w-full p-3 border border-gray-300 rounded-lg min-h-[150px] mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintModal;
