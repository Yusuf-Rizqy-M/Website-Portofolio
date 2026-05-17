import React, { useState, useMemo } from "react";
import { motion, useMotionValue } from "framer-motion";
import { profile } from "../data/portofolioData";
import { Link } from 'react-router-dom';

const About = ({ isDarkMode }) => {
  const [isPaused, setIsPaused] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const MotionLink = motion(Link); 

  const allSkills = profile.skillCategories.flatMap(
    (category) => category.skills,
  );

  // Stars — sama seperti Hero & Education
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  const renderTextWithLinks = (text) => {
    const parts = text.split(/(@andhika)/g);
    return parts.map((part, index) => {
      if (part === "@andhika") {
        return (
          <a
            key={index}
            href="https://portfolio-andhikaeka.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold transition-colors duration-300 ${
              isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
            } underline underline-offset-4`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen px-6 py-20 overflow-hidden font-poppins transition-colors duration-500 group/section scroll-mt-28 ${
        isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-zinc-50 text-slate-900"
      }`}
    >
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .paused {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Stars background */}
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}
          >
            Who I Am
          </motion.h2>
          <MotionLink
            to="/blog"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2 group transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            What I Do
            <img
              src="https://cdn-icons-png.flaticon.com/128/12377/12377927.png"
              alt="arrow"
              className={`w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isDarkMode
                  ? "brightness-0 invert"
                  : "brightness-0 opacity-60 group-hover:opacity-100"
              }`}
            />
          </MotionLink>
        </div>

        <div className="max-w-5xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {profile.desc.split("\n\n").map((para, index) => (
              <p
                key={index}
                className={`text-[13px] md:text-[15px] leading-relaxed mb-8 font-medium ${index === 0 ? "text-opacity-100" : "opacity-60"}`}
              >
                {renderTextWithLinks(para)}
              </p>
            ))}
          </motion.div>
        </div>

        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-[10px] font-semibold tracking-[0.4em] uppercase mb-10 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}
          >
            My Skills
          </motion.h3>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {allSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all duration-300 backdrop-blur-md
                  ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/10 text-gray-300"
                      : "bg-slate-100/50 border-slate-200 hover:border-blue-400/50 hover:bg-white text-slate-700"
                  }`}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className={`w-4 h-4 object-contain transition-all duration-300 ${isDarkMode && !skill.icon.includes("devicon") && !skill.icon.includes("apachefriends") ? "brightness-0 invert" : ""}`}
                />
                <span className="text-[11px] md:text-[12px] font-bold tracking-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
        </div>
      </div>
    </section>
  );
};

export default About;