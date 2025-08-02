import React, { createContext } from 'react';
import { useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ( {children} ) => {
    const [user,setUser] = useState(null);

    const contextValue={
        user,
        setUser
    }

    const clearUser = () => {
        setUser(null);
    }

    return (
        <AppContext.Provider value={contextValue}>
        {children}
        </AppContext.Provider>
    );
}
