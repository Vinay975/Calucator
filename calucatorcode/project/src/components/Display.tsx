import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Save, RotateCcw } from 'lucide-react';

interface DisplayProps {
  display: string;
  formula: string;
  memory: string | null;
}

const Display: React.FC<DisplayProps> = ({ display, formula, memory }) => {
  const { theme } = useTheme();
  
  const displayVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 5 }
  };

  // Create an array of characters to animate each individually
  const displayDigits = display.split('');
  
  return (
    <div className={`
      p-6 pb-2 
      ${theme === 'dark' ? 'text-white' : 'text-slate-900'}
    `}>
      {/* Memory indicator */}
      {memory && (
        <div className="absolute top-4 right-4 flex items-center space-x-1">
          <Save size={14} className="text-purple-500" />
          <span className="text-xs text-purple-500">{memory}</span>
        </div>
      )}
      
      {/* Formula */}
      <div className="h-6 mb-1 text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={formula}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="text-sm text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-hide"
          >
            {formula || '\u00A0'}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Main display */}
      <div className="flex justify-end items-baseline overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={display}
            className="text-4xl md:text-5xl font-bold tracking-tight"
            variants={displayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex">
              {displayDigits.map((digit, index) => (
                <motion.span
                  key={`${index}-${digit}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.03,
                    type: 'spring',
                    stiffness: 300
                  }}
                >
                  {digit}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Display;