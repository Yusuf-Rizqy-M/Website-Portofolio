import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';

const navItems = [
  { name: 'About',       href: '#about',       id: 'about' },
  { name: 'Education',   href: '#education',   id: 'education' },
  { name: 'Projects',    href: '#projects',    id: 'projects' },
  { name: 'Achievement', href: '#achievement', id: 'achievement' },
  { name: 'Contact',     href: '#contact',     id: 'contact' },
];

const Navbar = ({ isScrolled, isDarkMode, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const { scrollYProgress } = useScroll();
  const lenis = useLenis();

  // Fungsi scroll ke section menggunakan Lenis
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    lenis?.scrollTo(target, {
      offset: -80,         // offset agar tidak ketutup navbar
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    setMobileMenuOpen(false);
  };

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
        {/* Scroll progress bar */}
        <motion.div
          className={`absolute bottom-0 left-10 right-10 h-[1px] origin-left ${
            isDarkMode ? 'bg-zinc-400' : 'bg-zinc-600'
          }`}
          style={{ scaleX: scrollYProgress }}
        />

        {/* Logo */}
        <div
          className="flex items-center gap-2 z-50 cursor-pointer"
          onClick={(e) => scrollToSection(e, 'hero')}
        >
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
                onClick={(e) => scrollToSection(e, item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-4 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-200 z-10
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
            className={`md:hidden p-2 rounded-full border transition-all ${
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`absolute top-full left-0 right-0 mt-3 md:hidden rounded-2xl border shadow-xl backdrop-blur-xl overflow-hidden
                ${isDarkMode
                  ? 'bg-zinc-900/95 border-zinc-800'
                  : 'bg-white/95 border-zinc-200'
                }`}
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.2 }}
                    className={`flex items-center justify-between px-6 py-4 transition-colors duration-200 border-b last:border-b-0
                      ${isDarkMode ? 'border-zinc-800/60' : 'border-zinc-100'}
                      ${isActive
                        ? (isDarkMode ? 'text-white' : 'text-zinc-900')
                        : (isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-900')
                      }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      {item.name}
                    </span>

                    {isActive && (
                      <motion.span
                        layoutId="mobile-active-dot"
                        className={`w-1.5 h-1.5 rounded-full ${
                          isDarkMode ? 'bg-zinc-300' : 'bg-zinc-700'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;