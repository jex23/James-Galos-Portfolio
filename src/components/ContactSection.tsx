import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="h-screen bg-gray-300 flex items-center justify-center text-center">
      <div>
        <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
        <p className="text-lg">
          Feel free to reach out to me via email or through social media. [Contact details]
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
