// src/pages/ProjectDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) {
        console.error('Project ID is undefined');
        return;
      }

      const docRef = doc(db, 'passengerDetails', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) return <div>Loading...</div>;

  const handleNextImage = () => {
    if (currentImageIndex < project.imageUrls.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
      {/* Background Gradient Animation */}
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

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">{project.title}</h1>
        
        {/* Main Image Display */}
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={handlePreviousImage}
            className={`p-2 ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentImageIndex === 0}
          >
            <FaArrowLeft className="text-white" />
          </button>
          <motion.img
            src={project.imageUrls[currentImageIndex]}
            alt={project.title}
            className="w-full h-60 object-cover rounded-md shadow-lg mx-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <button
            onClick={handleNextImage}
            className={`p-2 ${currentImageIndex === project.imageUrls.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentImageIndex === project.imageUrls.length - 1}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>

        {/* Image Gallery Preview */}
        <div className="flex overflow-x-auto space-x-2 mb-6">
          {project.imageUrls.map((url: string, index: number) => (
            <motion.img
              key={index}
              src={url}
              alt={project.title}
              className={`h-20 object-cover rounded-md cursor-pointer ${index === currentImageIndex ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <p className="text-gray-200 line-clamp-3">{project.projectDetails}</p>
        <Link to="/projects" className="mt-4 text-blue-500 underline">
          Back to Projects
        </Link>
      </div>

      {/* Gradient Animation */}
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

export default ProjectDetails;
