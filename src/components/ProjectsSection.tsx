import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const projectsPerPage = 6; // Show 6 cards per page

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'passengerDetails'));
      const fetchedProjects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

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

  const handlePageClick = (index: number) => {
    setCurrentStartIndex(index * projectsPerPage);
  };

  const displayedProjects = projects.slice(
    currentStartIndex,
    currentStartIndex + projectsPerPage
  );

  return (
    <section
      id="projects"
      className="flex items-center justify-center text-center relative overflow-hidden min-h-screen"
    >
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

        {/* Pagination Circles */}
        <div className="flex justify-center mb-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                currentStartIndex / projectsPerPage === index
                  ? 'bg-white'
                  : 'bg-gray-400'
              }`}
            />
          ))}
        </div>

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

          <div className="w-full mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <motion.div
                  className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg h-80 flex flex-col"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.imageUrls && project.imageUrls.length > 0 && (
                    <div
                      className="w-full mb-4 flex justify-center items-center"
                      style={{ height: '150px' }}
                    >
                      <img
                        src={project.imageUrls[0]}
                        alt={project.title}
                        className="max-w-full max-h-full object-contain rounded-md"
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>

                  {/* Display project details with limited height and ellipsis */}
                  <p className="text-gray-200 overflow-hidden overflow-ellipsis line-clamp-2">
                    {project.projectDetails}
                  </p>
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

        /* Added styles for line clamping */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* Number of lines to show */
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
