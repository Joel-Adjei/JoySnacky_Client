import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import usePageTitle from "@/hooks/usePageTitle";
import Button from "@/components/ui/custom/Button";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  usePageTitle({ title: "Contact Us" });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <BlurFade delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-Montserrat text-primary mb-4">
              Get in <span className="text-secondary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question about our snacks or want to place a bulk order? 
              We're here to help. Reach out to the Joy Snacky team!
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <BlurFade delay={0.2}>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-primary mb-8 font-Montserrat">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                      <FaPhone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Phone</p>
                      <p className="text-muted-foreground">+233 24 000 0000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 text-secondary">
                      <FaWhatsapp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">WhatsApp</p>
                      <p className="text-muted-foreground">+233 50 111 1111</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 text-accent">
                      <FaEnvelope className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Email</p>
                      <p className="text-muted-foreground">hello@joysnacky.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                      <FaMapMarkerAlt className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Location</p>
                      <p className="text-muted-foreground">University Campus, Student Union Building, Ground Floor</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-lg font-bold text-primary mb-4 font-Montserrat">Business Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium text-primary">8:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium text-primary">10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-primary">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Contact Form */}
          <BlurFade delay={0.3}>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-primary mb-8 font-Montserrat">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Inquiry about catering"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <textarea 
                    rows="5" 
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none"
                  ></textarea>
                </div>

                <Button 
                  className="w-full py-4 text-lg font-bold"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default Contact;
