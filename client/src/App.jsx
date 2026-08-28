import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard charts
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
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
    <div className={`p-4 rounded-full ${colorClass} bg-opacity-10 mr-4`}>
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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ShieldCheck className="mr-3 text-blue-600" size={32} />
            RecoveryOS Control Tower
          </h1>
          <p className="mt-2 text-gray-600">AI Revenue Recovery Intelligence</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow font-medium hover:bg-blue-700">
          Run Simulation
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Revenue At Risk" value="₹8.4L" icon={<AlertTriangle className="text-amber-500" />} colorClass="bg-amber-500" />
        <StatCard title="Revenue Recovered" value="₹3.1L" icon={<TrendingUp className="text-green-500" />} colorClass="bg-green-500" />
        <StatCard title="Incremental Recovery" value="+14.2%" icon={<Activity className="text-blue-500" />} colorClass="bg-blue-500" />
        <StatCard title="Active Opportunities" value="427" icon={<ShieldCheck className="text-purple-500" />} colorClass="bg-purple-500" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recovery Performance (7 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenueAtRisk" stroke="#f59e0b" strokeWidth={2} name="At Risk (₹)" />
                <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={2} name="Recovered (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Incidents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-500" size={20} />
            System Incidents
          </h3>
          
          <div className="border border-red-200 bg-red-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-red-700">Bank A Degradation</span>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">CRITICAL</span>
            </div>
            <p className="text-sm text-red-600 mb-3">Failure rate spiked to 31.4% from baseline 4.8%.</p>
            <div className="bg-white rounded p-3 text-sm text-gray-700 border border-red-100">
              <span className="font-semibold block mb-1">AI Action Taken:</span>
              Paused automated retries for 427 affected transactions to prevent unnecessary network hits and preserve recovery budget.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

const Layout = ({ children }) => (
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
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main className="flex-1">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
