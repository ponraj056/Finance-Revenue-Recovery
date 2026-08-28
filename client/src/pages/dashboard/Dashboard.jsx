import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, ShieldCheck, Activity, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../../contexts/AuthContext';

const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-slate-700 flex items-center">
    <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10 dark:bg-opacity-20 mr-4`}>
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/overview', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const handleRunSimulation = async () => {
    setSimulating(true);
    try {
      const response = await fetch('/api/simulation/run', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        // Refetch dashboard to show new mock data
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Simulation error:', error);
    } finally {
      setSimulating(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
          <p className="text-slate-500 font-medium">Loading Control Tower...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <ShieldCheck className="mr-3 text-blue-600" size={32} />
            RecoveryOS Control Tower
          </h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">AI Revenue Recovery Intelligence</p>
        </div>
        <button 
          onClick={handleRunSimulation}
          disabled={simulating}
          className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 font-medium hover:shadow-blue-500/50 hover:scale-105 transition-all disabled:opacity-70 disabled:hover:scale-100"
        >
          {simulating && <Loader2 className="animate-spin mr-2" size={18} />}
          {simulating ? 'Simulating Incident...' : 'Run Simulation'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Revenue At Risk" 
          value={`₹${(data.revenueAtRisk / 100000).toFixed(1)}L`} 
          icon={<AlertTriangle className="text-amber-500" />} 
          colorClass="bg-amber-500" 
        />
        <StatCard 
          title="Revenue Recovered" 
          value={`₹${(data.revenueRecovered / 100000).toFixed(1)}L`} 
          icon={<TrendingUp className="text-emerald-500" />} 
          colorClass="bg-emerald-500" 
        />
        <StatCard 
          title="Incremental Recovery" 
          value={`+${data.incrementalRecovery}%`} 
          icon={<Activity className="text-blue-500" />} 
          colorClass="bg-blue-500" 
        />
        <StatCard 
          title="Active Opportunities" 
          value={data.activeOpportunities.toString()} 
          icon={<ShieldCheck className="text-purple-500" />} 
          colorClass="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recovery Performance (7 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1E293B', color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenueAtRisk" stroke="#f59e0b" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} name="At Risk (₹)" />
                <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} name="Recovered (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 hover:shadow-md transition-shadow flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-500" size={20} />
            System Incidents
          </h3>
          
          <div className="flex-1 overflow-auto space-y-4 pr-2">
            {data.incidents.length === 0 ? (
              <div className="text-slate-500 text-center py-8">No active system incidents.</div>
            ) : (
              data.incidents.map(incident => (
                <div key={incident._id} className={`border ${incident.severity === 'CRITICAL' ? 'border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/30' : 'border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-900/30'} rounded-xl p-5 group hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-bold ${incident.severity === 'CRITICAL' ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>
                      {incident.title}
                    </span>
                    <span className={`${incident.severity === 'CRITICAL' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'} text-xs font-semibold px-2.5 py-1 rounded-md`}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className={`text-sm ${incident.severity === 'CRITICAL' ? 'text-red-600 dark:text-red-300' : 'text-amber-600 dark:text-amber-300'} mb-4`}>
                    {incident.description}
                  </p>
                  {incident.aiActionTaken && (
                    <div className="bg-white dark:bg-slate-900 rounded-lg p-3 text-sm text-gray-700 dark:text-slate-300 border border-red-100 dark:border-slate-700 shadow-sm">
                      <span className="font-semibold block mb-1 text-gray-900 dark:text-white">AI Action Taken:</span>
                      {incident.aiActionTaken}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
