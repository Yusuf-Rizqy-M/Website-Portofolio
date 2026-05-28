import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { certificates } from '../data/portofolioData';

const Achievement = ({ isDarkMode }) => {
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

  const sortedCertificates = [...certificates].sort(
    (a, b) => parseInt(a.year) - parseInt(b.year)
  );

  const getPopupStyle = () => {
    const popupW = 260;
    const popupH = 195;
    const offset = 20;
    let x = mousePos.x + offset;
    let y = mousePos.y - popupH - offset;
    if (typeof window !== 'undefined') {
      if (x + popupW > window.innerWidth - 10) x = mousePos.x - popupW - offset;
      if (y < 10) y = mousePos.y + offset;
    }
    return { left: x, top: y };
  };

  const handleClick = (cert) => {
    window.open(cert.image, '_blank');
  };

  const hoveredCert = hoveredIndex !== null ? sortedCertificates[hoveredIndex] : null;

  return (
    <section
      id="achievement"
      className={`relative py-10 px-6 scroll-mt-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#0a0a0a]' : 'bg-zinc-50'
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
        {stars.map((star, index) => (
          <div
            key={index}
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
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Achievement <span className="font-serif italic text-zinc-500">Records</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="flex flex-col"
        >
          {sortedCertificates.map((cert, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(sortedCertificates[index])}
              className={`group relative flex items-center justify-between py-4 border-b cursor-pointer transition-colors duration-200 ${
                isDarkMode
                  ? 'border-zinc-800/60 hover:bg-zinc-900/30'
                  : 'border-zinc-200 hover:bg-zinc-100/60'
              } px-3 rounded-xl -mx-3`}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={
                    hoveredIndex === index
                      ? { y: -3, scale: 1.1 }
                      : { y: 0, scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 ${
                    isDarkMode
                      ? 'bg-zinc-800 text-zinc-400'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  <Trophy size={15} />
                </motion.div>

                <div>
                  <p className={`text-[13px] font-semibold leading-tight tracking-tight ${
                    isDarkMode ? 'text-zinc-100' : 'text-zinc-800'
                  }`}>
                    {cert.name}
                  </p>
                  <p className={`text-[11px] mt-0.5 font-light ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    {cert.desc}
                  </p>
                </div>
              </div>

              <span className={`flex-shrink-0 ml-6 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                isDarkMode
                  ? 'text-zinc-400 border-zinc-700 bg-zinc-800/60'
                  : 'text-zinc-500 border-zinc-200 bg-white'
              }`}>
                {cert.year}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {hoveredCert && (
          <motion.div
            key={hoveredCert.image}
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
              width: 260,
            }}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src={hoveredCert.image}
              alt={`${hoveredCert.name} Certificate`}
              style={{ width: '100%', height: 195, objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievement;