'use client'

import { createContext, useState, ReactNode, FC, useCallback, useEffect } from 'react';

// interface ThemeContextProp {
//   theme: 'dark' | 'light';
//   onClickThemeButton: () => void;
// }

export interface LanguageProps {
  country: 'KR' | 'EN' | 'JP'
}

export const LanguageStateContext = createContext({
  language: 'KR',
  onClickLanguage: (country: LanguageProps['country']) => {}
});

let localStorageLanguage: LanguageProps['country'] = localStorage.getItem('language') as 'KR' | 'EN' | 'JP' || 'KR';

export const LanguageStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageProps['country']>(localStorageLanguage);
  
  const onClickLanguage = useCallback((country: LanguageProps['country']) => {
    setLanguage(country);
  }, [language]);

  return (
    <LanguageStateContext.Provider value={{ language, onClickLanguage }}>
      {children}
    </LanguageStateContext.Provider>
  );
};