import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  );

  const Login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);

    localStorage.setItem('user',  JSON.stringify(userData));
    localStorage.setItem('token', tokenValue);
  };

  const Logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
  };

  return (
    <AuthContext.Provider value={{ user, token, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
};
