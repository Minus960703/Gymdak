'use client'

import { createContext, useState, ReactNode, FC, useCallback } from 'react';

export const ModelStateContext = createContext({
  model: '',
  onClickModelButton: (selectModel: string) => {}
});

export const ModelStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [model, setModel] = useState(() => {
    return ''
  }
  );
  
  const onClickModelButton = useCallback((selectModel: string) => {
    setModel(selectModel);
  }, [model]);

  return (
    <ModelStateContext.Provider value={{ model, onClickModelButton }}>
      {children}
    </ModelStateContext.Provider>
  );
};