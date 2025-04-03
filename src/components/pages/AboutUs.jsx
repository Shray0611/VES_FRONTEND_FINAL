import React from "react";
import Navbar from "../layout/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#faf6f1] to-[#f0e5da] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading with subtle glow */}
          <h1 className="text-5xl font-bold text-[#4e3629] text-center mb-16 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#4e3629] to-[#b68c6b] drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
            About VESIT E-Certification
          </h1>

          <div className="space-y-20">
            <Section title="Our Mission">
              <p>
                At Vivekanand Education Society of Technology (VESIT), our
                mission is to revolutionize the certification process by
                providing a secure, efficient, and globally recognized platform.
                We aim to ensure that every credential issued maintains the
                highest level of authenticity and reliability.
              </p>
            </Section>

            <Section title="Our Vision">
              <p>
                To be a global leader in digital certification, fostering trust
                and transparency in academic and professional credentials. Our
                vision is to empower individuals and institutions with seamless
                access to verified credentials, driving growth and global
                recognition.
              </p>
            </Section>

            <Section
              title="Why Choose Us?"
              list={[
                "Seamless verification across global platforms.",
                "Intuitive and responsive user interface.",
                "Real-time status updates and tracking.",
                "Secure storage and easy retrieval of certificates.",
                "Global recognition and acceptance.",
              ]}
            />

            <Section title="Our Values">
              <p>
                We are driven by a commitment to excellence, transparency, and
                user-centric innovation. Our platform ensures equal access and
                recognition for all users, fostering trust and continuous
                improvement.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ title, children, list }) => (
  <div className="relative bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#e0e0e0] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.2)] hover:-translate-y-3">
    {/* Subtle glowing gradient orbs */}
    <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-tr from-[#d6a17e] to-[#b68c6b] rounded-full blur-[50px] opacity-40"></div>
    <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-tr from-[#d6a17e] to-[#b68c6b] rounded-full blur-[50px] opacity-40"></div>

    {/* Section Title */}
    <h2 className="text-3xl font-semibold text-[#4e3629] mb-6 border-b-2 border-[#b68c6b] pb-3 inline-block">
      {title}
    </h2>

    {list ? (
      <div className="space-y-6">
        {list.map((item, i) => (
          <div
            key={i}
            className="group flex items-center space-x-4 bg-[#fdf9f3] p-6 rounded-xl border-l-4 border-[#b68c6b] shadow-md transition-transform duration-300 hover:scale-[1.03] hover:border-[#d6a17e]"
          >
            <div className="bg-[#b68c6b] text-white font-medium px-4 py-2 rounded-full shadow-md transition-all duration-300 group-hover:bg-[#d6a17e]">
              {i + 1}
            </div>
            <p className="text-[#4e3629] leading-relaxed transition-all group-hover:text-[#2d2118]">
              {item}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-[#4e3629] leading-relaxed hover:text-[#2d2118] transition-all">
        {children}
      </p>
    )}
  </div>
);

export default AboutUs;
