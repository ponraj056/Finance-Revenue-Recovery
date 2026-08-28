import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Edit2, Ban, CheckCircle } from 'lucide-react';

const usersData = [
  { id: 'USR-892', name: 'Acme Corp', email: 'admin@acmecorp.com', role: 'MERCHANT', status: 'ACTIVE', joined: '2026-01-12' },
  { id: 'USR-893', name: 'Global Tech', email: 'payments@globaltech.io', role: 'MERCHANT', status: 'SUSPENDED', joined: '2026-02-04' },
  { id: 'USR-894', name: 'Sarah System', email: 'sarah.sys@recoveryos.com', role: 'ADMIN', status: 'ACTIVE', joined: '2025-11-20' },
  { id: 'USR-895', name: 'Retail Plus', email: 'finance@retailplus.net', role: 'MERCHANT', status: 'ACTIVE', joined: '2026-03-15' },
  { id: 'USR-896', name: 'John Doe', email: 'john.operator@recoveryos.com', role: 'OPERATOR', status: 'INACTIVE', joined: '2026-04-01' },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">User Management</h1>
          <p className="text-slate-400 text-sm">Manage merchant accounts, operators, and admin access.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-lg shadow-blue-900/20">
          + Invite User
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users by name, email, or ID... (Ctrl+K)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
            />
          </div>
          <button className="flex items-center space-x-2 bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors w-full sm:w-auto justify-center">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                      user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                      user.role === 'OPERATOR' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      'bg-slate-700 text-slate-300 border-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1.5">
                      {user.status === 'ACTIVE' ? <CheckCircle size={14} className="text-emerald-400" /> : <Ban size={14} className="text-rose-400" />}
                      <span className={user.status === 'ACTIVE' ? 'text-emerald-400' : 'text-rose-400'}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-white p-1 rounded transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-700 flex justify-between items-center text-sm text-slate-400">
          <span>Showing 1 to 5 of 128 users</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 bg-slate-900 border border-slate-700 rounded hover:bg-slate-700 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded">1</button>
            <button className="px-3 py-1 bg-slate-900 border border-slate-700 rounded hover:bg-slate-700 transition-colors">2</button>
            <button className="px-3 py-1 bg-slate-900 border border-slate-700 rounded hover:bg-slate-700 transition-colors">3</button>
            <button className="px-3 py-1 bg-slate-900 border border-slate-700 rounded hover:bg-slate-700 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
