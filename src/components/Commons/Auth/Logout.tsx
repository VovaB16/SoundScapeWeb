import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const authContext = useAuth();
  const logout = authContext ? authContext.logout : () => {};

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/login" />;
};

export default Logout;