import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: string
}

interface AuthContextType {
  authData: AuthState;
  login: (token: string, role: string) => void;
  logout: () => void;
  userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>({
    isAuthenticated: localStorage.getItem('token') !== null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || '',
  });

  const getUserId = () => {
    if (authData.token) {
      try {
        const decodedToken: any = jwtDecode(authData.token);
        return decodedToken.userId;
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  };

  const userId = getUserId();

  useEffect(() => {
    if (authData.token) {
      localStorage.setItem('token', authData.token);
    } else {
      localStorage.removeItem('token');
    }
    if (authData.role) {
      localStorage.setItem('role', authData.role);
    } else {
      localStorage.removeItem('role');
    }
  }, [authData.token, authData.role]);

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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
