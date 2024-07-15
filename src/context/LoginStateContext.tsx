'use client'

import { checkCookieExistence } from '@/api/useCookie';
import { createContext, useState, ReactNode, FC, useCallback, useEffect } from 'react';

export interface LoginProps {
 isLogin: boolean 
}

export const LoginStateContext = createContext({
  isLogin: false
});

export const LoginStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<LoginProps['isLogin']>(checkCookieExistence() ? true : false);

  return (
    <LoginStateContext.Provider value={{ isLogin }}>
      {children}
    </LoginStateContext.Provider>
  );
};