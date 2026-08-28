import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center font-bold text-xl text-blue-600 tracking-tight">
              RecoveryOS
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/profile" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Profile & Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Admin Portal
            </Link>
            <Link to="/login" className="text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-red-200 bg-gray-50 hover:bg-red-50">
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

export default MainLayout;
