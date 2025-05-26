import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`py-6 px-4 md:px-8 lg:px-12 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900/40 border-b border-pink-500/10' 
        : 'bg-white/40 border-b border-pink-200/20'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-pink-500" />
          <h1 className="text-xl md:text-2xl font-semibold">
            What If? <span className="text-pink-500 font-bold">Simulator</span>
          </h1>
        </div>
        
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700 text-pink-400' 
              : 'bg-pink-100 hover:bg-pink-200 text-pink-600'
          }`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 transition-transform hover:rotate-12" />
          ) : (
            <Moon className="h-5 w-5 transition-transform hover:-rotate-12" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;