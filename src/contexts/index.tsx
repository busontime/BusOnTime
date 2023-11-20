import React from 'react';

import { type ChildrenProps } from '@/interfaces';

import { ThemeProvider } from './theme';
import { AuthProvider } from './auth';
import { MapProvider } from './map';
import { TravelProvider } from './travel';

export const Providers: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MapProvider>
          <TravelProvider>{children}</TravelProvider>
        </MapProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
