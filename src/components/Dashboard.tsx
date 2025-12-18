import { motion } from 'framer-motion';
import { useAuth } from './Login';
import { AIChat } from './AIChat';
import { APIManagement } from './APIManagement';
import { AIRouterDocs } from './AIRouterDocs';
import { ProfileSettings } from './ProfileSettings';
import { useState } from 'react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'api' | 'docs' | 'profile'>('dashboard');

  if (!user) return null;

  if (currentView === 'chat') {
    return (
      <section className="py-24 px-12 bg-[#0a0f1c] relative">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <AIChat />
      </section>
    );
  }

  if (currentView === 'api') {
    return (
      <section className="py-24 px-12 bg-[#0a0f1c] relative">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <APIManagement />
      </section>
    );
  }

  if (currentView === 'docs') {
    return (
      <section className="py-24 px-12 bg-[#0a0f1c] relative">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <AIRouterDocs />
      </section>
    );
  }

  if (currentView === 'profile') {
    return (
      <section className="py-24 px-12 bg-[#0a0f1c] relative">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <ProfileSettings />
      </section>
    );
  }

  const dashboardItems = [
    {
      title: 'AI Models Available',
      value: '24',
      change: '+6 new this month',
      icon: '🤖',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'API Requests',
      value: '18.7K',
      change: '+12% this month',
      icon: '📊',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Active Providers',
      value: '6',
      change: '3 connected',
      icon: '🔌',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Credits Remaining',
      value: '$87.42',
      change: '68% remaining',
      icon: '💳',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const recentActivity = [
    {
      action: 'Connected to OpenAI GPT-4 Turbo',
      time: '2 hours ago',
      status: 'success'
    },
    {
      action: 'High API usage - Claude 3 Sonnet',
      time: '4 hours ago',
      status: 'warning'
    },
    {
      action: 'New API key generated',
      time: '1 day ago',
      status: 'success'
    },
    {
      action: 'Added Meta Llama 2 provider',
      time: '2 days ago',
      status: 'info'
    }
  ];

  return (
    <section className="py-24 px-12 bg-[#0a0f1c] relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your AI projects today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {item.icon}
                </div>
                <span className="text-sm text-gray-400">{item.change}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{item.title}</h3>
              <p className="text-3xl font-bold text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button 
                onClick={() => setCurrentView('chat')}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
              >
                🤖 AI Chat Hub
              </button>
              <button 
                onClick={() => setCurrentView('api')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
              >
                🔑 Manage API Keys
              </button>
              <button 
                onClick={() => setCurrentView('docs')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
              >
                📚 Documentation
              </button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity">
                🔧 Provider Settings
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};