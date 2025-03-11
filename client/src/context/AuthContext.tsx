import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

// Define types for the authentication state
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: string
}

// Define types for the context value (functions for login, logout, and auth state)
interface AuthContextType {
  authData: AuthState;
  login: (token: string, role: string) => void;
  logout: () => void;
  userId: string | null; // Add userId here
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
    isAuthenticated: localStorage.getItem('token') !== null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || '',
  });

  // Extract userId from token (if available)
  const getUserId = () => {
    if (authData.token) {
      try {
        const decodedToken: any = jwtDecode(authData.token); // Decoding the token to get the payload
        return decodedToken.userId; // Assuming the token contains userId in the payload
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  };

  const userId = getUserId(); // Get userId from decoded token

  // Sync token in localStorage when the authData changes
  useEffect(() => {
    if (authData.token) {
      localStorage.setItem('token', authData.token); // Sync the token to localStorage
    } else {
      localStorage.removeItem('token'); // Remove token from localStorage
    }
    if (authData.role) {
      localStorage.setItem('role', authData.role); // Sync the role to localStorage
    } else {
      localStorage.removeItem('role'); // Remove role from localStorage
    }
  }, [authData.token, authData.role]); // Run when authData.token changes

  const login = (token: string, role: string) => {
    setAuthData({ isAuthenticated: true, token, role });
  };

  //debugging
  // useEffect(() => {
  //   console.log('Current authData:', authData); 
  // }, [authData]);

  const logout = () => {
    setAuthData({ isAuthenticated: false, token: null, role: '' });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, userId }}>
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
