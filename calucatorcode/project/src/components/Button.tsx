import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  value: string;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'operation' | 'advanced';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  value, 
  onClick, 
  variant = 'default',
  className = ''
}) => {
  const { theme } = useTheme();
  
  // Dynamically determine button styles based on variant and theme
  const getButtonStyles = () => {
    const baseStyles = `
      relative rounded-2xl flex items-center justify-center 
      font-medium text-lg py-3 px-4 ${className}
    `;
    
    const variantStyles = {
      default: theme === 'dark' 
        ? 'bg-slate-700/80 text-white hover:bg-slate-700' 
        : 'bg-slate-200/80 text-slate-800 hover:bg-slate-300/80',
      primary: 'bg-purple-600 text-white hover:bg-purple-700',
      secondary: theme === 'dark'
        ? 'bg-slate-600/80 text-slate-200 hover:bg-slate-600' 
        : 'bg-slate-300/80 text-slate-700 hover:bg-slate-400/80',
      operation: theme === 'dark'
        ? 'bg-amber-500/90 text-white hover:bg-amber-600/90' 
        : 'bg-amber-500/90 text-white hover:bg-amber-600/90',
      advanced: theme === 'dark'
        ? 'bg-indigo-700/80 text-white hover:bg-indigo-800/80 text-sm' 
        : 'bg-indigo-600/80 text-white hover:bg-indigo-700/80 text-sm'
    };
    
    return `${baseStyles} ${variantStyles[variant]}`;
  };

  return (
    <motion.button
      className={getButtonStyles()}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
    >
      {/* Ripple effect */}
      <span className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <motion.span
          className={`
            absolute w-full h-full opacity-0 
            ${variant === 'primary' || variant === 'operation' 
              ? 'bg-white/20' 
              : 'bg-white/10'}
          `}
          initial={{ opacity: 0, scale: 0 }}
          whileTap={{ 
            opacity: 0.3, 
            scale: 4,
            transition: { duration: 0.5 } 
          }}
        />
      </span>
      
      {children}
    </motion.button>
  );
};

export default Button;