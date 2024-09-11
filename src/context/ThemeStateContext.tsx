'use client'

import { isBrowser } from '@/api/isBroswer';
import { createContext, useState, ReactNode, FC, useCallback, useEffect } from 'react';

export const ThemeStateContext = createContext({
  theme: 'dark',
  onClickThemeButton: () => {}
});

export const ThemeStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  
  const onClickThemeButton = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [theme]);

  useEffect(() => {
    if (isBrowser()) {
      const savedTheme = localStorage.getItem('theme_color') === 'dark' ? 'dark' : 'light';
      setTheme(savedTheme);
      setIsThemeLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isThemeLoaded) {
      document.body.className = theme === 'dark' ? 'dark' : 'light';
      localStorage.setItem('theme_color', theme);
    }
  }, [theme, isThemeLoaded])

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <ThemeStateContext.Provider value={{ theme, onClickThemeButton }}>
      {children}
    </ThemeStateContext.Provider>
  );
};