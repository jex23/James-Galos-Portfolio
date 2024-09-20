import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Define the geometric shapes animation
const GeometricAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(135deg, #4d79ff, #ff4d4d);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    background: rgba(255, 255, 255, 0.2);
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
    animation: shapesAnimation 8s ease-in-out infinite;
  }

  @keyframes shapesAnimation {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
`;

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0 transition-opacity duration-500"></div>

      {/* Geometric Animation */}
      <GeometricAnimation />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Image with enhanced animation */}
        <motion.img
          src="https://i.ibb.co/0BpdJws/2x2.png" // Replace with your image URL
          alt="Profile Picture"
          className="rounded-full mb-6 w-40 h-40 object-cover mx-auto"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, ease: "easeInOut", type: "spring", stiffness: 300 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
        />

        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight transition-all duration-500">
          Hi, I'm James Galos
        </h1>
        <p className="text-lg md:text-xl mb-8 transition-all duration-500">
          Developer | Machine Learning Enthusiast | IoT Innovator
        </p>
        <p className="text-md md:text-lg mb-8 transition-all duration-500">
          Specializing in creating automation solutions and real-time data systems for smarter environments.
        </p>
        <div className="mb-6 flex justify-center space-x-4">
          <a 
            href="https://twitter.com/yourhandle" 
            className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
          >
            Twitter
          </a>
          <a 
            href="https://linkedin.com/in/james-galos-608826215/" 
            className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/jex23" 
            className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
          >
            GitHub
          </a>
        </div>
        <a
          href="#projects"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full text-lg font-semibold transition-colors duration-300"
        >
          View Projects
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
