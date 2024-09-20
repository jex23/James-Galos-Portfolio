import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(handleScroll, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-600 to-red-500 text-white py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center px-6">
        {/* Logo with animation */}
        <motion.div
          className="text-2xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          James Galos
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {isMobileMenuOpen ? '✖' : '☰'} {/* Toggle icon */}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex flex-col md:flex-row md:space-x-8 absolute md:relative transition-all duration-300 ${
            isMobileMenuOpen ? 'top-16' : 'top-[-200px] md:top-0'
          } md:top-0 ${isMobileMenuOpen && window.innerWidth < 768 ? 'bg-gradient-to-r from-blue-500 to-red-500' : 'bg-transparent'}`}
        >
          <motion.a 
            href="#home" 
            className={`flex items-center transition-colors duration-300 ${activeSection === 'home' ? 'text-gray-300' : 'text-white'}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaHome className="text-xl mr-2" /> Home
          </motion.a>
          <motion.a 
            href="#about" 
            className={`flex items-center transition-colors duration-300 ${activeSection === 'about' ? 'text-gray-300' : 'text-white'}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaUser className="text-xl mr-2" /> About
          </motion.a>
          <motion.a 
            href="#skills" 
            className={`flex items-center transition-colors duration-300 ${activeSection === 'skills' ? 'text-gray-300' : 'text-white'}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaTools className="text-xl mr-2" /> Skills
          </motion.a>
          <motion.a 
            href="#projects" 
            className={`flex items-center transition-colors duration-300 ${activeSection === 'projects' ? 'text-gray-300' : 'text-white'}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaProjectDiagram className="text-xl mr-2" /> Projects
          </motion.a>
          <motion.a 
            href="#contact" 
            className={`flex items-center transition-colors duration-300 ${activeSection === 'contact' ? 'text-gray-300' : 'text-white'}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaEnvelope className="text-xl mr-2" /> Contact
          </motion.a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
