import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Users, ShieldAlert, Activity, LogOut } from 'lucide-react';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-300 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <ShieldAlert className="text-blue-500 mr-2" size={24} />
          <span className="text-white font-bold tracking-wider uppercase text-sm">RecoveryOS Admin</span>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          <Link to="/admin" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-blue-900/20 text-blue-400 hover:bg-blue-900/40 transition-colors">
            <Activity size={18} />
            <span className="font-medium text-sm">System Overview</span>
          </Link>
          <Link to="/admin/users" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Users size={18} />
            <span className="font-medium text-sm">User Management</span>
          </Link>
          <Link to="/admin/data" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Database size={18} />
            <span className="font-medium text-sm">Database Metrics</span>
          </Link>
        </div>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white transition-colors">
            <LogOut size={18} />
            <span className="font-medium text-sm">Exit Admin</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-white tracking-wide">Command Center</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-400">System Healthy</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-slate-700"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-8 bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
