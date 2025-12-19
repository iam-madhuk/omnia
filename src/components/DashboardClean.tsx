import { motion } from 'framer-motion';
import { useAuth } from './Login';
import AIChatNew from './AIChatNew';
import { APIManagement } from './APIManagement';
import { AIRouterDocs } from './AIRouterDocs';
import { useState } from 'react';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'api' | 'docs' | 'content-generator' | 'code-assistant' | 'data-analysis' | 'image-creator' | 'translation'>('dashboard');

  console.log('Dashboard currentView:', currentView); // Debug log

  if (!user) return null;

  // Content Generator View
  if (currentView === 'content-generator') {
    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">✍️ Content Generator</h1>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <p className="text-gray-400 mb-4">Generate high-quality content using AI models specifically optimized for writing tasks.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Content Type</label>
                  <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Blog Post</option>
                    <option>Article</option>
                    <option>Social Media Post</option>
                    <option>Email</option>
                    <option>Product Description</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Topic/Subject</label>
                  <input
                    type="text"
                    placeholder="Enter the topic or subject..."
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
                  <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Formal</option>
                    <option>Creative</option>
                    <option>Technical</option>
                  </select>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                  Generate Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Code Assistant View
  if (currentView === 'code-assistant') {
    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">💻 Code Assistant</h1>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <p className="text-gray-400 mb-4">AI-powered coding assistance for development, debugging, and code optimization.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Programming Language</label>
                  <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>JavaScript</option>
                    <option>Python</option>
                    <option>TypeScript</option>
                    <option>Java</option>
                    <option>C#</option>
                    <option>Go</option>
                    <option>Rust</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Task Type</label>
                  <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Code Review</option>
                    <option>Bug Fix</option>
                    <option>Optimization</option>
                    <option>Documentation</option>
                    <option>Testing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Code Input</label>
                  <textarea
                    placeholder="Paste your code here..."
                    rows={8}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                  Analyze Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'chat') {
    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
        <div className="flex-1">
          <AIChatNew />
        </div>
      </div>
    );
  }

  if (currentView === 'api') {
    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
        <div className="flex-1">
          <APIManagement />
        </div>
      </div>
    );
  }

  if (currentView === 'docs') {
    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
        <div className="flex-1">
          <AIRouterDocs />
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Header */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">{user.name}</span>
              </h1>
              <p className="text-gray-400 text-sm">Your AI-powered workspace is ready</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'AI Chat', icon: '💬', view: 'chat' },
              { name: 'Content Generator', icon: '✍️', view: 'content-generator' },
              { name: 'Code Assistant', icon: '💻', view: 'code-assistant' },
              { name: 'API Management', icon: '🔧', view: 'api' }
            ].map((action) => (
              <motion.button
                key={action.name}
                onClick={() => setCurrentView(action.view as any)}
                className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-purple-500 transition-all text-left group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="font-semibold group-hover:text-purple-400 transition-colors">{action.name}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Tools Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">AI Tools & Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Content Generator',
                description: 'Generate high-quality content for blogs, articles, and social media',
                icon: '✍️',
                view: 'content-generator',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Code Assistant',
                description: 'AI-powered coding help, debugging, and optimization',
                icon: '💻',
                view: 'code-assistant',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Multi-AI Chat',
                description: 'Access multiple AI models in one unified interface',
                icon: '🤖',
                view: 'chat',
                gradient: 'from-green-500 to-blue-500'
              },
              {
                title: 'API Management',
                description: 'Manage API keys, usage, and billing across providers',
                icon: '🔧',
                view: 'api',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                title: 'Documentation',
                description: 'Comprehensive guides and API references',
                icon: '📚',
                view: 'docs',
                gradient: 'from-indigo-500 to-purple-500'
              },
              {
                title: 'Data Analysis',
                description: 'AI-powered data insights and visualization',
                icon: '📊',
                view: 'data-analysis',
                gradient: 'from-teal-500 to-green-500'
              }
            ].map((tool) => (
              <motion.div
                key={tool.title}
                onClick={() => setCurrentView(tool.view as any)}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">{tool.title}</h3>
                <p className="text-gray-400 text-sm">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Total Requests</div>
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-xs text-green-400">+12% this week</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Tokens Used</div>
            <div className="text-2xl font-bold">89.5K</div>
            <div className="text-xs text-blue-400">+8% this week</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Total Cost</div>
            <div className="text-2xl font-bold">$12.34</div>
            <div className="text-xs text-orange-400">+5% this week</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Credits Left</div>
            <div className="text-2xl font-bold text-green-400">$487.66</div>
            <div className="text-xs text-gray-400">Expires in 28 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};