import React from 'react';
import { useLenis } from 'lenis/react';

const Footer = ({ isDarkMode }) => {
  const lenis = useLenis();

  
  const footerItems = [
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievement', id: 'achievement' },
    { name: 'Contact', id: 'contact' },
  ];

  
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    lenis?.scrollTo(target, {
      offset: -80,         
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <footer className={`relative z-10 py-10 md:py-12 border-t text-center ${ 
      isDarkMode 
        ? 'bg-[#0a0a0a] border-white/5 text-gray-500' 
        : 'bg-zinc-50 border-blue-50 text-gray-400'
    }`}>
      <p className="font-bold tracking-[0.3em] uppercase text-[9px] mb-4">Yusuf • Kudus, Indonesia</p>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 px-4">
        {footerItems.map((item) => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            onClick={(e) => scrollToSection(e, item.id)}
            className="text-[9px] font-bold uppercase tracking-widest hover:text-blue-500 transition-colors duration-200"
          >
            {item.name}
          </a>
        ))}
      </div>
      
      <p className="text-[8px] md:text-[9px] px-6">© {new Date().getFullYear()} Yusuf Rizqy Mubarok. Crafted with React, Tailwind & Passion.</p>
    </footer>
  );
};

export default Footer;