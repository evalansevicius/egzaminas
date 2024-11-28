import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('user');
  const [name, setName] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setRole(null);
    setName(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name');

    if (token && storedRole && storedName) {
      setIsLoggedIn(true);
      setRole(storedRole);
      setName(storedName);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, name, setName, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
