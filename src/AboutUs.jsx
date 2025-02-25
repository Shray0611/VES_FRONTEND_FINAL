import React from "react";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light text-[#2d3748] text-center mb-8">
            About VESIT E-Certification
          </h1>

          <div className="space-y-10">
            <Section title="Our Mission">
              Providing seamless digital certification solutions with security
              and transparency at our core.
            </Section>

            <Section title="Our Vision">
              Leading the future of trusted digital credentials in global
              education and employment.
            </Section>

            <Section
              title="Why Choose Us?"
              list={[
                "Blockchain-secured certificates",
                "Instant global verification",
                "Intuitive platform design",
                "Real-time tracking",
                "Global network integration",
              ]}
            />

            <Section title="Our Values">
              Commitment to innovation, integrity, and inclusive user-centered
              development.
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ title, children, list }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#edf2f7]">
    <h2 className="text-2xl font-normal text-[#2d3748] mb-4">{title}</h2>
    {list ? (
      <ul className="list-disc pl-6 space-y-3 text-[#4a5568]">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-[#4a5568] leading-relaxed">{children}</p>
    )}
  </div>
);

export default AboutUs;
