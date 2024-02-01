import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../helper/constants/constant.ts';

// Create a context with initial values
const LoginContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  token : '',
  setToken : (token)=>{},

});

// Create a provider component that will wrap your app
export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('')
  useEffect(()=>{
    try {
       const token = localStorage.getItem(ACCESS_TOKEN);
       setToken(token);
    } catch (error) {
      console.log("ERror --> ",error);
    }
  },[]);
  const login = (user) => {
    // Perform login logic (validate credentials, etc.)
    // For simplicity, let's just set a user when login is successful
    setUser(user);
  };

  const logout = () => {
    // Perform logout logic (clear user, etc.)
    setUser(null);
  };

  // Provide the context value to the components
  const contextValue = {
    user,
    login,
    logout,
    token, setToken
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

// Create a custom hook to access the context
export const useLogin = () => {
  return useContext(LoginContext);
};
