import React, { createContext, useState, useEffect } from 'react';
import { ACCESS_TOKEN } from '../constants/auth';

// TokenContext 생성
export const TokenContext = createContext();

// TokenProvider 컴포넌트
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // 컴포넌트가 처음 렌더링될 때 localStorage에서 토큰을 가져옴
  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 토큰 저장 함수
  const saveToken = (userData) => {
    localStorage.setItem(ACCESS_TOKEN, userData);
    setToken(userData);
  };

  // 토큰 제거 함수
  const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};
