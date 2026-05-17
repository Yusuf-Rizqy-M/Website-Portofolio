import React from 'react';
import { projects } from '../data/portofolioData'; 
import { ExternalLink } from 'lucide-react'; 

const Projects = ({ glassStyle, textSub }) => {
  return (
    <section id="projects" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">Featured Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`rounded-2xl border p-5 transition-all hover:scale-[1.02] ${glassStyle}`}
          >
            <div className="overflow-hidden rounded-xl mb-4 aspect-video bg-gray-800">
               <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className={`text-sm mb-4 line-clamp-3 ${textSub}`}>{project.desc}</p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 text-[10px] rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {t}
                </span>
              ))}
            </div>

            {/* Tombol Link */}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-500 hover:underline">
                View Project <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;