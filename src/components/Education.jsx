import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { educationData } from '../data/portofolioData';

const Education = ({ isDarkMode }) => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredImg, setHoveredImg] = useState(null);

  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
      window.dispatchEvent(new CustomEvent('modal-state', { detail: { open: true } }));
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      window.dispatchEvent(new CustomEvent('modal-state', { detail: { open: false } }));
      setZoomedImg(null);
      setHoveredImg(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modal-state', { detail: { open: false } }));
    };
  }, [selectedSchool]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const POPUP_W = 260;
  const POPUP_H = 160;
  const OFFSET_X = 18;
  const OFFSET_Y = -POPUP_H / 2;

  const popupStyle = (() => {
    if (typeof window === 'undefined') return {};
    let left = mousePos.x + OFFSET_X;
    let top = mousePos.y + OFFSET_Y;
    if (left + POPUP_W > window.innerWidth - 16) left = mousePos.x - POPUP_W - OFFSET_X;
    if (top < 8) top = 8;
    if (top + POPUP_H > window.innerHeight - 8) top = window.innerHeight - POPUP_H - 8;
    return { left, top, width: POPUP_W, height: POPUP_H };
  })();

  return (
    <section
      id="education"
      className={`relative px-6 scroll-mt-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#0a0a0a] text-zinc-100' : 'bg-zinc-50 text-zinc-900'
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

      <div className="max-w-5xl mx-auto relative scale-[0.9] z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Education <span className="font-serif italic text-zinc-500">History</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px ${
            isDarkMode ? 'bg-zinc-800/50' : 'bg-zinc-200'
          }`} />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            className="space-y-8 md:space-y-10"
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full gap-4 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="w-full md:w-[44%] ml-12 md:ml-0">
                  <div className={`group p-5 rounded-2xl border transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 shadow-lg'
                      : 'bg-white border-zinc-100 hover:border-zinc-200 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-zinc-500" />
                        <span className="text-[10px] font-medium tracking-wider text-zinc-500 uppercase">{edu.period}</span>
                        {edu.school === "Universitas Brawijaya" && (
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1.5 shadow-sm border ${
                            isDarkMode
                              ? 'bg-zinc-800 border-zinc-600 text-zinc-200'
                              : 'bg-zinc-900 border-zinc-700 text-white'
                          }`}>
                            <span className="relative flex h-1.5 w-1.5">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                isDarkMode ? 'bg-zinc-300' : 'bg-white'
                              }`} />
                              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                                isDarkMode ? 'bg-zinc-300' : 'bg-white'
                              }`} />
                            </span>
                            NOW
                          </span>
                        )}
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                        isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'
                      }`}>{edu.subtitle}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 tracking-tight">{edu.school}</h3>
                    <p className={`text-[11px] leading-relaxed font-light ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {edu.desc}
                    </p>
                  </div>
                </div>

                <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full border z-20 ${
                  isDarkMode ? 'bg-black border-zinc-700' : 'bg-white border-zinc-300'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                </div>

                <div className="w-full md:w-[44%] ml-12 md:ml-0">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedSchool(edu)}
                    className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-md"
                  >
                    <img
                      src={edu.image}
                      alt={edu.school}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSchool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            style={{ isolation: 'isolate' }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedSchool(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col border ${
                isDarkMode
                  ? 'bg-[#0f0f0f] border-zinc-800'
                  : 'bg-white border-zinc-200'
              }`}
              style={{ maxHeight: '85vh' }}
            >
              <div className={`shrink-0 px-7 pt-7 pb-5 flex items-start justify-between border-b ${
                isDarkMode ? 'border-zinc-800' : 'border-zinc-100'
              }`}>
                <div>
                  <h2 className={`text-2xl font-bold tracking-tight ${
                    isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                  }`}>
                    {selectedSchool.school}
                  </h2>
                  <p className={`text-[10px] font-semibold tracking-[0.18em] uppercase mt-1 ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    {selectedSchool.subtitle} · {selectedSchool.period}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSchool(null)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                    isDarkMode
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  <X size={15} />
                </button>
              </div>

              <div
                className="flex-1 overflow-y-auto px-7 py-6"
                style={{ overscrollBehavior: 'contain' }}
              >
                <div className="relative">
                  <div className={`absolute left-[7px] top-2 bottom-2 w-px ${
                    isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
                  }`} />

                  <div className="space-y-10">
                    {selectedSchool.details.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.32 }}
                        className="relative pl-9"
                      >
                        <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 z-10 ${
                          isDarkMode
                            ? 'bg-zinc-900 border-zinc-500'
                            : 'bg-white border-zinc-400'
                        }`} />

                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className={`font-bold text-base tracking-tight ${
                            isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                          }`}>
                            {item.title}
                          </h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {item.year}
                          </span>
                        </div>

                        <p className={`text-sm leading-relaxed mb-4 ${
                          isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                        }`}>
                          {item.desc}
                        </p>

                        {item.gallery && item.gallery.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                            {item.gallery.map((img, i) => {
                              const imgKey = `${index}-${i}`;
                              const isHovered = hoveredImg === imgKey;
                              return (
                                <div
                                  key={i}
                                  className={`relative aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                                    isDarkMode
                                      ? `bg-zinc-900 ${isHovered ? 'border-zinc-400 shadow-lg shadow-black/40' : 'border-zinc-700'}`
                                      : `bg-zinc-50 ${isHovered ? 'border-zinc-400 shadow-lg shadow-zinc-200' : 'border-zinc-200'}`
                                  }`}
                                  onMouseEnter={() => {
                                    setHoveredImg(imgKey);
                                    setZoomedImg(img);
                                  }}
                                  onMouseLeave={() => {
                                    setHoveredImg(null);
                                    setZoomedImg(null);
                                  }}
                                  onClick={() => window.open(img, '_blank')}
                                >
                                  <img
                                    src={img}
                                    alt={`${item.title} gallery ${i}`}
                                    className={`w-full h-full object-cover transition-transform duration-300 ${
                                      isHovered ? 'scale-110' : 'scale-100'
                                    }`}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomedImg && (
          <motion.div
            key={zoomedImg}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`fixed z-[200] pointer-events-none rounded-2xl overflow-hidden shadow-2xl border-2 ${
              isDarkMode ? 'border-zinc-600' : 'border-zinc-300'
            }`}
            style={popupStyle}
          >
            <img
              src={zoomedImg}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Education;