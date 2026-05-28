import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export default function SplashScreen({ isVisible, isDarkMode }) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: isDarkMode ? '#0a0a0a' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <motion.img
            src={logo}
            alt="Logo"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 200,
              height: 'auto',
              filter: isDarkMode ? 'invert(1)' : 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}