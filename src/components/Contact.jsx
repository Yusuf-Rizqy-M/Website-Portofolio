import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { contact } from '../data/portofolioData';

const Contact = ({ isDarkMode }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  const handleCopy = (value, index) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section
      id="contact"
      className={`relative py-20 px-6 scroll-mt-20 transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#0a0a0a]' : 'bg-zinc-50'
      }`}
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
            Let's <span className="font-serif italic text-zinc-500">Connect</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="flex flex-col"
        >
          {contact.info.map((item, index) => {
            const isCopied = copiedIndex === index;
            const hasLink = !!item.link;

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex items-center justify-between py-4 border-b cursor-pointer transition-colors duration-200 ${
                  isDarkMode
                    ? 'border-zinc-800/60 hover:bg-zinc-900/30'
                    : 'border-zinc-200 hover:bg-zinc-100/60'
                } px-3 rounded-xl -mx-3`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <motion.div
                    animate={
                      hoveredIndex === index
                        ? { y: -3, scale: 1.1 }
                        : { y: 0, scale: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 ${
                      isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className={`w-4 h-4 object-contain ${
                        isDarkMode ? 'brightness-90 invert' : 'brightness-50'
                      }`}
                    />
                  </motion.div>

                  <div className="min-w-0">
                    <p className={`text-[13px] font-semibold leading-tight tracking-tight ${
                      isDarkMode ? 'text-zinc-100' : 'text-zinc-800'
                    }`}>
                      {item.name}
                    </p>
                    <p className={`text-[11px] mt-0.5 font-light truncate ${
                      isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                      {item.value}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-6">
                  {hasLink ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 ${
                        isDarkMode
                          ? 'text-zinc-400 border-zinc-700 bg-zinc-800/60 hover:text-zinc-100 hover:bg-zinc-700'
                          : 'text-zinc-500 border-zinc-200 bg-white hover:text-zinc-800 hover:bg-zinc-100 shadow-sm'
                      }`}
                    >
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.value, index);
                      }}
                      className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 ${
                        isCopied
                          ? (isDarkMode 
                              ? 'text-white border-zinc-600 bg-zinc-800' 
                              : 'text-zinc-950 border-zinc-400 bg-zinc-200')
                          : (isDarkMode
                              ? 'text-zinc-400 border-zinc-700 bg-zinc-800/60 hover:text-zinc-100 hover:bg-zinc-700'
                              : 'text-zinc-500 border-zinc-200 bg-white hover:text-zinc-800 hover:bg-zinc-100 shadow-sm')
                      }`}
                    >
                      {isCopied ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-light tracking-tight mb-8">
            Additional <span className="font-serif italic text-zinc-500">Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {contact.additional.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className={`pl-4 border-l ${
                  isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
                }`}
              >
                <p className={`text-[13px] font-semibold tracking-tight mb-1.5 ${
                  isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
                }`}>
                  {item.title}
                </p>
                <p className={`text-[12px] font-light leading-relaxed ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;