import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaHome, FaTimes } from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  projectDetails: string;
  imageUrls: string[];
}

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) {
        setError("Project ID is undefined");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "passengerDetails", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Omit<Project, "id">;
          setProject({ id: docSnap.id, ...data });
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError("Error fetching project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!project) return <div>No project data available</div>;

  if (!Array.isArray(project.imageUrls) || project.imageUrls.length === 0) {
    return <div>No images available</div>;
  }

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

  const openFullScreen = () => setIsFullScreen(true);
  const closeFullScreen = () => setIsFullScreen(false);

  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-red-500 via-purple-600 to-blue-500"
        style={{
          backgroundSize: "400% 400%",
          animation: "gradientAnimation 15s ease infinite",
        }}
      />

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <Link
          to="/"
          className="flex items-center text-white underline p-2 hover:bg-gray-700 rounded mb-6"
        >
          <FaHome className="mr-2" />
          Back to Homepage
        </Link>

        {/* Title Section */}
        <h1
          className="text-4xl font-bold text-white mb-6 cursor-pointer"
          onClick={openFullScreen} // Trigger full-screen on title click
        >
          {project.title}
        </h1>

        {/* Main Image Display */}
        <div className="flex items-center justify-center mb-6 relative">
          <button
            onClick={handlePreviousImage}
            aria-label="Previous Image"
            className={`p-2 ${
              currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentImageIndex === 0}
          >
            <FaArrowLeft className="text-white" />
          </button>
          <motion.img
            src={project.imageUrls[currentImageIndex]}
            alt={project.title}
            className="max-w-full h-[50vh] object-cover rounded-md shadow-lg mx-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={openFullScreen} // Open full-screen on main image click
          />
          <button
            onClick={handleNextImage}
            aria-label="Next Image"
            className={`p-2 ${
              currentImageIndex === project.imageUrls.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentImageIndex === project.imageUrls.length - 1}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>

        {/* Image Gallery Preview */}
        <div className="flex overflow-x-auto space-x-2 mb-6">
          {project.imageUrls.map((url, index) => (
            <motion.img
              key={index}
              src={url}
              alt={project.title}
              className={`h-20 w-32 object-cover rounded-md cursor-pointer ${
                index === currentImageIndex ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => {
                setCurrentImageIndex(index);
                openFullScreen(); // Open full-screen on gallery image click
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Project Description */}
        <p className="text-white">{project.projectDetails}</p>

        {/* Full-Screen Modal */}
        {isFullScreen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeFullScreen}
              aria-label="Close Full Screen"
            >
              <FaTimes />
            </button>

            {/* Navigation buttons in full-screen mode */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              onClick={handlePreviousImage}
              aria-label="Previous Image"
              disabled={currentImageIndex === 0}
            >
              <FaArrowLeft />
            </button>
            <motion.img
              src={project.imageUrls[currentImageIndex]}
              alt={project.title}
              className="max-w-full h-[70vh] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              onClick={handleNextImage}
              aria-label="Next Image"
              disabled={currentImageIndex === project.imageUrls.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
