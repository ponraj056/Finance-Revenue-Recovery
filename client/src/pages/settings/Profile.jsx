import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Shield, Bell, Save } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-sm text-gray-600">Manage your profile, security, and notification preferences.</p>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col space-y-2">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'personal' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <User size={18} />
            <span>Personal Info</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <Shield size={18} />
            <span>Security & Login</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8">
          {activeTab === 'personal' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  JD
                </div>
                <div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Change Avatar
                  </button>
                  <p className="mt-2 text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue="Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="email" className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50" defaultValue="john.doe@example.com" disabled />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Email address cannot be changed.</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="tel" className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue="+91 9876543210" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 flex justify-end">
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30">
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Security & Password</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start mb-6">
                <Lock className="text-amber-500 mt-0.5 mr-3 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Two-Factor Authentication</h4>
                  <p className="text-sm text-amber-700 mt-1">Enhance your account security by enabling 2FA via SMS OTP.</p>
                  <button className="mt-3 bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 flex justify-end">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">System Incidents</h4>
                    <p className="text-sm text-gray-500">Receive alerts when AI detects payment degradation.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Recovery Summaries</h4>
                    <p className="text-sm text-gray-500">Weekly email reports of revenue recovered by AI.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Policy Overrides</h4>
                    <p className="text-sm text-gray-500">Get notified when AI stops recovery due to budget exhaustion.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
