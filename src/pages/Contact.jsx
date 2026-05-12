import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import usePageTitle from "@/hooks/usePageTitle";
import Button from "@/components/ui/custom/Button";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";

const Contact = () => {
  usePageTitle({ title: "Contact Us" });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <BlurFade delay={0.1}>
          <h1 className="relative z-10 text-5xl md:text-7xl font-playfair font-bold text-white text-center">
            Contact Us
          </h1>
        </BlurFade>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-2 text-sm font-Montserrat text-gray-500">
        <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
        <FaChevronRight className="size-2 text-gray-300" />
        <span className="text-secondary font-medium">Contact</span>
      </div>

      {/* Query Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <BlurFade delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-800 mb-6 max-w-2xl mx-auto leading-tight">
              If You Have Any Query, <br className="hidden md:block" /> Please Contact Us
            </h2>
            <div className="w-20 h-1 bg-[#8B4513] mx-auto rounded-full relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#8B4513] bg-white rotate-45" />
            </div>
          </BlurFade>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <BlurFade direction="left" delay={0.3}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#8B4513] font-Montserrat">
                Get an answer to your catering question
              </h3>
              <p className="text-gray-600 leading-relaxed font-Montserrat">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book. It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged. It was popularised 
                in the 1960s with the release of Letraset sheets containing.
              </p>
            </div>
          </BlurFade>
          <BlurFade direction="right" delay={0.4}>
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1974&auto=format&fit=crop" 
                alt="Chef" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10 group-hover:bg-secondary/20 transition-all" />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Floating Form & Contact Section */}
      <section className="relative mt-20 pb-32">
        {/* Wavy Background Transition */}
        <div className="absolute top-0 left-0 w-full h-[100%] bg-[#FFF9F2] -z-10 overflow-hidden">
          <svg 
            className="absolute top-0 left-0 w-full h-24 text-white fill-current" 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none"
          >
            <path d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form Card */}
          <BlurFade direction="up" delay={0.5}>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-orange-100">
              <h4 className="text-2xl font-bold text-gray-800 mb-8 font-Montserrat">Leave your message</h4>
              <form className="space-y-6">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-xl bg-orange-50/30 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-Montserrat"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 rounded-xl bg-orange-50/30 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-Montserrat"
                />
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full px-6 py-4 rounded-xl bg-orange-50/30 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-Montserrat"
                />
                <select className="w-full px-6 py-4 rounded-xl bg-orange-50/30 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-Montserrat appearance-none text-gray-500">
                  <option value="">Requested Services</option>
                  <option value="catering">Catering</option>
                  <option value="delivery">Fast Delivery</option>
                  <option value="event">Event Planning</option>
                </select>
                <textarea 
                  rows="5" 
                  placeholder="Message"
                  className="w-full px-6 py-4 rounded-xl bg-orange-50/30 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-Montserrat resize-none"
                ></textarea>
                <Button 
                  className="w-full py-5 text-lg font-bold !bg-[#3D0C02] hover:!bg-[#5D1C02] text-white rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </BlurFade>

          {/* Contact Details */}
          <div className="lg:pt-8">
            <BlurFade delay={0.6}>
              <h4 className="text-4xl font-bold text-gray-800 mb-12 font-Montserrat">Contact</h4>
              <div className="space-y-12">
                {/* Office */}
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300 shadow-sm">
                    <FaMapMarkerAlt className="size-6" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-gray-800 font-Montserrat mb-1">Office</h5>
                    <p className="text-gray-500 font-Montserrat leading-relaxed">
                      No 2 Airport gate, Old Gurudwara, <br />
                      Dum Dum, Kolkata, West Bengal 700081
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300 shadow-sm">
                    <FaPhone className="size-6" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-gray-800 font-Montserrat mb-1">Phone</h5>
                    <p className="text-gray-500 font-Montserrat leading-relaxed">
                      +912 345 67890 <br />
                      +91-8697738666
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300 shadow-sm">
                    <FaEnvelope className="size-6" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-gray-800 font-Montserrat mb-1">Email</h5>
                    <p className="text-gray-500 font-Montserrat leading-relaxed">
                      info@example.com <br />
                      support@example.com
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-gray-100 relative grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          title="Google Map"
          className="w-full h-full border-none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14729.704285141042!2d88.42318045!3d22.6378901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0274530f9a5677%3A0x643c162621c326d9!2sDum%20Dum%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715484000000!5m2!1sen!2sin"
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
