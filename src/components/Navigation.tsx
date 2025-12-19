import { createContext, useContext, useState, type ReactNode } from 'react';

type NavigationView = 'landing' | 'dashboard' | 'chat' | 'api' | 'docs' | 'profile';

interface NavigationContextType {
  currentView: NavigationView;
  setCurrentView: (view: NavigationView) => void;
  navigateFromDropdown: (view: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<NavigationView>('landing');

  const navigateFromDropdown = (view: string) => {
    if (view === 'profile') {
      setCurrentView('profile');
    } else if (view === 'dashboard') {
      setCurrentView('dashboard');
    }
  };

  return (
    <NavigationContext.Provider value={{
      currentView,
      setCurrentView,
      navigateFromDropdown
    }}>
      {children}
    </NavigationContext.Provider>
  );
};