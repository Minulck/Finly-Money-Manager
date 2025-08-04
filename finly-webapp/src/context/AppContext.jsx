import React, { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const clearUser = () => {
    setUser(null);
  };

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const contextValue = {
    user,
    setUser,
    clearUser,
    refreshTrigger,
    triggerRefresh,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
