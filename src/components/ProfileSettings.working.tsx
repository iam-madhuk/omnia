import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './Login';

export const ProfileSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Please Log In</h1>
          <p className="text-gray-400">You need to be logged in to access profile settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Profile <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Settings</span>
        </h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {[
          { id: 'profile', label: 'Profile', icon: '👤' },
          { id: 'security', label: 'Security', icon: '🔒' },
          { id: 'preferences', label: 'Preferences', icon: '⚙️' }
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

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Full Name</label>
                <p className="text-white text-lg">{user.name}</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                <p className="text-white text-lg">{user.email}</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">User ID</label>
                <p className="text-gray-300 text-sm">{user.id}</p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Account Type</label>
                <p className="text-green-400 font-medium">Premium User</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                <div className="grid gap-4 max-w-md">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                <select className="w-full max-w-md bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
                <select className="w-full max-w-md bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-white">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-white">SMS notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <span className="text-white">Push notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};