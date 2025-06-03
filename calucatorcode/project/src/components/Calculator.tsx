import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Display from './Display';
import Keypad from './Keypad';
import History from './History';
import { useCalculator } from '../hooks/useCalculator';
import { useTheme } from '../context/ThemeContext';

const Calculator: React.FC = () => {
  const {
    display,
    formula,
    history,
    memory,
    handleButtonPress,
    handleKeyDown,
    clearHistory,
  } = useCalculator();
  
  const { theme } = useTheme();
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <motion.div 
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`
          relative overflow-hidden rounded-3xl shadow-2xl 
          backdrop-blur-xl border border-opacity-20
          ${theme === 'dark' 
            ? 'bg-slate-800/70 border-slate-600' 
            : 'bg-white/90 border-white'}
        `}
        layout
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className={`
            absolute -inset-[50%] rounded-full blur-3xl opacity-20
            ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-400'}
          `}></div>
        </div>
        
        <div className="relative z-10">
          <Display 
            display={display} 
            formula={formula} 
            memory={memory} 
          />
          
          <Keypad onButtonPress={handleButtonPress} />
        </div>
      </motion.div>
      
      {history.length > 0 && (
        <History history={history} clearHistory={clearHistory} />
      )}
    </motion.div>
  );
};

export default Calculator;