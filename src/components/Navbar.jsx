import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Sun, Moon, Menu, X, Rocket, Zap, Layers, Award, Star } from 'lucide-react';

const navItems = [
  { name: 'About',       icon: <Rocket size={20} />, href: '#about',       id: 'about' },
  { name: 'Education',   icon: <Zap size={20} />,    href: '#education',   id: 'education' },
  { name: 'Projects',    icon: <Layers size={20} />, href: '#projects',    id: 'projects' },
  { name: 'Achievement', icon: <Star size={20} />,   href: '#achievement', id: 'achievement' },
  { name: 'Contact',     icon: <Award size={20} />,  href: '#contact',     id: 'contact' },
];

const Navbar = ({ isScrolled, isDarkMode, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < 80) {
        setActiveSection(null);
        return;
      }

      let current = null;
      let smallestDistance = Infinity;

      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - 100);
        if (rect.top <= windowHeight * 0.5 && distance < smallestDistance) {
          smallestDistance = distance;
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-[100] flex justify-center p-4 md:p-6 pointer-events-none font-poppins">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className={`
          pointer-events-auto relative flex items-center justify-between 
          px-4 py-2 md:px-8 md:py-3 rounded-full border transition-all duration-500
          ${isScrolled
            ? (isDarkMode
                ? 'bg-zinc-900/60 border-zinc-800 backdrop-blur-md w-full max-w-5xl'
                : 'bg-white/60 border-zinc-200 backdrop-blur-md w-full max-w-5xl shadow-sm')
            : 'bg-transparent border-transparent w-full max-w-7xl'
          }
        `}
      >
        {/* Scroll progress bar — zinc tone */}
        <motion.div
          className={`absolute bottom-0 left-10 right-10 h-[1px] origin-left ${
            isDarkMode ? 'bg-zinc-400' : 'bg-zinc-600'
          }`}
          style={{ scaleX: scrollYProgress }}
        />

        {/* Logo */}
        <div className="flex items-center gap-2 z-50 cursor-pointer">
          <span className={`hidden sm:block font-semibold tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Yusuf Rizqy<span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}>.</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full relative">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredIndex === index;

            return (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-4 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-200 z-10 flex items-center gap-2
                  ${isActive
                    ? (isDarkMode ? 'text-white' : 'text-zinc-900')
                    : (isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-900')
                  }`}
              >
                {item.name}

                <AnimatePresence>
                  {isActive && !isHovered && (
                    <motion.span
                      key={`underline-${item.id}`}
                      layoutId="nav-active-underline"
                      className={`absolute bottom-0.5 left-3 right-3 rounded-full ${
                        isDarkMode ? 'bg-zinc-300' : 'bg-zinc-700'
                      }`}
                      style={{ height: '2px' }}
                      initial={{ opacity: 0, scaleX: 0, originX: 0.5 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                  )}
                </AnimatePresence>

                {isHovered && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all ${
              isDarkMode
                ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                : 'bg-white border-zinc-200 text-zinc-600 shadow-sm hover:bg-zinc-50 hover:text-zinc-900'
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full border ${
              isDarkMode
                ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
                : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className={`absolute top-full left-0 right-0 mt-4 md:hidden p-2 rounded-3xl border shadow-2xl backdrop-blur-2xl
                ${isDarkMode
                  ? 'bg-zinc-900/90 border-zinc-800'
                  : 'bg-white/90 border-zinc-200'
                }`}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all
                        ${isActive
                          ? (isDarkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900')
                          : (isDarkMode ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900')
                        }`}
                    >
                      <span className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? (isActive ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-800 text-zinc-400')
                          : (isActive ? 'bg-zinc-200 text-zinc-800' : 'bg-zinc-100 text-zinc-500')
                      }`}>
                        {item.icon}
                      </span>
                      <span className="font-semibold text-[10px] uppercase tracking-widest">{item.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active-dot"
                          className={`ml-auto w-1.5 h-1.5 rounded-full ${
                            isDarkMode ? 'bg-zinc-300' : 'bg-zinc-700'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;