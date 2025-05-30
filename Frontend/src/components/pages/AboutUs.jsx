import React from "react";
import Navbar from "../layout/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] text-gray-900 py-16 px-6">
        {/* Hero */}
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h1 className="text-5xl font-extrabold drop-shadow-xl mb-4 text-gray-900">
            Seamless Digital Certification at Scale
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            VESIT E-Certification provides secure, automated, and globally trusted digital certificates — combining advanced technology with user-friendly design.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          <GlassCard
            title="Our Mission"
            content="To empower institutions and learners with tamper-proof, instantly verifiable digital credentials."
          />
          <GlassCard
            title="Our Vision"
            content="To redefine trust in academic and professional certifications through technology and transparency."
          />
          <GlassCard
            title="Core Values"
            content="Innovation, integrity, user-centricity, and a commitment to digital trust and accessibility for all."
          />
          <GlassCard
            title="Trusted Infrastructure"
            content="Our platform ensures high availability, security, and scalability for institutions of every size."
          />
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const GlassCard = ({ title, content }) => (
  <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700">{content}</p>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="relative group bg-white/60 text-gray-900 p-6 rounded-3xl shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
    <div className="text-5xl mb-4 drop-shadow-md">{icon}</div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-gray-700">{description}</p>
    <div className="absolute -top-4 -right-4 bg-white/40 w-10 h-10 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-all duration-300"></div>
  </div>
);

const features = [
  {
    title: "Instant E-Certificate Generation",
    description:
      "Automatically generate personalized certificates immediately after event or course completion.",
    icon: "⚡",
  },
  {
    title: "QR Code Verification",
    description:
      "Each certificate includes a unique QR code for instant, tamper-proof verification.",
    icon: "🔐",
  },
  {
    title: "Blockchain Security",
    description:
      "Leverage blockchain technology to secure credentials and prevent unauthorized edits.",
    icon: "🛡️",
  },
  {
    title: "Bulk Certificate Upload",
    description:
      "Upload CSVs or spreadsheets to generate hundreds of certificates in a single action.",
    icon: "🧾",
  },
  {
    title: "Custom Certificate Templates",
    description:
      "Easily design certificates that match your brand with fully customizable layouts.",
    icon: "🎨",
  },
  {
    title: "Centralized Certificate Repository",
    description:
      "Access all issued certificates organized by year, event, or department — in one secure place.",
    icon: "📁",
  },
];

export default AboutUs;
