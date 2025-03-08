import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  const login = (newToken: string) => {
    setLoggedIn(true);
    setToken(newToken);
    localStorage.setItem('loggedIn', JSON.stringify(true));
    localStorage.setItem('token', newToken);
    console.log('Token set during login:', newToken); // Log the token when it is set
  };

  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
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
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, token }}>
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