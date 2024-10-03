import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  const openEmailClient = () => {
    const email = 'galosfraynajames@gmail.com';
    
    // Try opening Gmail, then fallback to Outlook or Yahoo
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}`;
    const yahooUrl = `https://compose.mail.yahoo.com/?to=${email}`;
    
    const win = window.open(gmailUrl, '_blank');
    
    if (win === null || typeof win.closed === 'undefined') {
      const fallbackWin = window.open(outlookUrl, '_blank') || window.open(yahooUrl, '_blank');
      if (fallbackWin === null || typeof fallbackWin.closed === 'undefined') {
        alert('Unable to open an email client.');
      }
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-2"> {/* Reduced height with py-2 */}
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} James F. Galos. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4"> {/* Flexbox for centering */}
          <a href="https://github.com/jex23" className="hover:text-gray-400">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/james-galos-608826215/" className="hover:text-gray-400">
            <FaLinkedin />
          </a>
          <button onClick={openEmailClient} className="hover:text-gray-400">
            <FaEnvelope />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
