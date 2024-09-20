import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection'; // Correct import
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection /> {/* Correct usage */}
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
