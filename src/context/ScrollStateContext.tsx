'use client'

import { createContext, useState, ReactNode, FC, useCallback, useEffect } from 'react';

export const ScrollStateContext = createContext({
  model: '',
  onClickModelButton: (selectModel: string) => {}
});

export const ScrollStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onClickModelButton = useCallback((selectModel: string) => {
    setModel(selectModel);
  }, [model]);

  return (
    <ScrollStateContext.Provider value={{ model, onClickModelButton }}>
      {children}
    </ScrollStateContext.Provider>
  );
};