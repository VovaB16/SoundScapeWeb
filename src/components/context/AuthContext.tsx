import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  token: string | null;
  refreshToken: string | null;
  setToken: (token: string) => void;
  refreshAuthToken: () => Promise<void>;
  userId: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    return localStorage.getItem('refreshToken');
  });

  const login = (newToken: string, newRefreshToken: string) => {
    setLoggedIn(true);
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem('loggedIn', JSON.stringify(true));
    localStorage.setItem('token', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    console.log('Token set during login:', newToken); 
  };

  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  const refreshAuthToken = async () => {
    if (refreshToken) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: refreshToken }),
        });
        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
          localStorage.setItem('token', data.token);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        logout();
      }
    }
  };

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    }
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      console.log('Token retrieved from localStorage:', storedToken); 
    }
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, token, refreshToken, setToken, refreshAuthToken, userId: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};