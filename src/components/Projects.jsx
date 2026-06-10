import React, { useState, useRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { projects } from '../data/portofolioData';

const ProjectCard = ({ project, index, isDarkMode }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const openLink = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  const year = project.date
    ? (() => {
        const d = new Date(project.date);
        return isNaN(d.getTime()) ? '2025' : d.getFullYear().toString();
      })()
    : '2025';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative h-full"
    >
      <motion.div
        style={{ rotateX: springRotateX, rotateY: springRotateY, height: '100%' }}
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={openLink}
        className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-shadow duration-300 flex flex-col ${
          isDarkMode
            ? 'bg-[#1a1a1a] border border-zinc-800 shadow-lg hover:shadow-zinc-900/60 hover:shadow-2xl'
            : 'bg-white border border-zinc-200 shadow-md hover:shadow-zinc-300/60 hover:shadow-2xl'
        }`}
      >
        <div className="relative overflow-hidden aspect-video bg-zinc-800 flex-shrink-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              hovered ? 'opacity-20' : 'opacity-0'
            } bg-gradient-to-t from-black`}
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className={`text-sm font-semibold leading-snug mb-auto pb-3 line-clamp-2 min-h-[2.5rem] ${
            isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
          }`}>
            {project.title}
          </h3>

          <div className="flex items-center justify-between mt-auto">
            <span
              className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
              }`}
            >
              Website
            </span>
            <span className={`text-[11px] font-light tabular-nums ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {year}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute bottom-3 right-3"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-white text-black' : 'bg-zinc-900 text-white'
            }`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/12377/12377927.png"
              alt="open"
              className={`w-3 h-3 ${isDarkMode ? 'brightness-0' : 'brightness-0 invert'}`}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Projects = ({ isDarkMode }) => {
  const [monitorHovered, setMonitorHovered] = useState(false);
  const recentProjects = projects.slice(0, 4);

  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  return (
    <section
      id="projects"
      className={`relative py-10 px-6 scroll-mt-8 overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0a0a0a]' : 'bg-zinc-50'
      }`}
    >
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-40'}`}>
        {stars.map((star, index) => (
          <div
            key={index}
            className={`absolute rounded-full ${isDarkMode ? 'bg-white' : 'bg-zinc-400'}`}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={monitorHovered ? { rotate: -12, scale: 1.12 } : { rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              onMouseEnter={() => setMonitorHovered(true)}
              onMouseLeave={() => setMonitorHovered(false)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </motion.div>
            <h2 className={`text-2xl md:text-3xl font-light tracking-tight ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
              Recent <span className={`font-serif italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Project</span>
            </h2>
          </div>

          <motion.a
            href="/projects"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-1.5 group transition-colors ${
              isDarkMode
                ? 'text-zinc-400 hover:text-zinc-100'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            See All
            <img
              src="https://cdn-icons-png.flaticon.com/128/12377/12377927.png"
              alt="arrow"
              className={`w-3 h-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'brightness-0 invert opacity-60 group-hover:opacity-100'
                  : 'brightness-0 opacity-60 group-hover:opacity-100'
              }`}
            />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {recentProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;