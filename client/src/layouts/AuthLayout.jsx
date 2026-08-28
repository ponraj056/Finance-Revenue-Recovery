import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveBackground from '../components/InteractiveBackground';

const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200">
    <InteractiveBackground />
    
    {/* Decorative background blobs */}
    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>

    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
    >
      <div className="flex justify-center">
        <ShieldCheck className="text-blue-600" size={48} />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
    >
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-blue-900/5 dark:shadow-blue-900/20 sm:rounded-2xl sm:px-10 border border-white/20 dark:border-slate-700/50">
        {children}
      </div>
    </motion.div>
  </div>
);

export default AuthLayout;
