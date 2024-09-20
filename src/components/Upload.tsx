import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GradientBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
`;

const UploadContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

const Upload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectImages, setCurrentProjectImages] = useState<string[]>([]);
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newPreviews = fileArray.map(file => URL.createObjectURL(file));

      setSelectedFiles(prevFiles => [...prevFiles, ...fileArray]);
      setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload');
      return;
    }
  
    if (!title.trim() || !projectDetails.trim()) {
      alert('Title and project details cannot be empty');
      return;
    }
  
    const promises = selectedFiles.map(async (file) => {
      const storageRef = ref(storage, `projects/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    });
  
    try {
      const downloadURLs = await Promise.all(promises);
  
      await addDoc(collection(db, 'passengerDetails'), {
        imageUrls: downloadURLs,
        title: title,
        projectDetails: projectDetails,
      });
  
      alert('Files uploaded successfully!');
      setTitle('');
      setProjectDetails('');
      setSelectedFiles([]);
      setPreviews([]);
  
      fetchProjects();
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('An error occurred while uploading the files.');
    }
  };
  
  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'passengerDetails'));
    const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(fetchedProjects);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'passengerDetails', id));
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('An error occurred while deleting the project.');
    }
  };

  const openModal = (images: string[], index: number) => {
    setCurrentProjectImages(images);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentProjectImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + currentProjectImages.length) % currentProjectImages.length);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6">
      <GradientBackground />
      <UploadContainer className="relative z-10 mb-10">
        <h2 className="text-2xl font-bold mb-4">Upload Project</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <textarea
          placeholder="Project Details"
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-4"
          accept="image/*,video/*"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-25 h-25 object-cover rounded cursor-pointer"
                onClick={() => openModal(previews, index)}
              />
              <button
                onClick={() => {
                  const newPreviews = previews.filter((_, i) => i !== index);
                  const newFiles = selectedFiles.filter((_, i) => i !== index);
                  setPreviews(newPreviews);
                  setSelectedFiles(newFiles);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')} // Navigate back to the home page
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </UploadContainer>

      {/* Project Cards Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg flex flex-col cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => openModal(project.imageUrls, 0)}
          >
            {project.imageUrls.length > 0 && (
              <img
                src={project.imageUrls[0]}
                alt={project.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-gray-200 mb-4">{project.projectDetails}</p>
            <button
              onClick={() => handleDelete(project.id)}
              className="mt-auto bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>

      {/* Full Preview Modal */}
      {modalOpen && (
        <Modal>
          <ModalContent className="flex">
            <img
              src={currentProjectImages[currentImageIndex]}
              alt={`Full preview ${currentImageIndex + 1}`}
              className="max-w-full max-h-full"
            />
            <button
              onClick={previousImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1"
            >
              &lt;
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1"
            >
              &gt;
            </button>
            <button
              onClick={closeModal}
              className="absolute top-1 right-2 bg-red-500 text-white rounded-full p-1"
            >
              ✖
            </button>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Upload;
