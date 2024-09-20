import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaChartBar, FaDatabase, FaMobileAlt, FaTools } from 'react-icons/fa';
import styled from 'styled-components';

// Geometric Background for Skills Section
const SkillsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ff4d4d, #9c27b0, #4d79ff);
  background-size: 200% 200%;
  animation: gradientMove 10s ease infinite;

  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative bg-gray-800 text-white py-20 px-6">
      {/* Background Animation */}
      <SkillsBackground />

      <motion.div 
        className="container mx-auto z-10 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold text-center mb-12 text-purple-300">
          Skills
        </h3>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Programming */}
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg flex-1 min-w-[200px] border border-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-xl font-semibold mb-4 flex items-center text-blue-300">
              <FaPython className="mr-2" /> Programming
            </h4>
            <ul className="list-disc pl-5 text-gray-400">
              <li>Python</li>
              <li>JavaScript</li>
              <li>C#</li>
              <li>Java</li>
              <li>C++</li>
              <li>PHP</li>
            </ul>
          </motion.div>

          {/* Machine Learning & Computer Vision */}
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg flex-1 min-w-[200px] border border-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-xl font-semibold mb-4 flex items-center text-red-300">
              <FaChartBar className="mr-2" /> Machine Learning & Computer Vision
            </h4>
            <ul className="list-disc pl-5 text-gray-400">
              <li>Scikit-Learn</li>
              <li>TensorFlow</li>
              <li>Keras</li>
              <li>PyTorch</li>
              <li>OpenCV</li>
              <li>YOLO</li>
            </ul>
          </motion.div>

          {/* Databases */}
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg flex-1 min-w-[200px] border border-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-xl font-semibold mb-4 flex items-center text-yellow-300">
              <FaDatabase className="mr-2" /> Databases
            </h4>
            <ul className="list-disc pl-5 text-gray-400">
              <li>PostgreSQL</li>
              <li>MySQL</li>
              <li>SQLite</li>
              <li>Firebase</li>
            </ul>
          </motion.div>

          {/* Mobile */}
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg flex-1 min-w-[200px] border border-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-xl font-semibold mb-4 flex items-center text-green-300">
              <FaMobileAlt className="mr-2" /> Mobile
            </h4>
            <ul className="list-disc pl-5 text-gray-400">
              <li>Flutter</li>
              <li>Android</li>
            </ul>
          </motion.div>

          {/* Tools & Methodologies */}
          <motion.div
            className="bg-gray-900 p-6 rounded-lg shadow-lg flex-1 min-w-[200px] border border-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-xl font-semibold mb-4 flex items-center text-purple-300">
              <FaTools className="mr-2" /> Tools & Methodologies
            </h4>
            <ul className="list-disc pl-5 text-gray-400">
              <li>Git</li>
              <li>AWS</li>
              <li>Linux</li>
              <li>RESTful APIs</li>
              <li>GraphQL</li>
              <li>Agile</li>
              <li>Scrum</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
