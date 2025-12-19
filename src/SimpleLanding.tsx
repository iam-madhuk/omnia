import { useState, useEffect } from "react";
import { useAuth } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

const SimpleAILandingPage = () => {
  // Auth context
  const { isAuthenticated, setShowLogin, user } = useAuth();
  
  // Navigation state
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'profile'>('landing');

  console.log('SimpleAILandingPage - isAuthenticated:', isAuthenticated);
  console.log('SimpleAILandingPage - user:', user);
  console.log('SimpleAILandingPage - currentView:', currentView);

  // Reset navigation when authentication changes
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentView('landing');
    } else {
      console.log('Setting currentView to dashboard because user is authenticated');
      setCurrentView('dashboard');
    }
  }, [isAuthenticated]);

  // Also check on mount if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User already authenticated on mount, setting to dashboard');
      setCurrentView('dashboard');
    }
  }, []);

  // Handle different views based on navigation
  console.log('Checking dashboard condition - isAuthenticated:', isAuthenticated, 'currentView:', currentView);
  
  if (isAuthenticated && currentView === 'dashboard') {
    console.log('Rendering Dashboard component');
    return <Dashboard />;
  }

  // Fallback for any unhandled authenticated state
  if (isAuthenticated) {
    console.log('Authenticated but currentView not matching, falling back. currentView:', currentView);
    return (
      <div className="h-screen bg-green-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Fallback Debug Screen</h1>
          <p>isAuthenticated: {String(isAuthenticated)}</p>
          <p>currentView: {currentView}</p>
          <p>user: {user?.name || 'null'}</p>
          <button 
            onClick={() => {
              console.log('Force setting currentView to dashboard');
              setCurrentView('dashboard');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Force Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Simple Landing Page</h1>
        <p className="mb-4">Testing without complex components</p>
        <p>isAuthenticated: {String(isAuthenticated)}</p>
        <p>currentView: {currentView}</p>
        <button 
          onClick={() => {
            if (isAuthenticated) {
              setCurrentView('dashboard');
            } else {
              setShowLogin(true);
            }
          }}
          className="mt-4 px-6 py-3 bg-blue-600 rounded hover:bg-blue-700"
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default SimpleAILandingPage;