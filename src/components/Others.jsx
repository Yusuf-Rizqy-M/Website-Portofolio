import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { profile } from '../data/portofolioData';

const HeartIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const Others = ({ isDarkMode }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  const githubTheme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const handleMouseMove = (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const getPopupStyle = () => {
    const popupW = 220;
    const popupH = 180;
    const offset = 20;
    let x = mousePos.x + offset;
    let y = mousePos.y - popupH - offset;
    if (typeof window !== 'undefined') {
      if (x + popupW > window.innerWidth - 10) x = mousePos.x - popupW - offset;
      if (y < 10) y = mousePos.y + offset;
    }
    return { left: x, top: y };
  };

  const hoveredInterest =
    hoveredIndex !== null ? profile.interests[hoveredIndex] : null;

  return (
    <section
      id="others"
      className={`relative py-10 px-6 scroll-mt-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#0a0a0a]' : 'bg-zinc-50'
      }`}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
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

      <div className="relative max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p
            className={`text-base font-bold tracking-tight transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            @s0urfphyu
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-[56%] rounded-2xl overflow-hidden transition-colors duration-500"
            style={{
              background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#0d1117',
              border: isDarkMode
                ? '1px solid rgba(255,255,255,0.06)'
                : '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="p-5">
              <div className="w-full [&>div]:!w-full [&_svg]:!w-full [&_svg]:!max-w-none [&_.react-activity-calendar__footer]:text-zinc-400 [&_.react-activity-calendar__count]:text-zinc-400">
                <GitHubCalendar
                  username="Yusuf-Rizqy-M"
                  theme={githubTheme}
                  colorScheme="dark"
                  hideColorLegend={false}
                  hideTotalCount={false}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                  fontSize={11}
                  blockSize={12}
                  blockMargin={3}
                  blockRadius={2}
                  style={{ color: '#8b949e' }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="w-full md:w-[44%] rounded-2xl overflow-hidden transition-colors duration-500"
            style={{
              background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#ffffff',
              border: isDarkMode
                ? '2px solid rgba(255,255,255,0.18)'
                : '1px solid #b0b0b0',
              boxShadow: isDarkMode ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <HeartIcon
                  className={`w-4 h-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-white' : 'text-zinc-800'
                  }`}
                />
                <p
                  className={`text-[14px] font-semibold tracking-tight transition-colors duration-500 ${
                    isDarkMode ? 'text-white' : 'text-zinc-800'
                  }`}
                >
                  Hobby
                </p>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } },
                }}
                className="grid grid-cols-5 gap-3 flex-1"
              >
                {profile.interests.map((interest, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.32, ease: 'easeOut' },
                      },
                    }}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => window.open(interest.image, '_blank')}
                  >
                    <div
                      className={`w-full aspect-square rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:ring-2 ${
                        isDarkMode
                          ? 'bg-zinc-800 group-hover:ring-white/20'
                          : 'bg-zinc-100 group-hover:ring-zinc-300'
                      }`}
                    >
                      <img
                        src={interest.image}
                        alt={interest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className={`text-[10px] font-light tracking-tight text-center transition-colors duration-500 ${
                        isDarkMode ? 'text-[#8b949e]' : 'text-zinc-500'
                      }`}
                    >
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {hoveredInterest && (
          <motion.div
            key={hoveredInterest.image}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: getPopupStyle().left,
              top: getPopupStyle().top,
              pointerEvents: 'none',
              zIndex: 9999,
              width: 220,
            }}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src={hoveredInterest.image}
              alt={hoveredInterest.name}
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              className="px-3 py-2 text-[11px] font-medium text-zinc-300"
              style={{ background: '#0d1117' }}
            >
              {hoveredInterest.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Others;