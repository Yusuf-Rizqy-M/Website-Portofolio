import React, { useState, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react'
import { motion, useMotionValue } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Footer from './components/Footer'
import FloatingCV from './components/FloatingCV';
import About from './components/About';
import Achievement from './components/Achievement';
import Contact from './components/Contact';
import Blog from './pages/Blog';
import Education from './components/Education';
import SplashScreen from './components/SplashScreen';
import 'lenis/dist/lenis.css'
import './App.css'
import { Helmet } from "react-helmet"
import favicon from './assets/logo.png';

function AppContent({ isDarkMode, toggleTheme, isScrolled, glassStyle, textSub, isBlogPage }) {
  const lenis = useLenis();

  useEffect(() => {
    const handleModalChange = (e) => {
      if (e.detail?.open) {
        lenis?.stop();
      } else {
        lenis?.start();
      }
    };
    window.addEventListener('modal-state', handleModalChange);
    return () => window.removeEventListener('modal-state', handleModalChange);
  }, [lenis]);

  return (
    <>
      {!isBlogPage && (
        <Navbar isScrolled={isScrolled} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}

      <Routes>
        <Route path="/" element={
          <main>
            <Hero isDarkMode={isDarkMode} textSub={textSub} />
            <About isDarkMode={isDarkMode} textSub={textSub} />
            <Education isDarkMode={isDarkMode} textSub={textSub} />
            <Achievement isDarkMode={isDarkMode} textSub={textSub} />
            <Contact isDarkMode={isDarkMode} />
          </main>
        } />

        <Route path="/blog" element={
          <Blog
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        } />
      </Routes>

      {!isBlogPage && <Footer isDarkMode={isDarkMode} />}
      {!isBlogPage && <FloatingCV isDarkMode={isDarkMode} />}
    </>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Baca localStorage langsung saat init — tidak ada delay/flash
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [showSplash, setShowSplash] = useState(true);

  const location = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Simpan theme ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Scroll & mouse listeners
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Splash screen — tampil 2.2 detik lalu animasi keluar
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const glassStyle = isDarkMode
    ? "bg-white/5 border-white/10 backdrop-blur-md"
    : "bg-white/60 border-blue-100/50 backdrop-blur-md shadow-sm";

  const textSub = isDarkMode ? "text-gray-400" : "text-gray-600";
  const isBlogPage = location.pathname === '/blog';

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>

      <SplashScreen isVisible={showSplash} isDarkMode={isDarkMode} />

      <div className={`min-h-screen transition-colors duration-500 font-poppins relative ${
        isDarkMode ? 'bg-[#030712] text-white' : 'bg-[#f8fafc] text-gray-900'
      }`}>

        <Helmet>
          <meta name="description" content="Portfolio Yusuf Rizqy Mubarok, Software Developer dari Indonesia." />
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
          <link rel="apple-touch-icon" href={favicon} />
        </Helmet>

        <AppContent
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          isScrolled={isScrolled}
          glassStyle={glassStyle}
          textSub={textSub}
          isBlogPage={isBlogPage}
        />
      </div>
    </ReactLenis>
  )
}

export default App