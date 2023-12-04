import React, { createContext, useContext, useState } from 'react';

import { Loader } from '@/components/loader';

import { type ChildrenProps } from '@/interfaces';

export const LoaderContext = createContext(null);

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [loading, setloading] = useState(false);

  const showLoader = () => {
    setloading(true);
  };

  const hideLoader = () => {
    setloading(false);
  };

  const data = {
    showLoader,
    hideLoader,
  };

  return (
    <LoaderContext.Provider value={data}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};
