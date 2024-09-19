import React from 'react';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="h-screen bg-gray-200 flex items-center justify-center text-center">
      <div>
        <h2 className="text-4xl font-bold mb-4">My Projects</h2>
        <p className="text-lg">
          Here are some of the projects I've worked on. [Project details]
        </p>
      </div>
    </section>
  );
};

export default ProjectsSection;
