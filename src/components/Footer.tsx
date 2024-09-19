import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Michael F. Galos. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://github.com/yourusername" className="mx-2 hover:text-gray-400">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="mx-2 hover:text-gray-400">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/yourusername" className="mx-2 hover:text-gray-400">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
