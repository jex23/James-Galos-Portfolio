import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Adjusted import
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icons for showing/hiding password
import { motion } from 'framer-motion';
import styled from 'styled-components';
import '../components/login.css'; // Import your CSS file

// Define the geometric shapes animation
const GeometricAnimation = styled(motion.div)`
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
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/uploadDetails');
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 relative overflow-hidden">
      <GeometricAnimation />
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-lg p-10 max-w-md w-full transform transition duration-500 hover:scale-105 relative z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            />
          </div>
          <div className="mb-8 flex items-center relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition duration-300"
            >
              {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-blue-300 hover:text-blue-400 transition duration-300">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
