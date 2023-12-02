import { Loader } from '@/components/loader';
import React, { createContext, useContext, useState } from 'react';

export const loadingContext = createContext(null);

export const useLoader = () => useContext(loadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hiddenLoader = () => {
    setIsLoading(false);
  };

  return (
    <loadingContext.Provider value={{ showLoader, hiddenLoader }}>
      {isLoading && <Loader />}
      {children}
    </loadingContext.Provider>
  );
};
