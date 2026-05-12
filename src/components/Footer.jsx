import { images } from "@/assets/assets";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1A0A05] text-gray-300 pt-20 pb-10 px-6 font-Montserrat relative overflow-hidden">
      {/* Decorative background pattern or glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-secondary mb-8 font-playfair tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {["Home", "About us", "Products"].map((link) => (
              <li
                key={link}
                className="flex items-center gap-2 group cursor-pointer transition-all hover:translate-x-2"
              >
                <FaFacebook className="size-2 text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                <span className="text-sm hover:text-white transition-colors">
                  {link}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-xl font-bold text-secondary mb-8 font-playfair tracking-wide">
            Get In Touch
          </h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
              <span className="text-sm">123 Street, New York, USA</span>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-secondary mt-1 flex-shrink-0" />
              <span className="text-sm">info@example.com</span>
            </div>
            <div className="flex items-start gap-4">
              <FaPhone className="text-secondary mt-1 flex-shrink-0" />
              <span className="text-sm">+012 345 67890</span>
            </div>
          </div>
          <div className="flex gap-2">
            {[FaTwitter, FaFacebook, FaLinkedin, FaInstagram].map(
              (Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 border border-secondary/30 rounded flex items-center justify-center hover:bg-secondary hover:text-[#1A0A05] transition-all cursor-pointer"
                >
                  <Icon className="size-4" />
                </div>
              ),
            )}
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <h3 className="text-xl font-bold text-secondary mb-8 font-playfair tracking-wide">
            Business Hours
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-white font-medium mb-1">Monday - Friday</p>
              <p className="text-gray-400">09:00 am - 07:00 pm</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Saturday</p>
              <p className="text-gray-400">09:00 am - 12:00 pm</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Sunday</p>
              <p className="text-gray-400">Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img
            src={images.logo}
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold text-white font-playfair tracking-tighter">
            Joy Snacky
          </span>
        </div>
        <p className="text-sm text-gray-500">
          © {year} Joy Snacky. All Rights Reserved. Designed by Antigravity
        </p>
        <button className="w-12 h-12 bg-secondary text-[#1A0A05] rounded flex items-center justify-center animate-bounce hover:animate-none">
          <ArrowRight className="size-6 -rotate-90" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
