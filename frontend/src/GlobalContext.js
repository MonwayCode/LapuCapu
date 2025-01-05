import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};


export const GlobalProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const storedUserId = window.localStorage.getItem("userId");
    return storedUserId || null;
  });

  useEffect(() => {
    if (userId) {
      window.localStorage.setItem("userId", userId);
    } else {
      window.localStorage.removeItem("userId");
    }
  }, [userId]);

  const login = (id) => setUserId(id);

  const logout = () => setUserId(null);

  return (
    <GlobalContext.Provider value={{ userId, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
