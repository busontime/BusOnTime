import React from 'react';

import { AuthProvider } from './auth';

export const Providers = ({ children }: childrenProp): JSX.Element => {
  return <AuthProvider>{children}</AuthProvider>;
};
