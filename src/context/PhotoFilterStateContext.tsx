'use client'

import { createContext, useState, ReactNode, FC, useCallback } from 'react';

export const PhotoFilterStateContext = createContext({
  model: '',
  onClickModelButton: (selectModel: string) => {}
});

export const PhotoFilterStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [model, setModel] = useState(() => {
    return ''
  }
  );
  
  const onClickModelButton = useCallback((selectModel: string) => {
    setModel(selectModel);
  }, [model]);

  return (
    <PhotoFilterStateContext.Provider value={{ model, onClickModelButton }}>
      {children}
    </PhotoFilterStateContext.Provider>
  );
};