import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

const TeamMemberCard = ({ name, imageUrl, delay = 0 }) => {
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
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#e0c9a9] bg-[#f8e5c5] mb-4">
        <img
          src={imageUrl || "/assets/placeholder-avatar.jpg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-[#5f4b32] text-center">{name}</h3>
    </motion.div>
  );
};

const DevelopmentTeam = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <Navbar onLogout={handleLogout} />

        {/* Page Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#5f4b32] mb-4">
            Our Development Team
          </h1>
        </motion.div>

        {/* Faculty Advisor */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-[#5f4b32] text-center">
            Faculty Advisor
          </h2>
          <div className="max-w-xs mx-auto">
            <TeamMemberCard
              name="Ms. Pooja Shetty"
              imageUrl="/assets/faculty-advisor.jpg"
            />
          </div>
        </motion.section>

        {/* Development Team */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-[#5f4b32] text-center">
            Development Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Arjun Prabhu",
              "Avan Shetty",
              "Dimple Dalwani",
              "Soham Thakur",
              "Shakti Sankpal",
              "Om Satam",
            ].map((name, index) => (
              <TeamMemberCard
                key={name}
                name={name}
                imageUrl={`/assets/team/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                delay={0.1 * (index % 2 === 0 ? index / 2 : Math.ceil(index / 2))}
              />
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-[#5f4b32] text-white py-12 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
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
    </div>
  );
};

export default DevelopmentTeam;