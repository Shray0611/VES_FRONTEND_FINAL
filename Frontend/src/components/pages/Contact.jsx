import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from 'framer-motion';
import { Send, Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import Navbar from "../layout/Navbar";

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
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
            ease: 'easeOut',
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

const ContactCard = ({ icon: Icon, title, description, detail }) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-[#e0c9a9]/30 text-center"
      whileHover={{
        y: -5,
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <div className="bg-[#f8e5c5] w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
        <Icon className="text-[#5f4b32] w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-[#5f4b32] mb-2">{title}</h3>
      <p className="text-[#7d6954] text-sm mb-2">{description}</p>
      <p className="text-[#5f4b32] font-medium">{detail}</p>
    </motion.div>
  );
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", { name, email, subject, message });
    
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setIsSubmitting(false);
    
    // You could add a success notification here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9f3e8] to-[#f1d5a4]">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Header Section */}
        <FadeInSection>
          <div className="text-center">
            <br></br>
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold text-[#5f4b32] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-[#7d6954] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Have questions about our certificate platform? We're here to help you create 
              professional certificates with ease.
            </motion.p>
          </div>
        </FadeInSection>

        {/* Contact Info Cards */}
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <FadeInSection delay={0.1}>
              <ContactCard
                icon={Mail}
                title="Email Us"
                description="Send us your questions"
                detail="superadmin@ves.ac.in"
              />
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <ContactCard
                icon={Phone}
                title="Call Us"
                description="Speak with our team"
                detail="+91 98765 43210"
              />
            </FadeInSection>
            
            <FadeInSection delay={0.3}>
              <ContactCard
                icon={Clock}
                title="Office Hours"
                description="Monday to Friday"
                detail="9:00 AM - 6:00 PM IST"
              />
            </FadeInSection>
          </div>
        </FadeInSection>

        {/* Main Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <FadeInSection>
            <motion.div
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-10 border border-[#e0c9a9]/30"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#5f4b32] mb-3">
                  Send us a Message
                </h2>
                <p className="text-[#7d6954]">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-[#5f4b32] mb-2" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-4 rounded-xl border border-[#e0c9a9]/50 bg-white/70 backdrop-blur-sm
                               focus:border-[#e0c9a9] focus:ring-2 focus:ring-[#e0c9a9]/20 focus:bg-white/90
                               outline-none transition-all duration-300 text-[#5f4b32] placeholder-[#7d6954]/60"
                      placeholder="Enter your full name"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-[#5f4b32] mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 rounded-xl border border-[#e0c9a9]/50 bg-white/70 backdrop-blur-sm
                               focus:border-[#e0c9a9] focus:ring-2 focus:ring-[#e0c9a9]/20 focus:bg-white/90
                               outline-none transition-all duration-300 text-[#5f4b32] placeholder-[#7d6954]/60"
                      placeholder="Enter your email"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-[#5f4b32] mb-2" htmlFor="subject">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-4 rounded-xl border border-[#e0c9a9]/50 bg-white/70 backdrop-blur-sm
                             focus:border-[#e0c9a9] focus:ring-2 focus:ring-[#e0c9a9]/20 focus:bg-white/90
                             outline-none transition-all duration-300 text-[#5f4b32] placeholder-[#7d6954]/60"
                    placeholder="What's this about?"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-[#5f4b32] mb-2" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full p-4 rounded-xl border border-[#e0c9a9]/50 bg-white/70 backdrop-blur-sm
                             focus:border-[#e0c9a9] focus:ring-2 focus:ring-[#e0c9a9]/20 focus:bg-white/90
                             outline-none transition-all duration-300 text-[#5f4b32] placeholder-[#7d6954]/60 resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 
                             flex items-center justify-center gap-3 ${
                               isSubmitting 
                                 ? 'bg-[#7d6954]/50 text-white cursor-not-allowed' 
                                 : 'bg-[#e0c9a9] hover:bg-[#d4b88f] text-[#5f4b32]'
                             }`}
                    whileHover={!isSubmitting ? {
                      scale: 1.02,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </FadeInSection>

          {/* Additional Info Section */}
          <FadeInSection>
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Why Contact Us Card */}
              <motion.div
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-[#e0c9a9]/30"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#f8e5c5] w-10 h-10 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-[#5f4b32] w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#5f4b32]">Why Contact Us?</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    'Technical support for certificate generation',
                    'Questions about bulk processing features',
                    'Template customization assistance',
                    'Integration help and guidance',
                    'Feedback on our platform',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 text-[#7d6954]"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#e0c9a9] mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-[#e0c9a9]/30"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#f8e5c5] w-10 h-10 rounded-full flex items-center justify-center">
                    <MapPin className="text-[#5f4b32] w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#5f4b32]">Our Location</h3>
                </div>
                
                <div className="text-[#7d6954] leading-relaxed">
                  <p className="font-medium text-[#5f4b32] mb-2">VESIT Campus</p>
                  <p>Vivekanand Education Society's</p>
                  <p>Institute of Technology</p>
                  <p>Hashu Advani Memorial Complex,</p>
                  <p>Collector's Colony, Chembur,</p>
                  <p>Mumbai - 400074, Maharashtra, India</p>
                </div>
              </motion.div>
            </motion.div>
          </FadeInSection>
        </div>

        {/* FAQ Section */}
        <FadeInSection>
          <motion.div
            className="bg-gradient-to-r from-[#e0c9a9] to-[#d4b88f] rounded-3xl shadow-xl p-10 text-center"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#5f4b32] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#5f4b32]/80 text-lg mb-8 max-w-2xl mx-auto">
              Check out our comprehensive FAQ section for quick answers to common questions
            </p>
            <motion.button
              className="bg-[#5f4b32] text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 inline-flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              View FAQ
              <MessageCircle className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Contact;