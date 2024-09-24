import  { createContext, useState, useEffect } from 'react';

import { useToast } from '@chakra-ui/react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    toast({
      title: 'Logged in successfully.',
      description: 'You have been logged in.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: 'Logged out.',
      description: 'You have been logged out.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const getAuthHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};
