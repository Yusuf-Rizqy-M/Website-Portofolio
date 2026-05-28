import React, { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingCV = ({ isDarkMode }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const cvLink = "https://drive.google.com/file/d/1cQFQIbg3kaIl4n5XJr2pjNmaGM6F3q1W/view";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <div 
        className={`absolute inset-0 rounded-3xl blur-2xl transition-all duration-1000 ${
          isHighlighted 
            ? 'bg-zinc-400/20 opacity-100 scale-110' 
            : 'opacity-0 scale-100'
        }`} 
      />

      <a
        href={cvLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          relative group flex items-center gap-0 p-1.5 rounded-2xl border transition-all duration-500 ease-out
          backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          ${isDarkMode 
            ? 'bg-zinc-900/80 border-zinc-800 text-zinc-200 hover:border-zinc-600' 
            : 'bg-white/80 border-zinc-200 text-zinc-800 hover:border-zinc-400'}
          ${isHighlighted 
            ? (isDarkMode ? 'ring-2 ring-zinc-600/40 scale-105' : 'ring-2 ring-zinc-300/60 scale-105') 
            : 'hover:scale-105'}
        `}
      >
    
        <div className={`
          relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-500
          ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}
          ${isHighlighted || 'group-hover:rotate-12'}
        `}>
          <FileText 
            size={20} 
            className={`transition-colors duration-300 ${
              isDarkMode 
                ? (isHighlighted ? 'text-zinc-100' : 'text-zinc-400 group-hover:text-zinc-100') 
                : (isHighlighted ? 'text-zinc-900' : 'text-zinc-500 group-hover:text-zinc-900')
            }`}
          />
          
        
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isDarkMode ? 'bg-zinc-400' : 'bg-zinc-500'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${
              isDarkMode ? 'bg-zinc-300' : 'bg-zinc-700'
            }`}></span>
          </span>
        </div>

        <div className={`
          overflow-hidden flex items-center transition-[max-width,opacity,margin] duration-500 ease-in-out
          ${isHighlighted 
            ? 'max-w-[120px] opacity-100 ml-3 mr-4' 
            : 'max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-3 group-hover:mr-4'}
        `}>
          <div className="flex flex-col">
            <span className={`text-[10px] uppercase tracking-[0.15em] font-black opacity-50 ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
            }`}>Resume</span>
            <span className={`text-sm font-bold whitespace-nowrap tracking-tight ${
              isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
            }`}>Unduh CV</span>
          </div>
        </div>


        <div className={`
          overflow-hidden transition-all duration-500 flex items-center
          ${isHighlighted ? 'max-w-[40px] opacity-100' : 'max-w-0 opacity-0'}
        `}>
          <Download size={16} className={`animate-bounce ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`} />
        </div>
      </a>
    </motion.div>
  );
};

export default FloatingCV;