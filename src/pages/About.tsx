import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto my-10 px-6">
        <h1 className="text-4xl font-bold mb-5">About Me</h1>
        <p className="text-lg leading-7">
          Hi, I’m James F. Galos, a passionate software developer with experience in Flutter, Firebase, and React.
          I love creating web and mobile applications, solving challenging problems, and continuously learning new things.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
