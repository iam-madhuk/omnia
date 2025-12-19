import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './Login';

export const ProfileSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences' | 'billing'>('profile');


  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: 'Acme Inc.',
    role: 'Developer',
    bio: 'AI enthusiast and full-stack developer passionate about building intelligent applications.',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    theme: 'dark',
    language: 'en'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const handleProfileSave = () => {
    // In a real app, this would make an API call to update the profile
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (securityData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    // In a real app, this would make an API call
    console.log('Changing password');
    setSecurityData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: securityData.twoFactorEnabled
    });
    alert('Password updated successfully!');
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Please Log In</h1>
          <p className="text-gray-400">You need to be logged in to access profile settings.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh Page
          </button>
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
          { id: 'preferences', label: 'Preferences', icon: '⚙️' },
          { id: 'billing', label: 'Billing', icon: '💳' }
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full">
                      📷
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-white">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-white">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-white">{profileData.company}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-white">{profileData.role}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-white">{profileData.location}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                    {profileData.website}
                  </a>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm font-medium mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-white">{profileData.bio}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Save Changes
                </button>
              </div>
            )}
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
          {/* Change Password */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
            <div className="space-y-4 max-w-md">
              <input
                type="password"
                placeholder="Current Password"
                value={securityData.currentPassword}
                onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={securityData.newPassword}
                onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={securityData.confirmPassword}
                onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handlePasswordChange}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Two-Factor Authentication</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Enable 2FA</h3>
                <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setSecurityData({ ...securityData, twoFactorEnabled: !securityData.twoFactorEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securityData.twoFactorEnabled ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securityData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
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
              {/* Notifications */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                <div className="space-y-3">
                  {Object.entries(profileData.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{key} Notifications</span>
                      <button
                        onClick={() => setProfileData({
                          ...profileData,
                          notifications: { ...profileData.notifications, [key]: !value }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                <select
                  value={profileData.theme}
                  onChange={(e) => setProfileData({ ...profileData, theme: e.target.value })}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
                <select
                  value={profileData.language}
                  onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Billing & Usage</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-lg border border-purple-500/30">
                  <h4 className="text-xl font-bold text-white">Pro Plan</h4>
                  <p className="text-gray-300">$99/month</p>
                  <p className="text-sm text-gray-400 mt-2">Unlimited API calls, priority support</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Usage This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">API Calls</span>
                    <span className="text-white">18,660 / ∞</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Credits Used</span>
                    <span className="text-white">$47.82</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Billing</span>
                    <span className="text-white">Jan 15, 2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
                Upgrade Plan
              </button>
              <button className="w-full md:w-auto bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition ml-0 md:ml-4">
                View Billing History
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};