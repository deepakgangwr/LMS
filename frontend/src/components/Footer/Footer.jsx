import React from "react";
import { Link } from "react-router-dom";
import { School, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { path: "/", display: "Home" },
    { path: "/courses", display: "Courses" },
    { path: "/my-learning", display: "My Learning" },
  ];

  const resourceLinks = [
    { path: "/login", display: "Login" },
    { path: "/profile", display: "Profile" },
    { path: "/search", display: "Search Courses" },
  ];

  const supportLinks = [
    { path: "/faq", display: "FAQ" },
    { path: "/contact", display: "Contact Us" },
    { path: "/privacy-policy", display: "Privacy Policy" },
  ];

  return (
    <footer className="bg-background border-t border-border relative">
      {/* Wave Top Divider */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <School className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">StudySphere</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering learners worldwide with high-quality online courses and expert instruction.
            </p>
            <div className="flex space-x-5 pt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/deepak_gangwr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-foreground font-semibold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-indigo-600 to-violet-500"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-foreground font-semibold text-lg mb-6 relative inline-block">
              Resources
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-indigo-600 to-violet-500"></span>
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-foreground font-semibold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-indigo-600 to-violet-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-muted-foreground text-sm">123 Education Street, Learning City, 12345</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-muted-foreground text-sm">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-muted-foreground text-sm">support@studysphere.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 border-t border-border pt-8 pb-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground text-sm">
          <p>© {year} StudySphere. All rights reserved. Made with <Heart className="inline-block h-4 w-4 text-red-500 mx-1" /> by StudySphere Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
