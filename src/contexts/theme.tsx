import React, { createContext, useContext, useState } from 'react';

import { type ChildrenProps } from '@/interfaces';

export const ThemeContext = createContext(null);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  const data = {
    isDark,
    changeTheme,
  };

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};
