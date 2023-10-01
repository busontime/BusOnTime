import 'react-native-gesture-handler';

import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';

import { Providers } from '@/contexts';
import { AppRouter } from '@/routes';

LogBox.ignoreLogs(['']);
// LogBox.ignoreAllLogs();

export const App = (props) => {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer {...props}>
        <Providers>
          <AppRouter />
        </Providers>
      </NavigationContainer>
    </TamaguiProvider>
  );
};
