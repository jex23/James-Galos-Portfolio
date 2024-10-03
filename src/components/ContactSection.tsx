import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaRegEnvelope, FaFacebook } from 'react-icons/fa';

const ContactSection: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const openEmailClient = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    const email = 'galosfraynajames@gmail.com';
    
    // Prepare email URLs for different clients
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const yahooUrl = `https://compose.mail.yahoo.com/?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Attempt to open Gmail first
    const win = window.open(gmailUrl, '_blank');
    
    // If Gmail fails, fallback to Outlook or Yahoo
    if (win === null || typeof win.closed === 'undefined') {
      const fallbackWin = window.open(outlookUrl, '_blank') || window.open(yahooUrl, '_blank');
      if (fallbackWin === null || typeof fallbackWin.closed === 'undefined') {
        alert('Unable to open an email client.');
      }
    }

    // Clear inputs after attempting to open the email client
    setSubject('');
    setBody('');
  };

  return (
    <section
      id="contact"
      className="h-screen flex items-center justify-center text-center relative overflow-hidden"
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
        <motion.h2
          initial={{ x: -100, opacity: 0 }} // Start from left
          animate={{ x: 0, opacity: 1 }} // Animate to original position
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Contact Me
        </motion.h2>
        <motion.p
          initial={{ x: -100, opacity: 0 }} // Start from left
          animate={{ x: 0, opacity: 1 }} // Animate to original position
          transition={{ duration: 1 }}
          className="text-lg text-gray-200"
        >
          Feel free to reach out to me via email or through social media.
        </motion.p>
        
        <form onSubmit={openEmailClient} className="w-full max-w-md mt-6">
          <div className="mb-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Your Message"
              required
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Send Message
          </button>
        </form>

        <div className="mt-4 flex justify-center space-x-4">
          <motion.a
            href="https://github.com/jex23"
            className="hover:text-gray-600"
            initial={{ x: -100, opacity: 0 }} // Start from left
            animate={{ x: 0, opacity: 1 }} // Animate to original position
            transition={{ duration: 1 }}
          >
            <FaGithub size={30} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/james-galos-608826215/"
            className="hover:text-gray-600"
            initial={{ x: -100, opacity: 0 }} // Start from left
            animate={{ x: 0, opacity: 1 }} // Animate to original position
            transition={{ duration: 1 }}
          >
            <FaLinkedin size={30} />
          </motion.a>
          <motion.a
            href="https://www.facebook.com/james.galos.rm.146/"
            className="hover:text-gray-600"
            initial={{ x: -100, opacity: 0 }} // Start from left
            animate={{ x: 0, opacity: 1 }} // Animate to original position
            transition={{ duration: 1 }}
          >
            <FaFacebook size={30} />
          </motion.a>
          <motion.button
            onClick={openEmailClient}
            className="hover:text-gray-600"
            initial={{ x: -100, opacity: 0 }} // Start from left
            animate={{ x: 0, opacity: 1 }} // Animate to original position
            transition={{ duration: 1 }}
          >
            <FaEnvelope size={30} />
          </motion.button>
        </div>
      </div>

      {/* CSS Grid for layout */}
      <div className="relative z-10 w-full lg:w-1/2 grid grid-cols-1 px-16"> {/* Increased padding on the right */}
        {/* Map Section */}
        <div className="bg-white shadow-lg rounded-lg w-full h-80"> {/* Height changed to h-80 */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.4875390489797!2d121.0464373!3d14.5679334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c955cea11a37%3A0x19970f0cef23f36c!2sH28X%2BMQ9%2C%20215%20Guijo%2C%20Taguig%2C%20Kalakhang%20Maynila%2C%20Philippines!5e0!3m2!1sen!2sin!4v1694719741981!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Map"
          />
        </div>

        {/* Contact Information */}
        <div className="text-gray-200 mt-4 p-4">
          <motion.p
            className="flex items-center mt-2"
            initial={{ x: 100, opacity: 0 }} // Start from right
            animate={{ x: 0, opacity: 1 }} // Animate to original position
            transition={{ duration: 1 }}
          >
            <FaMapMarkerAlt className="mr-2" size={20} />
            <span>Address: 215B, Guijo St., Cembo, Makati</span>
          </motion.p>
          <motion.p
            className="flex items-center mt-2"
            initial={{ x: 100, opacity: 0 }} // Start from right
            animate={{ x: 0, opacity: 1 }} // Animate to original position
            transition={{ duration: 1 }}
          >
            <FaRegEnvelope className="mr-2" size={20} />
            <span>Email: galosfraynajames@gmail.com</span>
          </motion.p>
          <motion.p
            className="flex items-center mt-2"
            initial={{ x: 100, opacity: 0 }} // Start from right
            animate={{ x: 0, opacity: 1 }} // Animate to original position
            transition={{ duration: 1 }}
          >
            <FaPhone className="mr-2" size={20} />
            <span>Phone: 09661939205</span>
          </motion.p>
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

export default ContactSection;
