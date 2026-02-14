import { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '../types';
import { mockUsers } from '../utils/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lazy initializers to avoid useEffect setState warnings
function getInitialUser(): User | null {
  const savedUser = localStorage.getItem('abamc_user');
  if (savedUser) {
    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  }
  return null;
}

function getInitialOnboarding(): boolean {
  return localStorage.getItem('abamc_onboarding') === 'true';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(getInitialOnboarding);

  const login = async (email: string) => {
    // Simula login - verifica se email è valida
    const foundUser = mockUsers.find(u => u.email === email);

    if (!foundUser) {
      throw new Error('Email non valida. Usa una mail istituzionale @abamc.it o @studenti.abamc.it');
    }

    setUser(foundUser);
    localStorage.setItem('abamc_user', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    setHasCompletedOnboarding(false);
    localStorage.removeItem('abamc_user');
    localStorage.removeItem('abamc_onboarding');
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('abamc_onboarding', 'true');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        hasCompletedOnboarding,
        completeOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di AuthProvider');
  }
  return context;
}
