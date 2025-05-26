import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../ThemeProvider';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-pink-900 to-purple-900 text-gray-100' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-900'
    }`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-8 lg:px-12 relative">
        <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-3xl rounded-3xl shadow-2xl hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl hidden md:block"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;