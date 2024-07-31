'use client'

import { isBrowser } from '@/api/isBroswer';
import { createContext, useState, ReactNode, FC, useCallback, useEffect } from 'react';

// interface ThemeContextProp {
//   theme: 'dark' | 'light';
//   onClickThemeButton: () => void;
// }

export const ThemeStateContext = createContext({
  theme: 'dark',
  onClickThemeButton: () => {}
});

export const ThemeStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    isBrowser() ? localStorage.getItem('theme_color') === 'dark' ? 'dark' : 'light' : 'light'
  );
  
  const onClickThemeButton = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [theme]);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem('theme_color', theme);
  }, [theme])

  return (
    <ThemeStateContext.Provider value={{ theme, onClickThemeButton }}>
      {children}
    </ThemeStateContext.Provider>
  );
};