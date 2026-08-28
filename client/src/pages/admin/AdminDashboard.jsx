import React from 'react';
import { Users, AlertTriangle, ShieldCheck, Database, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, isPositive }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">System Metrics</h1>
        <p className="text-slate-400 text-sm">Global overview of platform health and AI recovery actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Active Merchants" 
          value="1,248" 
          icon={<Users className="text-blue-400" size={20} />} 
          trend="+12%" 
          isPositive={true} 
        />
        <StatCard 
          title="AI Decisions (24h)" 
          value="142.5K" 
          icon={<Activity className="text-purple-400" size={20} />} 
          trend="+5.4%" 
          isPositive={true} 
        />
        <StatCard 
          title="Active System Incidents" 
          value="3" 
          icon={<AlertTriangle className="text-amber-400" size={20} />} 
          trend="-2" 
          isPositive={true} 
        />
        <StatCard 
          title="Global Recovery Rate" 
          value="68.2%" 
          icon={<ShieldCheck className="text-emerald-400" size={20} />} 
          trend="+1.2%" 
          isPositive={true} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent System Alerts */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Recent System Alerts</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { time: '10 mins ago', type: 'WARNING', msg: 'Razorpay Test API latency spike (>800ms)' },
              { time: '1 hour ago', type: 'INFO', msg: 'AI Model swapped to gpt-4o for load balancing' },
              { time: '3 hours ago', type: 'CRITICAL', msg: 'MongoDB replica set synchronization delayed' },
            ].map((alert, idx) => (
              <div key={idx} className="flex items-start p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <div className={`w-2 h-2 mt-1.5 rounded-full mr-3 shrink-0 ${
                  alert.type === 'CRITICAL' ? 'bg-rose-500' : 
                  alert.type === 'WARNING' ? 'bg-amber-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="text-sm text-slate-300">{alert.msg}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Health */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Database className="mr-2 text-slate-400" size={20} />
              Database Health
            </h3>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Storage Capacity</span>
                <span className="text-emerald-400">42% (Healthy)</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Connection Pool</span>
                <span className="text-amber-400">78% (Warning)</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">CPU Usage</span>
                <span className="text-emerald-400">24% (Healthy)</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
