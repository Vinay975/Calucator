import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center p-2 rounded-full
        ${theme === 'dark' 
          ? 'bg-slate-700 text-yellow-300' 
          : 'bg-slate-200 text-slate-700'}
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {theme === 'dark' ? (
          <Moon size={20} />
        ) : (
          <Sun size={20} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeSwitcher;