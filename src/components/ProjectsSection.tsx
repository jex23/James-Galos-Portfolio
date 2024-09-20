// ProjectsSection.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(4);

  const updateProjectsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setProjectsPerPage(2);
    } else if (width >= 640 && width < 1024) {
      setProjectsPerPage(4);
    } else {
      setProjectsPerPage(8);
    }
  };

  useEffect(() => {
    updateProjectsPerPage();
    window.addEventListener('resize', updateProjectsPerPage);
    return () => window.removeEventListener('resize', updateProjectsPerPage);
  }, []);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'passengerDetails'));
    const fetchedProjects = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProjects(fetchedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleNext = () => {
    if (currentStartIndex + projectsPerPage < projects.length) {
      setCurrentStartIndex((prevIndex) => prevIndex + projectsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentStartIndex - projectsPerPage >= 0) {
      setCurrentStartIndex((prevIndex) => prevIndex - projectsPerPage);
    }
  };

  const displayedProjects = projects.slice(currentStartIndex, currentStartIndex + projectsPerPage);

  return (
    <section id="projects" className="h-screen flex items-center justify-center text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-red-500 via-purple-600 to-blue-500"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradientAnimation 15s ease infinite',
        }}
      />

      <div className="relative z-10 pt-20 pb-5 w-full flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-white mb-8">My Projects</h2>

        <div className="w-full flex items-center justify-center">
          {currentStartIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="bg-white rounded-full p-3 shadow hover:bg-gray-200"
              style={{ width: '50px', height: '50px' }}
            >
              <FaArrowLeft className="text-gray-800 text-xl" />
            </button>
          )}

          <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {displayedProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <motion.div
                  className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.imageUrls && project.imageUrls.length > 0 && (
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                  )}

                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>

                  <p className="text-gray-200 line-clamp-3">{project.projectDetails}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          {currentStartIndex + projectsPerPage < projects.length && (
            <button
              onClick={handleNext}
              className="bg-white rounded-full p-3 shadow hover:bg-gray-200"
              style={{ width: '50px', height: '50px' }}
            >
              <FaArrowRight className="text-gray-800 text-xl" />
            </button>
          )}
        </div>
      </div>

      <style>{`
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
      `}</style>
    </section>
  );
};

export default ProjectsSection;
