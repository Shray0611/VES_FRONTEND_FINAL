import React, { useState } from "react";
import Navbar from "../layout/Navbar";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log("Form submitted:", { name, email, message });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8fafc] p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl font-light text-[#1e293b] text-center mb-8">
            Contact Us
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm p-8 border border-[#edf2f7]"
          >
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm text-[#64748b]" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#edf2f7] focus:border-[#94a3b8] focus:ring-1 focus:ring-[#94a3b8] outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-[#64748b]" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#edf2f7] focus:border-[#94a3b8] focus:ring-1 focus:ring-[#94a3b8] outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-[#64748b]" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#edf2f7] focus:border-[#94a3b8] focus:ring-1 focus:ring-[#94a3b8] outline-none h-32"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#334155] text-white py-3 px-6 rounded-lg font-normal
                        hover:bg-[#475569] transition-colors flex items-center justify-center gap-2"
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
