import React from 'react';

import { type ChildrenProps } from '@/interfaces';

import { ThemeProvider } from './theme';
import { AuthProvider } from './auth';
import { MapProvider } from './map';

export const Providers: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MapProvider>{children}</MapProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
