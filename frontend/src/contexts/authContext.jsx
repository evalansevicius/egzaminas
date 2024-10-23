import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

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
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, name, setName, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
