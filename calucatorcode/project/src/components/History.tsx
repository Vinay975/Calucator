import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HistoryProps {
  history: Array<{ formula: string; result: string }>;
  clearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ history, clearHistory }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className={`
        mt-4 rounded-2xl p-4 overflow-hidden shadow-lg backdrop-blur-sm
        ${theme === 'dark' 
          ? 'bg-slate-800/70 border border-slate-700' 
          : 'bg-white/90 border border-slate-200'}
      `}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-purple-500" />
          <h3 className={`
            font-medium 
            ${theme === 'dark' ? 'text-white' : 'text-slate-800'}
          `}>
            History
          </h3>
        </div>
        
        <button 
          onClick={clearHistory}
          className="text-slate-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={index}
              className={`
                p-2 rounded-lg text-sm
                ${theme === 'dark' 
                  ? 'bg-slate-700/50 text-slate-200' 
                  : 'bg-slate-100 text-slate-700'}
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xs text-slate-400">{item.formula}</div>
              <div className="font-medium">{item.result}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default History;