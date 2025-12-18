import { useState } from 'react';
import { motion } from 'framer-motion';

interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
  requests: number;
  status: 'active' | 'disabled';
}

interface APIProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected';
  modelsCount: number;
}

export const APIManagement = () => {
  const [activeTab, setActiveTab] = useState<'keys' | 'providers' | 'usage'>('keys');
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production Key',
      key: 'omn_prod_1234567890abcdef',
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date(),
      requests: 15420,
      status: 'active'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'omn_dev_abcdef1234567890',
      createdAt: new Date('2024-02-01'),
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      requests: 3240,
      status: 'active'
    }
  ]);

  const [providers, setProviders] = useState<APIProvider[]>([
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'GPT-4, GPT-3.5, DALL-E models',
      icon: '🤖',
      status: 'connected',
      modelsCount: 8
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      description: 'Claude family of models',
      icon: '🧠',
      status: 'connected',
      modelsCount: 3
    },
    {
      id: 'google',
      name: 'Google AI',
      description: 'Gemini Pro and multimodal models',
      icon: '✨',
      status: 'connected',
      modelsCount: 5
    },
    {
      id: 'meta',
      name: 'Meta',
      description: 'Llama 2 and CodeLlama models',
      icon: '🦙',
      status: 'disconnected',
      modelsCount: 12
    },
    {
      id: 'cohere',
      name: 'Cohere',
      description: 'Command and embedding models',
      icon: '🔮',
      status: 'disconnected',
      modelsCount: 6
    }
  ]);

  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const generateNewKey = () => {
    if (!newKeyName.trim()) return;

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `omn_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 16)}`,
      createdAt: new Date(),
      requests: 0,
      status: 'active'
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
    setShowCreateKey(false);
  };

  const toggleKeyStatus = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, status: key.status === 'active' ? 'disabled' : 'active' }
        : key
    ));
  };

  const deleteKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
  };

  const toggleProvider = (providerId: string) => {
    setProviders(prev => prev.map(provider =>
      provider.id === providerId
        ? { ...provider, status: provider.status === 'connected' ? 'disconnected' : 'connected' }
        : provider
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          API <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Management</span>
        </h1>
        <p className="text-gray-400">Manage your API keys and provider connections</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {[
          { id: 'keys', label: 'API Keys', icon: '🔑' },
          { id: 'providers', label: 'Providers', icon: '🔌' },
          { id: 'usage', label: 'Usage Stats', icon: '📊' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* API Keys Tab */}
      {activeTab === 'keys' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Your API Keys</h2>
            <button
              onClick={() => setShowCreateKey(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              + Create New Key
            </button>
          </div>

          {/* Create Key Modal */}
          {showCreateKey && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Create New API Key</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Key name (e.g., Production, Development)"
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={generateNewKey}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90"
                >
                  Generate
                </button>
                <button
                  onClick={() => setShowCreateKey(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* API Keys List */}
          <div className="grid gap-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <span>Created: {apiKey.createdAt.toLocaleDateString()}</span>
                      {apiKey.lastUsed && <span>Last used: {apiKey.lastUsed.toLocaleDateString()}</span>}
                      <span>{apiKey.requests.toLocaleString()} requests</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      apiKey.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {apiKey.status}
                    </span>
                    <button
                      onClick={() => toggleKeyStatus(apiKey.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      {apiKey.status === 'active' ? '⏸️' : '▶️'}
                    </button>
                    <button
                      onClick={() => deleteKey(apiKey.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <code className="text-sm font-mono text-purple-300">{apiKey.key}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(apiKey.key)}
                      className="text-gray-400 hover:text-white ml-2"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Providers Tab */}
      {activeTab === 'providers' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">AI Providers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div key={provider.id} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{provider.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                      <p className="text-sm text-gray-400">{provider.modelsCount} models</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleProvider(provider.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      provider.status === 'connected'
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    {provider.status === 'connected' ? 'Connected' : 'Connect'}
                  </button>
                </div>
                <p className="text-gray-400 text-sm">{provider.description}</p>
                {provider.status === 'connected' && (
                  <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                    <div className="text-green-400 text-sm">✓ All models available through your unified API</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Usage Stats Tab */}
      {activeTab === 'usage' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Usage Statistics</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Requests</span>
                  <span className="text-white font-semibold">18,660</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Tokens</span>
                  <span className="text-white font-semibold">2.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Cost</span>
                  <span className="text-white font-semibold">$47.82</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Top Models</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">GPT-4 Turbo</span>
                  <span className="text-white font-semibold">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Claude 3 Sonnet</span>
                  <span className="text-white font-semibold">28%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gemini Pro</span>
                  <span className="text-white font-semibold">27%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Response Time</span>
                  <span className="text-white font-semibold">1.2s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-green-400 font-semibold">99.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-green-400 font-semibold">99.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Chart Placeholder */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Usage Trend</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              📈 Usage chart would be implemented here with a charting library like Chart.js or D3
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};