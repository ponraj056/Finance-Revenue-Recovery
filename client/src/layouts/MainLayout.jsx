import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700">
      <button 
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700' : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
      >
        <Sun size={14} />
      </button>
      <button 
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
      >
        <Moon size={14} />
      </button>
      <button 
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'system' ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'}`}
      >
        <Monitor size={14} />
      </button>
    </div>
  );
};

const MainLayout = ({ children }) => {
  const { theme } = useTheme();
  
  return (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors duration-200">
    <nav className="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center font-bold text-xl text-blue-600 tracking-tight">
              RecoveryOS
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-blue-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/profile" className="border-transparent text-gray-500 dark:text-slate-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-slate-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Profile & Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/admin" className="text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Admin Portal
            </Link>
            <Link to="/login" className="text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900/50 bg-gray-50 hover:bg-red-50 dark:bg-slate-900 dark:hover:bg-red-900/20">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <main className="flex-1">
      {children}
    </main>
  </div>
  );
};

export default MainLayout;
