import { useAuth } from './Login';

export const ProfileSettings = () => {
  const authContext = useAuth();
  
  console.log('ProfileSettings component rendered');
  console.log('Auth context:', authContext);
  
  // Fallback render if no auth context
  if (!authContext) {
    console.log('No auth context available');
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-2">Auth Error</h1>
          <p className="text-gray-400">Authentication context not available</p>
        </div>
      </div>
    );
  }

  const { user } = authContext;
  
  if (!user) {
    console.log('No user found in ProfileSettings');
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">Please Log In</h1>
          <p className="text-gray-400">You need to be logged in to access profile settings.</p>
        </div>
      </div>
    );
  }

  console.log('Rendering ProfileSettings for user:', user.name);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Profile <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Settings</span>
        </h1>
        <p className="text-gray-400">Welcome {user.name}! Manage your account settings and preferences</p>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">User Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
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
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
              Edit Profile
            </button>
            <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition">
              Change Password
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <p className="text-green-400 font-semibold">✅ Profile Settings Working!</p>
          <p className="text-gray-300 text-sm mt-1">This is a simplified version to verify functionality.</p>
          <p className="text-gray-400 text-xs mt-2">Debug: Component rendered successfully with user data</p>
        </div>
      </div>
    </div>
  );
};