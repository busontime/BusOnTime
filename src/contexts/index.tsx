import React from 'react';

import { type ChildrenProps } from '@/interfaces';

import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';

export const Providers: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
