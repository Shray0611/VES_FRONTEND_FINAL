import React from "react";
import Navbar from "../layout/Navbar";

const ServiceCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#e0c9a9]/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#f8e5c5]/30 rounded-full -mr-12 -mt-12" />

      <div className="flex items-start gap-4">
        <div className="bg-[#f8e5c5] w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
          <Icon className="text-[#5f4b32] w-6 h-6" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#5f4b32] mb-3">{title}</h2>
          <p className="text-[#7d6954] leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureItem = ({ children, index }) => {
  return (
    <motion.li
      className="flex items-center gap-2 text-[#7d6954]"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <CheckCircle className="text-[#d4b88f] w-5 h-5 shrink-0" />
      <span>{children}</span>
    </motion.li>
  );
};

const Services = () => {
  const services = [
    {
      icon: Award,
      title: "Certificate Issuance",
      description:
        "We enable educational institutions to issue digital certificates quickly and securely. Whether it's for a course completion, event participation, or any other certification, our platform provides a seamless experience for both issuers and recipients.",
    },
    {
      icon: Shield,
      title: "Certificate Verification",
      description:
        "Employers and institutions can easily verify the authenticity of certificates issued by VESIT E-Certification. Our platform ensures that the verification process is fast, secure, and free of fraud.",
    },
    {
      icon: Bell,
      title: "Real-Time Notifications",
      description:
        "Stay updated in real-time about the status of issued certificates, requests for verification, and more. Our notification system keeps everyone informed, ensuring no step is missed in the certification process.",
    },
    {
      icon: Lock,
      title: "Secure Access",
      description:
        "We prioritize security. VESIT E-Certification employs the latest security measures to ensure that certificates are tamper-proof and safe from unauthorized access.",
    },
  ];

  const features = [
    "Bulk certificate generation",
    "Custom certificate templates",
    "Digital signature integration",
    "Automated email delivery",
    "Analytics dashboard",
    "API access for integrations",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        className="relative py-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[#e0c9a9]/10 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#5f4b32] mb-6">Our Services</h1>
            <p className="text-xl text-[#7d6954] leading-relaxed">
              At VESIT E-Certification, we offer a variety of digital certification services that cater to educational
              institutions, students, and employers. Our platform makes the certification process seamless, secure, and
              efficient.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/70 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#5f4b32] mb-6">Additional Features</h2>
              <p className="text-[#7d6954] mb-8 text-lg">
                Our platform goes beyond basic certification with a comprehensive suite of features designed to
                streamline your workflow and enhance the value of your certificates.
              </p>

              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <FeatureItem key={feature} index={index}>
                    {feature}
                  </FeatureItem>
                ))}
              </ul>

              <motion.button
                className="mt-8 bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-white rounded-xl shadow-lg p-6 border border-[#e0c9a9]/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f8e5c5]/30 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f8e5c5]/30 rounded-full -ml-16 -mb-16" />

                <div className="relative">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Certificate Platform"
                    className="w-full h-auto rounded-lg shadow-md mb-6"
                  />

                  <div className="bg-[#f8e5c5]/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-[#5f4b32] mb-3">Trusted by Leading Institutions</h3>
                    <p className="text-[#7d6954]">
                      Join hundreds of educational institutions that trust VESIT E-Certification for their digital
                      certification needs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] rounded-2xl shadow-xl p-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <h2 className="text-3xl font-bold text-[#5f4b32] mb-4">Ready to Modernize Your Certification Process?</h2>
          <p className="text-[#5f4b32]/80 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that use our platform to create professional certificates
          </p>
          <motion.button
            className="bg-[#5f4b32] text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 inline-flex items-center gap-2"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Today
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-[#5f4b32] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/70">© {new Date().getFullYear()} VESIT-ECertificate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;