import { useAuth } from './Login';

export const ProfileSettingsTest = () => {
  const { user } = useAuth();
  
  console.log('ProfileSettingsTest rendered, user:', user);
  
  if (!user) {
    console.log('ProfileSettingsTest: No user found');
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-white mb-2">
          No User Found
        </h1>
        <p className="text-gray-400">User is null or undefined</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-white mb-2">
        Profile Settings Test
      </h1>
      <p className="text-gray-400">User: {user.name} ({user.email})</p>
      <p className="text-gray-400">This is a simplified test component</p>
    </div>
  );
};