import React from "react";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative bg-gray-900 min-h-screen">
      <Parallax
        bgImage="https://images.unsplash.com/photo-1542744094-6f2f5fd98f5d?ixid=MXwyMTg5MzA2NzI0MTI4MDExNjA&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60"
        strength={500}
        className="h-full"
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-red-500 opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 px-4 min-h-screen pt-20 md:pl-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Me
          </motion.h2>

          {/* Grid Layout for Image/Contact Details and Summary/Education */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Image and Contact Details */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:col-span-1">
              <motion.img
                src="https://i.ibb.co/0BpdJws/2x2.png" // Replace with your image URL
                alt="James F. Galos"
                className="rounded-full border-4 border-gray-800 shadow-lg w-32 h-32 md:w-40 md:h-40"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="mt-4 text-white">
                <h3 className="text-xl font-bold mb-2">Contact Details</h3>
                <ul className="list-none space-y-1 text-left">
                  <li>
                    <strong>Age:</strong> 22
                  </li>
                  <li>
                    <strong>Birthday:</strong> July 23, 2001
                  </li>
                  <li>
                    <strong>Address:</strong> 215B, Guijo St., Cembo, Makati
                  </li>
                  <li>
                    <strong>Email:</strong> jamesgalos223@gmail.com
                  </li>
                  <li>
                    <strong>Mobile Number:</strong> +639510074856
                  </li>
                  <li>
                    <strong>LinkedIn:</strong>{" "}
                    <a
                      href="https://www.linkedin.com/in/james-galos-608826215/"
                      className="text-blue-400 hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn Profile
                    </a>
                  </li>
                  <li>
                    <strong>Github:</strong>{" "}
                    <a
                      href="https://github.com/jex23"
                      className="text-blue-400 hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github Profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Summary and Education */}
            <div className="md:col-span-3 text-lg text-white">
              {/* Summary */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">About Me</h3>
                <p className="mb-2">
                  Hi, I’m James F. Galos, a passionate software developer
                  experienced in Flutter, Firebase, and React. I thrive on
                  solving complex problems and delivering user-centric
                  solutions.
                </p>
                <p>
                  My journey in software development started with a fascination
                  for technology and has evolved into a career focused on
                  building impactful web and mobile applications. I am committed
                  to continuous learning and improvement in the ever-evolving
                  tech landscape. When I'm not coding, you can find me exploring
                  new technologies, contributing to open-source projects, or
                  enjoying some downtime with a good book or game.
                </p>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold mb-2">Education</h3>
                <div className="flex space-x-4">
                  <h4 className="text-xl font-semibold">
                    NRG INFO-TECH Institute Inc.
                  </h4>
                  <h1 className="text-xl font-semibold">JAVA NC3 (TESDA)</h1>
                 
                </div>
                <h4 className="text-xl font-semibold">August to October</h4>
                <div className="mt-2">
                  <p>
                    Gained proficiency in Object-Oriented Programming (OOP)
                    concepts such as classes, inheritance, polymorphism, and
                    encapsulation.
                  </p>
                  <p>
                    Explored Java frameworks, including Spring Boot, to build
                    efficient and scalable applications.
                  </p>
                  <p>
                    Developed skills in MySQL database management, including
                    designing, implementing, and integrating MySQL with Java
                    applications for dynamic data handling.
                  </p>
                </div>
                <div className="mt-4">
                  <h4 className="text-xl font-semibold">
                    Bachelor of Science in Computer Engineering
                  </h4>
                  <p>Bicol University</p>
                  <p>Cum Laude</p>
                  <p>
                    Best Thesis: “Real-time 'Balut' Smart Incubator Egg
                    Assessment using Convolutional Neural Network”
                  </p>
                  <p>Aug 2020 - July 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default AboutSection;
