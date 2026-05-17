import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Clock } from 'lucide-react';
import fotoProfil from '../assets/filkom.jpeg';

const WishMeteor = ({ id }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const generateStyle = () => {
      const left = Math.random() * 100;
      const duration = Math.random() * 1.5 + 0.8;
      const delay = Math.random() * 8;
      const size = Math.random() * 1.5 + 1;
      const tailWidth = Math.random() * 100 + 100;

      setStyle({
        left: `${left}%`,
        top: `-5%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--tail-width': `${tailWidth}px`,
      });
    };
    generateStyle();
  }, []);

  return (
    <span
      key={id}
      style={style}
      className="absolute animate-meteor-fall rounded-full bg-zinc-200 shadow-[0_0_15px_1px_rgba(255,255,255,0.8)] opacity-0"
    >
      <div 
        className="absolute top-1/2 left-0 h-[1px] -translate-y-1/2 bg-gradient-to-l from-zinc-200 via-zinc-200/20 to-transparent blur-[0.5px]" 
        style={{ width: 'var(--tail-width)' }}
      />
    </span>
  );
};

const Hero = ({ isDarkMode, textSub }) => {
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <section 
       
      className={`relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden px-6 transition-colors duration-500 ${
        isDarkMode ? "bg-[#0a0a0a] text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <style>
        {`
          @keyframes meteor-fall {
            0% { transform: rotate(135deg) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            70% { opacity: 1; }
            100% { transform: rotate(135deg) translateX(-100vh); opacity: 0; }
          }
          .animate-meteor-fall {
            animation: meteor-fall linear infinite;
            transform-origin: left center;
          }
        `}
      </style>

      <div className={`absolute inset-0 z-0 pointer-events-none opacity-[0.03] ${
        isDarkMode 
          ? "bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]" 
          : "bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]"
        }`} 
        style={{ backgroundSize: '45px 45px' }}
      />

      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => <WishMeteor key={i} id={i} />)}
        </div>
      )}

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 md:py-0">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] uppercase mb-8 border backdrop-blur-md shadow-sm ${
              isDarkMode 
                ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400' 
                : 'bg-white border-zinc-200 text-zinc-500'
            }`}
          >
            <MapPin size={12} className={isDarkMode ? "text-zinc-100" : "text-zinc-900"} />
            <span>Kudus, Indonesia</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
            Who <span className="font-serif italic font-light text-zinc-500 text-4xl md:text-6xl">Am I?</span>
          </h1>
          
          <h2 className={`text-xl md:text-2xl font-medium mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            A <span className={isDarkMode ? 'text-white' : 'text-zinc-900'}>Software Engineer</span> based in Indonesia
          </h2>

          <p className={`text-base md:text-lg mb-10 leading-relaxed font-light max-w-lg ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            I specialize in <span className={isDarkMode ? 'text-zinc-100 font-normal' : 'text-zinc-900 font-normal'}>full-stack development</span>, 
            crafting seamless digital experiences through modern web technologies, 
            mobile applications, and robust cloud hosting.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className={`group flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 border shadow-2xl
                ${isDarkMode 
                  ? 'bg-zinc-100 border-zinc-100 text-zinc-900 hover:bg-transparent hover:text-white' 
                  : 'bg-zinc-900 border-zinc-900 text-white hover:bg-transparent hover:text-zinc-900'}`}
            >
              <Send size={18} /> Let's Talk
            </motion.a>

            <div className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl border backdrop-blur-xl shadow-sm
              ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400' : 'bg-white border-zinc-100 text-zinc-500'}`}>
              <Clock size={16} className="text-zinc-500" />
              <span className="text-xs font-mono font-bold">
                {formatTime(time)}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative w-full max-w-[360px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border transition-all duration-700 ${
              isDarkMode ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-100 bg-white'
            }`}
          >
            <img 
              src={fotoProfil} 
              alt="Profile" 
              className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                isHovered ? 'grayscale-0 scale-110' : 'grayscale scale-100'
              }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${
              isHovered ? 'opacity-30' : 'opacity-60'
            }`} />
          </div>
          
          <div className={`absolute -bottom-10 -right-10 w-40 h-40 blur-[80px] rounded-full transition-all duration-1000 pointer-events-none ${
            isDarkMode 
              ? (isHovered ? 'bg-zinc-100/20' : 'bg-zinc-500/10') 
              : (isHovered ? 'bg-zinc-400/30' : 'bg-zinc-200/20')
          }`} />
          
          <div className={`absolute -top-10 -left-10 w-40 h-40 blur-[80px] rounded-full transition-all duration-1000 pointer-events-none ${
            isDarkMode 
              ? (isHovered ? 'bg-zinc-500/10' : 'bg-zinc-800/20') 
              : (isHovered ? 'bg-zinc-200/40' : 'bg-zinc-100/20')
          }`} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;