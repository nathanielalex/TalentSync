// context/AuthContext.tsx
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define types for the authentication state
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

// Define types for the context value (functions for login, logout, and auth state)
interface AuthContextType {
  authData: AuthState;
  login: (token: string) => void;
  logout: () => void;
}

// Create a Context with an initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap around the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>({
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
  });

  // Sync token in localStorage when the authData changes
  useEffect(() => {
    if (authData.token) {
      localStorage.setItem('token', authData.token); // Sync the token to localStorage
    } else {
      localStorage.removeItem('token'); // Remove token from localStorage
    }
  }, [authData.token]); // Run when authData.token changes

  const login = (token: string) => {
    setAuthData({ isAuthenticated: true, token });
  };

  const logout = () => {
    setAuthData({ isAuthenticated: false, token: null });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
