import React from 'react';
import { Heart } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-4 px-4 md:px-8 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900/40 border-t border-pink-500/10' 
        : 'bg-white/40 border-t border-pink-200/20'
    }`}>
      <div className="container mx-auto text-center text-sm">
        <p className="flex items-center justify-center gap-1">
          Built with <Heart className="h-4 w-4 text-pink-500 fill-current animate-pulse" /> for thoughtful reflection
        </p>
        <p className={`mt-1 ${theme === 'dark' ? 'text-pink-300/60' : 'text-pink-600/60'}`}>
          Explore your parallel universes
        </p>
      </div>
    </footer>
  );
};

export default Footer;