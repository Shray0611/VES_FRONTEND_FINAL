import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useInView, useAnimation } from "framer-motion";
import { ArrowRight, Award, CheckCircle, Clock, Shield } from "lucide-react";
import Navbar from "../layout/Navbar";

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-[#e0c9a9]/30"
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="bg-[#f8e5c5] w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-[#5f4b32] w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-[#5f4b32] mb-2">{title}</h3>
      <p className="text-[#7d6954]">{description}</p>
    </motion.div>
  );
};

const TemplateCard = ({ imageSrc, index }) => {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-md aspect-[3/4]"
      whileHover={{
        scale: 1.05,
        zIndex: 10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.1 * index,
          duration: 0.5,
        },
      }}
    >
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={`Template ${index + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white">
          <p className="font-medium">Template {index + 1}</p>
          <button className="mt-2 text-sm flex items-center gap-1 text-white/80 hover:text-white">
            Preview <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#e0c9a9] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        <Navbar onLogout={handleLogout} />

        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-[#e0c9a9]/30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-[#5f4b32] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Create Professional Certificates Effortlessly
            </motion.h1>
            <motion.p
              className="text-[#7d6954] text-lg md:text-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Transform your recognition process with our seamless
              e-certification platform for education, awards, and special
              occasions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button
                onClick={() => navigate("/issuer-home")}
                className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Go to Issuer Dashboard
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#e0c9a9]/20"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(224,201,169,0.2) 0%, rgba(224,201,169,0) 100%)",
                  "linear-gradient(225deg, rgba(224,201,169,0.2) 0%, rgba(224,201,169,0) 100%)",
                  "linear-gradient(45deg, rgba(224,201,169,0.2) 0%, rgba(224,201,169,0) 100%)",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.img
              src="/assets/welcome_img.png"
              alt="Welcome Certificate"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5f4b32] mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-[#7d6954] text-lg max-w-2xl mx-auto">
              Our comprehensive solution streamlines the entire certification
              process
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeInSection delay={0.1}>
              <FeatureCard
                icon={Clock}
                title="Instant Delivery"
                description="Securely issue and distribute certificates with real-time tracking"
              />
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <FeatureCard
                icon={Shield}
                title="Secure Verification"
                description="Each certificate includes unique verification features"
              />
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <FeatureCard
                icon={CheckCircle}
                title="Bulk Generation"
                description="Create hundreds of certificates in minutes with our tools"
              />
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <FeatureCard
                icon={Award}
                title="Custom Templates"
                description="Choose from our gallery or create your own unique designs"
              />
            </FadeInSection>
          </div>
        </FadeInSection>

        {/* Excel Integration Section */}
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="flex items-center justify-center rounded-3xl overflow-hidden shadow-lg bg-white/70 p-8"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.img
                src="/assets/excel_pic.png"
                alt="Excel integration"
                className="max-w-full max-h-[300px] object-contain"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-[#e0c9a9]/30"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#5f4b32] mb-4">
                Bulk Certificate Generation
              </h2>
              <p className="text-[#7d6954] text-lg leading-relaxed mb-6">
                Import data directly from Excel spreadsheets to generate
                hundreds of personalized certificates in minutes. Our smart
                system handles all the formatting for you.
              </p>
              <ul className="space-y-3">
                {[
                  "Upload your Excel file",
                  "Map your columns",
                  "Choose a template",
                  "Generate all certificates",
                ].map((step, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 text-[#7d6954]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#e0c9a9] text-[#5f4b32] text-sm font-medium">
                      {index + 1}
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </FadeInSection>

        {/* Template Gallery Section */}
        <FadeInSection>
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-[#e0c9a9]/30">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5f4b32] text-center mb-8">
              Template Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((num, index) => (
                <TemplateCard
                  key={num}
                  imageSrc={`/assets/templates/certi_demo_${num}.png`}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32] font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 inline-flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                View All Templates
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </FadeInSection>

        {/* CTA Section */}
        <FadeInSection>
          <motion.div
            className="bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] rounded-3xl shadow-xl p-10 text-center"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#5f4b32] mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[#5f4b32]/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of organizations that use our platform to create
              professional certificates
            </p>
            <motion.button
              onClick={() => navigate("/issuer-home")}
              className="bg-[#5f4b32] text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 inline-flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Create Your First Certificate
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </FadeInSection>
      </div>

      {/* Footer */}
      <footer className="bg-[#5f4b32] text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">VESIT-ECertificate</h3>
            <p className="text-white/80">
              Professional certificate generation and management platform
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Features", "Templates", "Pricing", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-6 mt-6 border-t border-white/20 text-center">
          <p className="text-sm md:text-base text-white/70">
            © {new Date().getFullYear()} VESIT-ECertificate. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
