import React from 'react';
import { AlertTriangle, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenueAtRisk: 4000, recovered: 2400 },
  { name: 'Tue', revenueAtRisk: 3000, recovered: 1398 },
  { name: 'Wed', revenueAtRisk: 2000, recovered: 9800 },
  { name: 'Thu', revenueAtRisk: 2780, recovered: 3908 },
  { name: 'Fri', revenueAtRisk: 1890, recovered: 4800 },
  { name: 'Sat', revenueAtRisk: 2390, recovered: 3800 },
  { name: 'Sun', revenueAtRisk: 3490, recovered: 4300 },
];

const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex items-center">
    <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10 mr-4`}>
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ShieldCheck className="mr-3 text-blue-600" size={32} />
            RecoveryOS Control Tower
          </h1>
          <p className="mt-2 text-gray-600">AI Revenue Recovery Intelligence</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 font-medium hover:shadow-blue-500/50 hover:scale-105 transition-all">
          Run Simulation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Revenue At Risk" value="₹8.4L" icon={<AlertTriangle className="text-amber-500" />} colorClass="bg-amber-500" />
        <StatCard title="Revenue Recovered" value="₹3.1L" icon={<TrendingUp className="text-green-500" />} colorClass="bg-green-500" />
        <StatCard title="Incremental Recovery" value="+14.2%" icon={<Activity className="text-blue-500" />} colorClass="bg-blue-500" />
        <StatCard title="Active Opportunities" value="427" icon={<ShieldCheck className="text-purple-500" />} colorClass="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recovery Performance (7 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenueAtRisk" stroke="#f59e0b" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} name="At Risk (₹)" />
                <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} name="Recovered (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-500" size={20} />
            System Incidents
          </h3>
          
          <div className="border border-red-200 bg-red-50/50 rounded-xl p-5 mb-4 group hover:bg-red-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-red-700">Bank A Degradation</span>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-md">CRITICAL</span>
            </div>
            <p className="text-sm text-red-600 mb-4">Failure rate spiked to 31.4% from baseline 4.8%.</p>
            <div className="bg-white rounded-lg p-3 text-sm text-gray-700 border border-red-100 shadow-sm">
              <span className="font-semibold block mb-1 text-gray-900">AI Action Taken:</span>
              Paused automated retries for 427 affected transactions to prevent unnecessary network hits.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
