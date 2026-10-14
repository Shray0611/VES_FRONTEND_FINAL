import React, { useState } from "react";
import Navbar from "../layout/Navbar";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8f1e9] flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white p-6 shadow-md rounded-2xl border border-[#e0cfc1]">
          <h1 className="text-2xl font-medium text-[#4b3621] text-center mb-6">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#6d4c41]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full p-2 rounded-lg border border-[#e0cfc1] focus:border-[#a1887f] focus:ring-1 focus:ring-[#a1887f] outline-none transition text-[#4b3621]"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#6d4c41]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-2 rounded-lg border border-[#e0cfc1] focus:border-[#a1887f] focus:ring-1 focus:ring-[#a1887f] outline-none transition text-[#4b3621]"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#6d4c41]"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full p-2 rounded-lg border border-[#e0cfc1] focus:border-[#a1887f] focus:ring-1 focus:ring-[#a1887f] outline-none transition text-[#4b3621] h-28 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#4b3621] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#6d4c41] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
