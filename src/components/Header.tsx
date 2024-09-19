import React from 'react';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
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

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <motion.a 
            href="#home" 
            className="flex items-center text-white hover:text-gray-300 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaHome className="text-xl mr-2" /> Home
          </motion.a>
          <motion.a 
            href="#about" 
            className="flex items-center text-white hover:text-gray-300 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaUser className="text-xl mr-2" /> About
          </motion.a>
          <motion.a 
            href="#projects" 
            className="flex items-center text-white hover:text-gray-300 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <FaProjectDiagram className="text-xl mr-2" /> Projects
          </motion.a>
          <motion.a 
            href="#contact" 
            className="flex items-center text-white hover:text-gray-300 transition-colors duration-300"
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
