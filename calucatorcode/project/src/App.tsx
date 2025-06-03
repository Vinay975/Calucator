import React, { useState } from 'react';
import Calculator from './components/Calculator';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>
        <Calculator />
        <footer className="mt-8 text-sm text-slate-400">

        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;