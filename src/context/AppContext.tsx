import React, { useState, createContext } from 'react';

type AppTypes = {
    toggleTheme: () => void;
    dark: boolean;
}

interface AppPovider {
    children: React.ReactNode;
}


const AppContext = createContext({} as AppTypes);

export const AppProvider= ({ children }: AppPovider) => {
  function toggleTheme() {
    setDark((dark) => !dark);
  }

  const [dark, setDark] = useState(true);
  // window.matchMedia('(prefers-color-scheme: dark)').matches

  return (
    <AppContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext
