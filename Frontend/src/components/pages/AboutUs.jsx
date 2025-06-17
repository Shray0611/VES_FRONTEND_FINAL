import React from "react";
import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4] text-gray-900 py-16 px-6 flex flex-col">
        <div className="flex-grow">
          {/* Hero */}
          <div className="max-w-6xl mx-auto text-center mb-20">
            <br />
            <motion.h1
              className="text-5xl font-extrabold drop-shadow-xl mb-4 text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Seamless Digital Certification
            </motion.h1>
            <motion.p
              className="text-lg text-gray-800 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Designed especially for VESIT students, the E-Certificate platform
              offers a simple, secure, and reliable way to access your official
              digital certificates anytime, anywhere.
            </motion.p>
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
          <div className="max-w-7xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
              What We Offer
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
              {features.slice(0, 3).map((feature, i) => (
                <FeatureCard key={i} {...feature} delay={i * 0.1} />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 mt-6 justify-items-center">
              {features.slice(3).map((feature, i) => (
                <FeatureCard key={i + 3} {...feature} delay={(i + 3) * 0.1} />
              ))}
            </div>
          </div>

          {/* Development Team Section */}
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
              Our Development Team
            </h2>

            {/* Faculty Advisor */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-[#5f4b32] text-center mb-8">
                Faculty Advisor
              </h3>
              <div className="flex justify-center">
                <TeamMemberCard name="Ms. Pooja Shetty" delay={0} />
              </div>
            </div>

            {/* Development Team */}
            <div>
              <h3 className="text-2xl font-semibold text-[#5f4b32] text-center mb-8">
                Development Team
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  "Arjun Prabhu",
                  "Avan Shetty",
                  "Dimple Dalwani",
                  "Soham Thakur",
                  "Shakti Sankpal",
                  "Om Satam",
                ].map((name, index) => (
                  <TeamMemberCard key={name} name={name} delay={0.1 * index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <footer className="bg-[#5f4b32] text-white py-12 mt-auto relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                <img
                  src="/assets/VES-logo.png"
                  alt="VESIT-ECertificate Logo"
                  className="w-12 h-16 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                VESIT E-Certificate
              </h3>
              <p className="text-white/70 leading-relaxed">
                Professional certificate generation and management platform for
                educational excellence
              </p>
            </div>

            {/* Solutions Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-6 relative">
                Solutions
                <div className="absolute bottom-0 left-0 md:left-0 w-12 h-0.5 bg-white/40 mx-auto md:mx-0"></div>
              </h3>
              <ul className="space-y-3">
                {["Certificate Generation"].map((link) => (
                  <li key={link}>
                    <a
                      href="/about"
                      className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block group"
                    >
                      <span className="group-hover:border-b border-white/40 pb-1">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-6 relative">
                Legal
                <div className="absolute bottom-0 left-0 md:left-0 w-12 h-0.5 bg-white/40 mx-auto md:mx-0"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Data Protection",
                  "Compliance",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block group"
                    >
                      <span className="group-hover:border-b border-white/40 pb-1">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-6 relative">
                Contact Us
                <div className="absolute bottom-0 left-0 md:left-0 w-12 h-0.5 bg-white/40 mx-auto md:mx-0"></div>
              </h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <ul className="space-y-3">
                  {["Email: superadmin@ves.ac.in"].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block group"
                      >
                        <span className="group-hover:border-b border-white/40 pb-1">
                          {link}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-white/20 pt-6">
            <p className="text-sm text-white/60 flex items-center justify-center gap-2">
              <span>© {new Date().getFullYear()}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <span className="font-medium text-white/80">
                VESIT E-Certificate
              </span>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <span>All rights reserved</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

// Components
const GlassCard = ({ title, content }) => (
  <motion.div
    className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border border-white/20 hover:scale-[1.03] transition-transform duration-300 ease-in-out hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-white/30"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 tracking-tight">
      {title}
    </h3>
    <p className="text-gray-800 text-sm md:text-base leading-relaxed">
      {content}
    </p>
  </motion.div>
);

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    className="relative group bg-white/60 text-gray-900 p-6 rounded-3xl shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <div className="text-5xl mb-4 drop-shadow-md">{icon}</div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-gray-700">{description}</p>
    <div className="absolute -top-4 -right-4 bg-white/40 w-10 h-10 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-all duration-300"></div>
  </motion.div>
);

const TeamMemberCard = ({ name, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-[#e0c9a9]/30 flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#e0c9a9] bg-[#f8e5c5] mb-4 flex items-center justify-center">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
      </div>
      <h3 className="text-lg font-bold text-[#5f4b32] text-center">{name}</h3>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="bg-[#5f4b32] text-white py-12 relative overflow-hidden mt-16">
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center border-t border-white/20 pt-6">
        <p className="text-sm text-white/60 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} VESIT E-Certificate</span>
          <span className="hidden sm:inline">•</span>
          <span>All rights reserved</span>
        </p>
      </div>
    </div>
  </footer>
);

// Data
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
