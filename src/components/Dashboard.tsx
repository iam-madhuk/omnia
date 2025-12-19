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

  // Content Generator View - Check this FIRST
  if (currentView === 'content-generator') {
    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white mb-2"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              <span>🏠</span>
              <span>Home</span>
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
                    <option>Product Description</option>
                    <option>Email</option>
                    <option>Creative Story</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Topic/Prompt</label>
                  <textarea 
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                    placeholder="Describe what content you want to generate..."
                  />
                </div>
                <div className="flex gap-4">
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90">
                    Generate Content
                  </button>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
                    Clear
                  </button>
                </div>
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
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white mb-2"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              <span>🏠</span>
              <span>Home</span>
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
                    <option>C++</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Task Type</label>
                  <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Code Generation</option>
                    <option>Bug Fix</option>
                    <option>Code Review</option>
                    <option>Optimization</option>
                    <option>Documentation</option>
                    <option>Explanation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Code / Description</label>
                  <textarea 
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-40 font-mono text-sm"
                    placeholder="Paste your code here or describe what you want to build..."
                  />
                </div>
                <div className="flex gap-4">
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90">
                    🚀 Generate Code
                  </button>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
                    Clear
                  </button>
                  <button 
                    onClick={() => setCurrentView('chat')}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    💬 Chat Mode
                  </button>
                </div>
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
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white mb-2"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <div className="text-xs text-gray-400 font-medium px-3 py-2">Recent Chats</div>
              {['GPT-4 Code Review', 'Claude Creative Writing', 'Gemini Data Analysis', 'API Documentation Chat'].map((chat, i) => (
                <button key={i} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 text-sm">
                  {chat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1">
          <AIChatNew />
        </div>
      </div>
    );
  }

  if (currentView === 'api') {
    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white mb-2"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
          </div>
        </div>
        
        {/* Main API Area */}
        <div className="flex-1">
          <APIManagement />
        </div>
      </div>
    );
  }

  if (currentView === 'docs') {
    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white mb-2"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
          </div>
        </div>
        
        {/* Main Docs Area */}
        <div className="flex-1">
          <AIRouterDocs />
        </div>
      </div>
    );
  }

  // Handle other specialized views
  if (['data-analysis', 'image-creator', 'translation'].includes(currentView)) {
    const viewInfo = {
      'data-analysis': { title: '📊 Data Analysis', desc: 'Analyze and visualize your data with AI' },
      'image-creator': { title: '🎨 Image Creator', desc: 'Generate and edit images using AI models' },
      'translation': { title: '🌐 Translation Bot', desc: 'Translate text between multiple languages' }
    };

    const info = viewInfo[currentView as keyof typeof viewInfo];

    return (
      <div className="flex h-screen bg-[#0a0f1c]">
        <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white mb-2"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">{info.title}</h1>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <p className="text-gray-400 mb-4">{info.desc}</p>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">{info.title.split(' ')[0]}</div>
                <p className="text-gray-500">This specialized tool is coming soon...</p>
                <button 
                  onClick={() => setCurrentView('chat')}
                  className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90"
                >
                  Use AI Chat Instead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0f1c]">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900/50 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="font-bold text-white">Robotix AI</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={() => setCurrentView('chat')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors text-white font-medium"
          >
            <span>💬</span>
            <span>New Chat</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-2">
            <div className="text-xs text-gray-400 font-medium px-3 py-2">NAVIGATION</div>
            
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
            
            <div className="text-xs text-gray-400 font-medium px-3 py-2 pt-4">WORKSPACE</div>
            
            <button
              onClick={() => setCurrentView('chat')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
            >
              <span>🤖</span>
              <span>AI Chat</span>
            </button>
            
            <button
              onClick={() => setCurrentView('api')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
            >
              <span>⚙️</span>
              <span>API Management</span>
            </button>
            
            <button
              onClick={() => setCurrentView('docs')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
            >
              <span>📚</span>
              <span>Documentation</span>
            </button>

            <div className="text-xs text-gray-400 font-medium px-3 py-2 pt-4">RECENT PROJECTS</div>
            
            {[
              { name: 'Content Generator', icon: '✍️', view: 'content-generator' },
              { name: 'Code Assistant', icon: '💻', view: 'code-assistant' },
              { name: 'Data Analysis', icon: '📊', view: 'data-analysis' },
              { name: 'Image Creator', icon: '🎨', view: 'image-creator' },
              { name: 'Translation Bot', icon: '🌐', view: 'translation' }
            ].map((project, i) => (
              <button
                key={i}
                onClick={() => setCurrentView(project.view as any)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 text-sm"
              >
                <span>{project.icon}</span>
                <span>{project.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{user?.name || 'User'}</div>
              <div className="text-xs text-gray-400">Free Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-8">
            {/* Welcome Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                What's on the agenda today?
              </h1>
              <p className="text-xl text-gray-400">
                Choose from 15+ AI models to boost your productivity
              </p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: 'Generate Content',
                  description: 'Create articles, blogs, and marketing copy',
                  icon: '✍️',
                  color: 'from-blue-500 to-cyan-500',
                  action: () => setCurrentView('content-generator')
                },
                {
                  title: 'Code Assistant',
                  description: 'Debug, review, and optimize your code',
                  icon: '💻',
                  color: 'from-purple-500 to-pink-500',
                  action: () => setCurrentView('code-assistant')
                },
                {
                  title: 'Data Analysis',
                  description: 'Analyze datasets and generate insights',
                  icon: '📊',
                  color: 'from-green-500 to-emerald-500',
                  action: () => setCurrentView('data-analysis')
                },
                {
                  title: 'Image Creation',
                  description: 'Generate AI-powered visual content',
                  icon: '🎨',
                  color: 'from-orange-500 to-red-500',
                  action: () => setCurrentView('image-creator')
                },
                {
                  title: 'API Management',
                  description: 'Manage your API keys and usage',
                  icon: '⚙️',
                  color: 'from-indigo-500 to-purple-500',
                  action: () => setCurrentView('api')
                },
                {
                  title: 'Documentation',
                  description: 'Learn how to integrate our APIs',
                  icon: '📚',
                  color: 'from-teal-500 to-blue-500',
                  action: () => setCurrentView('docs')
                }
              ].map((item, i) => (
                <motion.button
                  key={i}
                  onClick={item.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 bg-gray-900/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 text-left group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.description}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'AI Models', value: '15+', icon: '🤖' },
                { label: 'Requests Today', value: '1,247', icon: '📈' },
                { label: 'Active Projects', value: '8', icon: '📁' },
                { label: 'Credits Left', value: '892', icon: '💳' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-gray-900/30 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                    <div className="text-2xl opacity-50">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};